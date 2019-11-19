/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-03-27 20:45:41
 * @LastEditTime: 2019-11-18 16:03:49
 * @LastEditors: Please set LastEditors
 */
let util = require('./util')
let stuGPA = require('../../model/stu_gpa')


function studentGPADataProcess(req, res, next) {
    let list = JSON.parse(req.query.list)

   const findstuLib = new Promise((resolve, reject) => {
    stuGPA.find({sid:{$in:list}}).then((results)=>{
        let response = results
        util.responseClient(res, 200, 0, 'success', response)
    })
})  
}


module.exports = studentGPADataProcess