const firebase = require("../../../firebase/firebaseAdminConfig")
const { getAuth } = require('firebase-admin/auth')
const withMethodCheck = require('../../../middleware/withMethodCheck')
const User = require('../../../models/user')
const { getCookie, hasCookie, setCookie} = require('cookies-next')
const dbConnect = require('../../../db/mongoose')
const jwt = require('jsonwebtoken')

const methods = ['POST']
const handler = async (req, res) => {
    withMethodCheck(req, res, methods)

    let accessToken
    let refreshToken
    if (hasCookie('access-token', { req, res })) {
        accessToken = getCookie('access-token', { req, res })
    }

    if (hasCookie('refresh-token', { req, res })) {
        refreshToken = getCookie('refresh-token', { req, res})
    } else {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized! Please login'
        })
    }

    let user
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET)
        const uid = decoded.uid

        user = await User.findOne({ uid, 'refreshToken.token': refreshToken })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid refresh token. Please login'
            })
        }
    } catch(e) {
        return res.status(401).json({
            success: false,
            message: 'Invalid refresh token. Please login'
        })
    }
    
    const decoded = await jwt.verify(refreshToken, process.env.JWT_SECRET)
    const role = decoded.role

    const newRefreshToken = await user.generateRefreshToken(refreshToken, role)
    const newAccessToken = await user.generateAccessToken(accessToken, role)

    setCookie("refresh-token", newRefreshToken, {
        req, res,
        httpOnly: true,
        maxAge: 60 * 24 * 60 * 60,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'Lax',
        secure: process.env.NODE_ENV === 'production'? true : false
    })

    setCookie("access-token", newAccessToken, {
        req, res,
        httpOnly: true,
        maxAge: 24 * 60 * 60,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'Lax',
        secure: process.env.NODE_ENV === 'production'? true : false
    })

    return res.status(200).json({
        "success": true,
        "message": 'Token refreshed'
    })
}

export default handler