import withAuthAdmin from '../../../middleware/withAuthAdmin'
const User = require('../../../models/user')
const { deleteCookie, getCookie } = require('cookies-next')
const withMethodCheck = require('../../../middleware/withMethodCheck')

const methods = ['POST']
const handler = async (req, res) => {
    withMethodCheck(req, res, methods)

    const refreshToken = getCookie('admin_refresh_token', { req, res })
    const accessToken = getCookie('admin_access_token', { req, res })

    deleteCookie('admin_refresh_token', { req, res })
    deleteCookie('admin_access_token', { req, res })

    await req.user.adminLogout({ refreshToken, accessToken })

    return res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    })
}

export default withAuthAdmin(handler)