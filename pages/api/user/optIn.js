const withMethodCheck = require('../../../middleware/withMethodCheck')
const dbConnect = require('../../../db/mongoose')
const optInEmail = require('../../../models/optInEmail')

const handler = async (req, res) => {
    const method = ['POST']
    withMethodCheck(req, res, method)

    try {
        const { email } = req.body
        const newEmail = new optInEmail({
            email
        })
        await newEmail.save()
    } catch(e){
        return res.status(400).json({
            success: false,
            message: 'Opt In failed'
        })
    }
    return res.status(200).json({
        success: true,
        message: 'Opt In success'
    })
}

export default handler