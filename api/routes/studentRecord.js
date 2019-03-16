let util = require('./util')
let StuRecord  = require('../../model/stu_record')

function studentRecordDataProcess(req,res,next){
    let queryID = req.query.sid || null
    let responseData = {stuRecord : {}}
    // StuRecord.findOne({sid:`${queryID}`})
    StuRecord.findOne()
    .then(result =>{
        responseData.stuRecord = result;
        console.log('result',result)
        util.responseClient(res,200,0,'success',responseData)
    })
}


module.exports = studentRecordDataProcess