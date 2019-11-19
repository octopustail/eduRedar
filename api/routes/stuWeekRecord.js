/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-03-27 20:45:41
 * @LastEditTime: 2019-11-19 15:27:00
 * @LastEditors: Please set LastEditors
 */
let util = require('./util')
let stuGPA = require('../../model/stu_gpa')
let stuLib10s = require('../../model/stu_lib_10')
let stuAE = require('../../model/stu_ae')
let stuType = require('../../model/stu_type')
let StuRecord  = require('../../model/stu_record')
const models = require('../../model/stu_counts_09')

function studentGPADataProcess(req, res, next) {
    let list = JSON.parse(req.query.list)
    //后台保存一个学生分类的students对象，里面包含各个种类的学生的学号列表

   const findstuLib = new Promise((resolve, reject) => {
            models['library'].find({sid:{$in:list}}).then((results)=>{
                let response = results
                util.responseClient(res, 200, 0, 'success', response)
            })
    })    
}


module.exports = studentGPADataProcess