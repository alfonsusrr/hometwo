import withMethodCheck from '../../../middleware/withMethodCheck'
import universityList from '../../../models/universityList'
import stateList from '../../../models/stateList'
import dbConnect from '../../../db/mongoose'

const handler = async (req, res) => {
    const method = ['GET']
    const query = req.query
    withMethodCheck(req, res, method)

    await dbConnect()
    if (query?.state) {
        const state = await stateList.findOne({$or: [{ name: query.state }, { abbr: query.state }]})
        query.state = state?._id.toString()
    }

    const university = await universityList.find({ ...query }).populate('state')

    const response = university.map((uni) => {
        return {
            id: uni._id,
            name: uni.name,
            state: uni?.state?.abbr
        }
    })

    return res.status(200).json({
        success: true,
        message: '',
        data: {
            university: response
        }
    })
}

export default handler