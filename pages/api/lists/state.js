import withMethodCheck from '../../../middleware/withMethodCheck'
import stateList from '../../../models/stateList'

const handler = async (req, res) => {
    const method = ['GET']
    withMethodCheck(req, res, method)

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