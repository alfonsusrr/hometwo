const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { getCookie, hasCookie } = require('cookies-next')
const dbConnect = require('../db/mongoose')

const withAuthCustomer = (handler) => {
    return async (req, res) => {
        await dbConnect()
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
            const role = decoded.role

            const currentUser = await User.findOne({ uid: decoded.uid, 'accessToken.token' : token})

            if (!currentUser) {
                return res.status(401).json({
                    success: false,
                    message: 'The token is invalid'
                })
            }

            if (!currentUser.isCustomer) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized user as customer'
                })
            }

            if (role !== "customer") {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized user as customer'
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

export default withAuthCustomer