const Admin = require('../../../models/admin')
const { setCookie } = require('cookies-next')
const bcrypt = require('bcrypt')
const withMethodCheck = require('../../../middleware/withMethodCheck')
const dbConnect = require('../../../db/mongoose')

const method = ['POST']
const handler = async (req, res) => {
    withMethodCheck(req, res, method)
    await dbConnect()

    const { uid, password } = req.body

    // Add new refresh token and access token to database
    let admin = await Admin.findOne({ uid })

    if (!admin) {
        return res.status(400).json({
            success: false,
            message: 'Invalid credentials'
        })
    }
    const isPasswordMatch = bcrypt.compareSync(password, admin.password)

    if (!isPasswordMatch) {
        return res.status(400).json({
            success: false,
            message: 'Invalid credentials'
        })
    }
    

    const refreshToken = await admin.generateRefreshToken(null)
    const accessToken = await admin.generateAccessToken(null)
    
    setCookie("admin-refresh-token", refreshToken, {
        req, res,
        httpOnly: true,
        maxAge: 60 * 24 * 60 * 60,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'Lax',
        secure: process.env.NODE_ENV === 'production'? true : false
    })

    setCookie("admin-access-token", accessToken, {
        req, res,
        httpOnly: true,
        maxAge: 24 * 60 * 60,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'Lax',
        secure: process.env.NODE_ENV === 'production'? true : false
    })

    return res.status(200).json({
        success: true,
        message: 'Logged in successfully',
        data: {
            user: {
                uid: admin.uid,
                name: admin.name,
                level: admin.level
            }
        }
    })
}

export default handler