const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { getCookie, hasCookie } = require('cookies-next')
const dbConnect = require('../db/mongoose')

const withAuthCustomer = (handler) => {
    return async (req, res) => {
        await dbConnect()
        let token
        if (hasCookie('access_token', { req, res })) {
            token = getCookie('access_token', { req, res})
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            })
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const role = decoded.role

            const currentUser = await User.findOne({ uid: decoded.uid, 'accessToken.token' : token})

            if (!currentUser) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid access token'
                })
            }

            if (!currentUser.isCustomer) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized user role'
                })
            }

            if (role !== "customer") {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized user role'
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

export default withAuthCustomer