/*
 * @Author: your name
 * @Date: 2020-01-17 14:44:56
 * @LastEditTime : 2020-02-17 17:30:30
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /eduRedar/api/routes/features.js
 */
let util = require('./util')
let featuresModel = require('../../model/feature')
let ModelResult = require('../../model/model_result')

function queryFeatures(req, res, next) {
    let regex = req.query.grade === "2010" ? /^2010/ : /^29/
    let flag = parseInt(req.query.flag) || 3

    const filter = {
        '_id': 0,
        'sid': 1,
        '1_shwr': 1,
        '12_lib': 1,
        '10_lib': 1,
        '1_lib': 1,
        '11_lib': 1,
        '5_lib': 1,
        '6_lib': 1
    }
    new Promise((resolve, reject) => {
        ModelResult
            .find({ sid: { $regex: regex }, flag: flag }, { sid: 1, _id: 0 })
            .then(res => {
                let stu_list = res.map(e => e.sid)
                resolve(stu_list)
            })
    }).then(stu_list => {
        console.log("+++++++++++++++++++++/n",stu_list)
        featuresModel
            .find({ sid: { $in: stu_list } }, filter)
            .then((result) => {
                let responseData = { features: {} }
                responseData.features = result;
                util.responseClient(res, 200, 0, 'success', responseData)
            })
    })
        .catch((error) => {
            console.log(error)
        })
}


module.exports = queryFeatures