import withMethodCheck from '../../../middleware/withMethodCheck'
import rule from '../../../models/rule'
import dbConnect from '../../../db/mongoose'

const handler = async (req, res) => {
    const method = ['GET']
    const query = req.query

    withMethodCheck(req, res, method)
    
    await dbConnect()
    const rules = await rule.find({ ...query })

    return res.status(200).json({
        success: true,
        message: '',
        data: {
            rules
        }
    })
}

export default handler