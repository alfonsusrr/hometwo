const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')
const { getCookie, hasCookie } = require('cookies-next')
const dbConnect = require('../db/mongoose')

const withAuthAdmin = (handler) => {
    return async (req, res) => {
        await dbConnect()
        let token
        if (hasCookie('admin_access_token', { req, res })) {
            token = getCookie('admin_access_token', { req, res})
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized. Plase log in'
            })
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            const currentUser = await Admin.findOne({ uid: decoded.uid, 'accessToken.token' : token})

            if (!currentUser) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid access token'
                })
            }

            req.user = currentUser
            return handler(req, res)
        } catch (e) {
            return res.status(401).json({
                success: false,
                message: 'Invalid access token'
            })
        }
    }
}

export default withAuthAdmin