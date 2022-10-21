const firebase = require('../../../firebase/firebaseAdminConfig')
const { getAuth } = require('firebase-admin/auth')
const User = require('../../../models/user')
const withMethodCheck = require('../../../middleware/withMethodCheck')
const dbConnect = require('../../../db/mongoose')


const handler = async (req, res) => {
    const method = ['POST']
    withMethodCheck(req, res, method)
    await dbConnect()

    const { idToken, role, email, name, phoneNumber } = req.body

    // verify idToken got from client-side authentication with firebase
    let uid
    try {
        const decodedToken = await getAuth().verifyIdToken(idToken)
        uid = decodedToken.uid
    } catch(e) {
        return res.status(400).json({
            success: false,
            message: "Invalid credentials"
        })
    }

    // revoke all session stored in firebase
    getAuth().revokeRefreshTokens(uid)

    const isCustomer = role === 'customer'
    const isOwner = role === 'owner'

    const roles = { isCustomer, isOwner }
    // Add user information to database
    try {
        const userRecord = await getAuth().updateUser(uid, {
            email,
            phoneNumber,
            displayName: name,
            role: ['']
        })
        getAuth().setCustomUserClaims(uid, {
            isCustomer: !!isCustomer || !!userRecord.customClaims?.isCustomer,
            isOwner: !!isOwner || !!userRecord.customClaims?.isOwner
        })

    } catch(error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }

    // Add new user to database or update existing user (adding new role)
    try {
        let user = await User.findOne({ uid })
        if (user) {
            user.isCustomer = user.isCustomer || isCustomer
            user.isOwner = user.isOwner || isOwner
            user.name = name
            user.email = email
            user.phoneNumber = phoneNumber
            user.save()
        } else {
            user = new User({
                uid,
                name, 
                email, 
                phoneNumber,
                ...roles  
            })
            user.save()
        }

        return res.status(200).json({
            success: true,
            message: 'User registered',
        })
    } catch(e) {
        return res.status(400).json({
            success: false,
            message: 'Internal server error, please try again later'
        })
    }
}

export default handler