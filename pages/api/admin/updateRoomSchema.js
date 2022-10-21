const withMethodCheck = require('../../../middleware/withMethodCheck');
import dbConnect from '../../../db/mongoose';
import Room from '../../../models/room';
import User from '../../../models/user';
import withAuthAdmin from '../../../middleware/withAuthAdmin'

const handler = async (req, res) => {
    const method = ['GET']
    withMethodCheck(req, res, method)

    await dbConnect()

    try {
        await Room.updateMany({}, {
            consent: true,
            active: true
        })
        res.status(200).json({
            success: true,
            message: "Room Schema updated"
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

export default withAuthAdmin(handler)

