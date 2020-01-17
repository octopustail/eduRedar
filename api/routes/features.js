let util = require('./util')
let featuresModel = require('../../model/feature')

function queryFeatures(req, res, next) {
    let queryID = req.query.sid || null
    let responseData = { features: {} }
    filter = {
        '_id':0,
        'sid': 1,
        '1_shwr': 1,
        '12_lib': 1,
        '10_lib':1,
        '1_lib': 1,
        '11_lib':1,
        '5_lib':1,
        '6_lib' :1

    }
    featuresModel.find({},filter).limit(100)
        .then(result => {
            responseData.features = result;
            // responseData.sid = queryID;
            console.log('result', result)
            util.responseClient(res, 200, 0, 'success', responseData)
        })
}


module.exports = queryFeatures