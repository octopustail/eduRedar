/*
 * @Description: 从数据库里获取预测名单
 * @Author: Octo
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-10 10:58:44
 * @LastEditTime: 2019-04-25 12:31:48
 */
let util = require('./util')
let  algorismModels = require('../../model/stu_algorism')
function studentGroupDataProcess(req, res, next) {
    let stype = req.query.stype || 'rf'
    //后台保存一个学生分类的students对象，里面包含各个种类的学生的学号列表
    // let queryID = req.query.stype || null
    const response = {}
    response.students = {}
    // let responseData = { gpa: [], ae: [], records: [] }
    algorismModels.randomForests.find().then((result) => {
        response.students = result 
        util.responseClient(res, 200, 0, 'success', response)
        // next(result)
    })

    // adanet.find({stype:stype}).then((result) => {
    //     util.responseClient(res, 200, 0, 'success', result)
    //     // next(result)
    // })

}


module.exports = studentGroupDataProcess