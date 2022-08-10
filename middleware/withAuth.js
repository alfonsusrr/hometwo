const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { getCookie, hasCookie } = require('cookies-next')

const withAuth = (handler) => {
    return async (req, res) => {
        let token
        if (hasCookie('access-token', { req, res })) {
            token = getCookie('access-token', { req, res})
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized. Plase log in'
            })
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            const currentUser = await User.findOne({ uid: decoded.uid, 'accessToken.token' : token})

            if (!currentUser) {
                return res.status(401).json({
                    success: false,
                    message: 'The token is invalid'
                })
            }

            req.user = currentUser
            return handler(req, res)
        } catch (e) {
            return res.status(401).json({
                success: false,
                message: 'Invalid access token, please login again'
            })
        }
    }
}

export default withAuth