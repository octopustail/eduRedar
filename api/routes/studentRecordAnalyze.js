/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-25 16:33:09
 * @LastEditTime: 2019-09-25 20:28:31
 * @LastEditors: Please set LastEditors
 */
let util = require('./util')
let StuRecordAnalyze  = require('../../model/stu_record_analyze')

function studentRecordDataProcess(req,res,next){
    // let queryID = req.query.sid || null
    let responseData = {stuRecordAnalyze : {}}
    // StuRecord.findOne({sid:`${queryID}`})
     StuRecordAnalyze.find()
    .then(result =>{
        responseData.stuRecordAnalyze = result;
        util.responseClient(res,200,0,'success',responseData)
    })
}


module.exports = studentRecordDataProcess