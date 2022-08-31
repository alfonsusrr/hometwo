const ObjectId = require('mongoose').Types.ObjectId

const rules = [
    '24 hours access',
    'No smoking',
    'No sleep over',
    'No pets',
    'No party or event',
    'No loud noise after 11 pm',
    'Keep shared room clean',
]

const f = rules.map((rule) => {
    return {
        _id: {
            '$oid': new ObjectId()
        },
        label: rule,
    }
})

let all_rules = JSON.stringify(f)
const fs = require('fs')

fs.writeFile('newRules.json', all_rules, () => {})