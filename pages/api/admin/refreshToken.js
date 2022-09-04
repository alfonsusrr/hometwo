const withMethodCheck = require('../../../middleware/withMethodCheck')
const Admin = require('../../../models/admin')
const { getCookie, hasCookie, setCookie} = require('cookies-next')
const dbConnect = require('../../../db/mongoose')
const jwt = require('jsonwebtoken')

const methods = ['POST']
const handler = async (req, res) => {
    withMethodCheck(req, res, methods)

    await dbConnect()
    let accessToken
    let refreshToken
    if (hasCookie('admin_access_token', { req, res })) {
        accessToken = getCookie('admin_access_token', { req, res })
    }

    if (hasCookie('admin_refresh_token', { req, res })) {
        refreshToken = getCookie('admin_refresh_token', { req, res})
    } else {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        })
    }

    let user
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET)
        const uid = decoded.uid

        user = await Admin.findOne({ uid, 'refreshToken.token': refreshToken })
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

    const newRefreshToken = await user.generateRefreshToken(refreshToken)
    const newAccessToken = await user.generateAccessToken(accessToken)

    setCookie("admin_refresh_token", newRefreshToken, {
        req, res,
        httpOnly: true,
        maxAge: 60 * 24 * 60 * 60,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'Lax',
        secure: process.env.NODE_ENV === 'production'? true : false
    })

    setCookie("admin_access_token", newAccessToken, {
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