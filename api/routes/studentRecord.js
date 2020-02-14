let util = require('./util')
let StuRecord = require('../../model/stu_record')
let PersonalFeature = require('../../model/Personalfeature')

function studentRecordDataProcess(req, res, next) {
    let queryID = req.query.sid || null
    let responseData = { stuRecord: {} }
    // StuRecord.findOne({sid:`${queryID}`})

    const findstuRecord = new Promise((resolve, reject) => {

        StuRecord.find({ sid: `${queryID}` }).then((results) => { resolve(results) })

    })

    const findPersonalFeature = new Promise((resolve, reject) => {

        PersonalFeature.find({ sid: `${queryID}` }).then((results) => { resolve(results) })

    })

    Promise.all([findstuRecord, findPersonalFeature])
        .then((results) => {
            responseData.stuRecord = results[0]
            responseData.personalFeature = results[1]
            responseData.sid = queryID;
            util.responseClient(res, 200, 0, 'success', responseData)
        })
        .catch((err) => {
            console.log('err', err)
        })
}


module.exports = studentRecordDataProcess