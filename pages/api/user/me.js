const withMethodCheck = require('../../../middleware/withMethodCheck')
import withAuth from '../../../middleware/withAuth'
import jwt from 'jsonwebtoken'
const firebase = require("../../../firebase/firebaseAdminConfig")
const { getAuth } = require('firebase-admin/auth')
const { getCookie } = require('cookies-next')

const handler = async (req, res) => {
    const method = ['POST']
    withMethodCheck(req, res, method)

    const accessToken = getCookie('access_token', { req, res })
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)

    const uid = decoded.uid
    
    const userRecord = await (await getAuth().getUser(uid)).toJSON()
    const { email, displayName, photoURL, phoneNumber } = userRecord
    const userData = {
        uid, email, name: displayName, phoneNumber, role: decoded.role
    }

    return res.status(200).json({
        success: true,
        message: '',
        data: {
            user: userData
        }
    })

}

export default withAuth(handler)