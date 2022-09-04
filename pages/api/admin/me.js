const withMethodCheck = require('../../../middleware/withMethodCheck')
import withAuthAdmin from '../../../middleware/withAuthAdmin'
import jwt from 'jsonwebtoken'
const { getCookie } = require('cookies-next')

const handler = async (req, res) => {
    const method = ['POST']
    withMethodCheck(req, res, method)
    

    const user = {
        uid: req.user.uid,
        name: req.user.name,
        level: req.user.level,
        role: "admin"
    }
    
    return res.status(200).json({
        success: true,
        message: '',
        data: {
            user
        }
    })

}

export default withAuthAdmin(handler)