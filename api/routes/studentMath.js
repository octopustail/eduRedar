/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-17 09:34:18
 * @LastEditTime: 2019-10-18 09:28:27
 * @LastEditors: Please set LastEditors
 */
let util = require('./util')
let StuMath  = require('../../model/stu_math')

function studentRecordDataProcess(req,res,next){
    let responseData = {stuMath : {}}
    // StuMath.findOne({sid:`${queryID}`})
    StuMath.find({sid:{$regex:/^2906/}},{_id:0})
    .then(result =>{
        responseData.stuMath = result;
        util.responseClient(res,200,0,'success',responseData)
    })
}


module.exports = studentRecordDataProcess