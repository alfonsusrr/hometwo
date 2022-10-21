const withMethodCheck = require('../../../middleware/withMethodCheck');
const formidable = require('formidable');
const ImageKit = require("imagekit");
const fs = require('fs');
const ObjectId = require('mongoose').Types.ObjectId;
import { v4 as uuid } from 'uuid';
import dbConnect from '../../../db/mongoose';
import Room from '../../../models/room';
import User from '../../../models/user';
import withAuthAdmin from '../../../middleware/withAuthAdmin'

const handler = async (req, res) => {
    const method = ['GET']
    withMethodCheck(req, res, method)

    await dbConnect()

    const owner = req.user
    const query = req.query

    const allowedQuery = ['query', 'name', 'address', 'active', 'hosted',
                        'school', 'consent', 'minPrice', 'maxPrice', 'type',
                        'country', 'state', 'city'
                    ]

    const regexQuery = ['query', 'address', 'name']
    
    let mappedQueries = {}
    Object.entries(query).forEach(([key, value]) => {
        if (allowedQuery.includes(key)) {
            if (regexQuery.includes(key)) {
                if (key === "query") {
                    mappedQueries["name"] = {
                        $regex: value,
                        $options: 'i'
                    }
                }
            }

            if (key === "minPrice") {
                mappedQueries.price = {
                    ...mappedQueries?.price,
                    $gte: parseInt(value)
                }
            } else if (key === "maxPrice") {
                mappedQueries.price = {
                    ...mappedQueries?.price,
                    $lte: parseInt(value)
                }
            }
        }
    })

    console.log(mappedQueries)

    const numOfItems = query?.numItems || 25
    const page = query?.page || 1
    
    const rooms = await Room.find({...mappedQueries})
        .limit(page * numOfItems).skip((page - 1) * numOfItems)
        .populate("listedRules facilities school")
        .populate({
            path: "owner",
            select: ["uid", "name", "phoneNumber"]
        })

    const mappedRooms = rooms.map((room) => {
        return {
            id: room._id,
            active: room.active,
            consent: room.consent,
            price: room.price,
            owner: {
                id: room?.owner?._id,
                name: room?.owner?.name,
            },
            contact: room.contact || room.owner.phoneNumber,
            name: room.name,
            type: room.type,
            hosted: room.hosted,
            additionalPrice: room.additionalPrice.map((price) => {
                return {
                    description: price.description,
                    price: price.price
                }
            }),
            address: room.address,
            school: room.school.map((sch) => {
                return sch.name
            }),
            facilities: room.facilities.map((facility) => {
                return {
                    type: facility.type,
                    label: facility.label
                }
            })
        }
    })
    return res.status(200).json({
        success:true,
        message: '',
        data: {
            rooms: mappedRooms
        }
    })
}

export default withAuthAdmin(handler)

