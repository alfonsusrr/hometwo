const firebase = require("../../../firebase/firebaseAdminConfig")
const { getAuth } = require('firebase-admin/auth')
const User = require('../../../models/user')
const { setCookie } = require('cookies-next')
const withMethodCheck = require('../../../middleware/withMethodCheck')
const dbConnect = require('../../../db/mongoose')

const method = ['POST']
const handler = async (req, res) => {
    withMethodCheck(req, res, method)
    await dbConnect()
    
    const idToken = req.body.idToken
    const role = req.body.role
    // verify idToken got from client-side authentication with firebase
    let uid
    try {
        const decodedToken = await getAuth().verifyIdToken(idToken)
        uid = decodedToken.uid
    } catch(e) {
        return res.status(400).json({
            "success": false,
            "message": "Invalid credentials"
        })
    }

    // revoke all session stored in firebase
    getAuth().revokeRefreshTokens(uid)

    // Add new refresh token and access token to database
    let user = await User.findOne({ uid })

    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'No account found, please register'
        })
    }

    if (role === 'customer' && !user.isCustomer) {
        return res.status(401).json({
            success: false,
            message: "You haven't registered as a home seeker"
        })
    } 

    if (role === 'owner' && !user.isOwner) {
        return res.status(401).json({
            success: false,
            message: "You haven't registered as a home owner"
        })
    }

    const refreshToken = await user.generateRefreshToken(null, role)
    const accessToken = await user.generateAccessToken(null, role)
    
    setCookie("refresh-token", refreshToken, {
        req, res,
        httpOnly: true,
        maxAge: 60 * 24 * 60 * 60,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'Lax',
        secure: process.env.NODE_ENV === 'production'? true : false
    })

    setCookie("access-token", accessToken, {
        req, res,
        httpOnly: true,
        maxAge: 24 * 60 * 60,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'Lax',
        secure: process.env.NODE_ENV === 'production'? true : false
    })

    // Retrieve user data
    const userRecord = await (await getAuth().getUser(uid)).toJSON()
    const { email, displayName, photoURL, phoneNumber, isCustomer, isOwner } = userRecord
    const userData = {
        uid, email, name: displayName, phoneNumber, role
    }

    return res.status(200).json({
        success: true,
        message: 'Logged in successfully',
        data: {
            user: userData
        }
    })
}

export default handler