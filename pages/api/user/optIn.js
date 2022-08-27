const withMethodCheck = require('../../../middleware/withMethodCheck')
const optInEmail = require('../../../models/optInEmail')
import dbConnect from '../../../db/mongoose'

const handler = async (req, res) => {
    const method = ['POST']
    withMethodCheck(req, res, method)

    await dbConnect()
    try {
        const { email } = req.body

        const existingEmail = await optInEmail.findOne({ email: email })
        if (existingEmail) {
            return res.status(200).json({
                success: true,
                message: 'Opt In success'
            })
        }
        const newEmail = new optInEmail({
            email
        })
        await newEmail.save()
    } catch(e){
        console.log(e)
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