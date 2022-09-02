const User = require('../models/user')
const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')
const { getCookie, hasCookie } = require('cookies-next')
const dbConnect = require('../db/mongoose')

const withAuthOwner = (handler) => {
    await dbConnect()
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
            const role = decoded.role

            let currentUser
            if (role === "admin") {
                currentUser = await Admin.findOne({ uid: decoded.uid, 'accessToken.token' : token})
                if (!currentUser) {
                    return res.status(401).json({
                        success: false,
                        message: 'The token is invalid'
                    })
                }
            } else if (role === "owner") {
                currentUser = await User.findOne({ uid: decoded.uid, 'accessToken.token' : token})

                if (!currentUser) {
                    return res.status(401).json({
                        success: false,
                        message: 'The token is invalid'
                    })
                }
                
                if (!currentUser.isOwner) {
                    return res.status(401).json({
                        success: false,
                        message: 'Unauthorized user role'
                    })
                }
            } else {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized user role'
                })
            }
            
            req.user = currentUser
            req.user.isAdmin = role === "admin"
            return handler(req, res)
        } catch (e) {
            return res.status(401).json({
                success: false,
                message: 'Invalid access token, please login again'
            })
        }
    }
}

export default withAuthOwner