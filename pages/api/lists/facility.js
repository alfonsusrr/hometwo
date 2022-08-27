import withMethodCheck from '../../../middleware/withMethodCheck'
import facility from '../../../models/facility'
import dbConnect from '../../../db/mongoose'

const handler = async (req, res) => {
    const method = ['GET']
    const query = req.query

    withMethodCheck(req, res, method)
    
    await dbConnect()
    const facilities = await facility.find({ ...query })

    return res.status(200).json({
        success: true,
        message: '',
        data: {
            facilities
        }
    })
}

export default handler