const withMethodCheck = require('../../../middleware/withMethodCheck');
const formidable = require('formidable');
const ImageKit = require("imagekit");
const fs = require('fs');
const ObjectId = require('mongoose').Types.ObjectId;
import { v4 as uuid } from 'uuid';
import dbConnect from '../../../db/mongoose';
import Room from '../../../models/room';
import withAuthOwner from '../../../middleware/withAuthOwner'

const handler = async (req, res) => {
    const method = ['POST', 'GET', 'PATCH', 'DELETE']
    withMethodCheck(req, res, method)

    await dbConnect()

    if (req.method === 'POST') {
        const form = formidable({ multiples: true });

        let formData, formFiles
        try {
            const err = await new Promise((resolve, reject) => {
                form.parse(req, function (err, fields, files) {
                    if (err) {
                        reject(err)
                    }
                    else {
                        formData = fields
                        formFiles = files
                        resolve()
                    }
                })
            })
            
            if (err) {
                throw new Error
            }
        } catch (e) {
            return res.status(400).json({
                success: false,
                message: 'Invalid form data'
            })
        }

        let imagekit = new ImageKit({
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
            urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
        })

        let roomPictures = []
        let propertyPictures = []

        try {
            await new Promise(async (resolve, reject) => {
                for (const [key, value] of Object.entries(formFiles)) {
                    if (key.startsWith("img-room") || key.startsWith("img-property")) {
                        const file = formFiles[key]
                        const data = fs.readFileSync(file.filepath)

                        try {
                            const result = await imagekit.upload({
                                file: data,
                                fileName: uuid(),
                                folder: '/room/'
                            })
                            
                            if (key.startsWith("img-room")) {
                                roomPictures.push(result.url)
                            } else if (key.startsWith("img-property")) {
                                propertyPictures.push(result.url)
                            }
                        } catch(e) {
                            reject(e)
                        }
                    }
                }

                resolve()
            })
        } catch(e) {
            return res.status(400).json({
                success: false,
                message: 'Upload image error'
            })
        }

        const position = JSON.parse(formData.position)
        Object.keys(formData).forEach((key) => {
            let parsedValue = formData[key].startsWith('[') || formData[key].startsWith('{') ? JSON.parse(formData[key]) : formData[key]
            if (key === 'price') {
                parsedValue = typeof(parsedValue) === 'number' ? parsedValue : parseInt(parsedValue)
            } else if (key === 'hosted') {
                parsedValue = parsedValue === 'true' ? true : false
            } else if (['school', 'facilities', 'listedRules'].includes(key)) {
                parsedValue = parsedValue.map((id) => {
                    return ObjectId(id)
                })
            } else if (key === 'additionalPrice') {
                parsedValue = parsedValue.map((val) => {
                    return {
                        description: val.description,
                        price: typeof(val.price) === 'number' ? val.price : parseInt(val.price)
                    }
                })
            }
            formData[key] = parsedValue
        })

        delete formData.position
        formData.lat = position.lat,
        formData.lng = position.lng
        formData.roomPictures = roomPictures
        formData.propertyPictures = propertyPictures

        if (!req.user.isAdmin) {
            formData.owner = ObjectId(req.user._id)    
        }

        const newRoom = new Room(formData)
        await newRoom.save()

        return res.status(200).json({
            success: true,
            message: 'Room added successfully'
        })
    } else if (req.method === 'GET') {
        const owner = req.user
        const query = req.query
        
        const rooms = await Room.find({ ...query }).populate("listedRules facilities school")

        console.log(rooms)
        return res.status(200).json({
            success:true,
            message: '',
            data: {
                rooms: rooms
            }
        })
    }
}

export const config = {
    api: {
      bodyParser: false
    }
  };

export default withAuthOwner(handler)

