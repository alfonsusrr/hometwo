import withAuth from '../../../middleware/withAuth'
const User = require('../../../models/user')
const { deleteCookie, getCookie } = require('cookies-next')
const withMethodCheck = require('../../../middleware/withMethodCheck')

const methods = ['POST']
const handler = async (req, res) => {
    withMethodCheck(req, res, methods)

    const refreshToken = getCookie('refresh_token', { req, res })
    const accessToken = getCookie('access_token', { req, res })

    deleteCookie('refresh_token', { req, res })
    deleteCookie('access_token', { req, res })

    await req.user.userLogout({ refreshToken, accessToken })

    return res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    })
}

export default withAuth(handler)