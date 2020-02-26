/*
 * @Description: 从数据库里获取预测名单
 * @Author: Octo
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-10 10:58:44
 * @LastEditTime: 2020-02-26 12:59:40
 */
let util = require('./util')
// let  algorismModels = require('../../model/stu_algorism')
let ModelResult = require('../../model/model_result')
let StuMath = require('../../model/stu_math')

function studentGroupDataProcess(req, res, next) {

    ModelResult.aggregate([
        {
            $lookup: {
                from: StuMath.collection.name,
                localField: 'sid',
                foreignField: 'sid',
                as: 'cate_math'
            }
        },
        {
            $project: {
                cate_math: 1,
                flag: 1,
                _id: 0
            }
        }

    ]).then((result) => {

        util.responseClient(res, 200, 0, 'success', result)

    })
}


module.exports = studentGroupDataProcess