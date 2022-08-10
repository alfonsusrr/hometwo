const ObjectId = require('mongoose').Types.ObjectId

const facilities = [
    'Wifi',
    'Dryer',
    'Kitchen',
    'Air conditioning',
    'Heater',
    'Dedicated study room',
]

const additional = [
    'Parking lot',
    'Security 24/7',
    'Washer',
    'Dryer',
    'TV',
    'Common room',
    'Laundry service',
]

const features = [
    'Near bus or subway station',
    'Near school',
    'Included electricity and water bill',
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

fs.writeFile('facility.json', all_features, () => {})