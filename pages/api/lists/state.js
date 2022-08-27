import withMethodCheck from '../../../middleware/withMethodCheck'
import stateList from '../../../models/stateList'
import dbConnect from '../../../db/mongoose'

const handler = async (req, res) => {
    const method = ['GET']
    withMethodCheck(req, res, method)
    
    await dbConnect()
    const states = await stateList.find({})
    
    return res.status(200).json({
        success: true,
        message: '',
        data: {
            states
        }
    })
}

export default handler