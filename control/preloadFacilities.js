const ObjectId = require('mongoose').Types.ObjectId

const facilities = [
]

const additional = [
    'Package Locker',
    'Fitness Center',
    'Coworking Lounge',
    'Bicycle Storage',
    'Rooftop',
]

const features = [
    'Near shopping center',
    'Near groceries market',
]

const f = facilities.map((fac) => {
    return {
        _id: {
            '$oid': new ObjectId()
        },
        label: fac,
        type: "basic"
    }
})

const a = additional.map((add) => {
    return {
        _id: {
            '$oid': new ObjectId()
        },
        label: add,
        type: "additional"
    }
})

const fe = features.map((ff) => {
    return {
        _id: {
            '$oid': new ObjectId()
        },
        label: ff,
        type: "feature"
    }
})

let all_features = JSON.stringify(f.concat(a).concat(fe))
const fs = require('fs')

fs.writeFile('newFacility.json', all_features, () => {})