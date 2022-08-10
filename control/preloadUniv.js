const states = require('../data/state.json')
const univs = require('../data/university.json')
const universityList = require('../models/universityList')
const stateList = require('../models/stateList')
const ObjectId = require('mongoose').Types.ObjectId

const preloadState = () => {
    const statesObj = states.map((state) => {
        return ({
            _id: {
                "$oid": new ObjectId()
            },
            name: state.name,
            abbr: state.abbreviation,
        })
    })

    const univObj = univs.map((uni) => {
        const state = statesObj.find((state) => {
            return state.name === uni.state
        })
        const id = state._id.$oid
        return {
            _id: {
                "$oid": new ObjectId()
            },
            name: uni.name,
            state: {
                "$oid": ObjectId(id)
            }
        }
    })

    const stateJSON = JSON.stringify(statesObj)
    const univJSON = JSON.stringify(univObj)

    const fs = require('fs')
    fs.writeFile('state.json', stateJSON, () => {})
    fs.writeFile('university.json', univJSON, () => {})

}

preloadState()