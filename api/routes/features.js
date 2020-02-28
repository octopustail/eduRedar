/*
 * @Author: your name
 * @Date: 2020-01-17 14:44:56
 * @LastEditTime: 2020-02-28 09:26:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /eduRedar/api/routes/features.js
 */
let util = require('./util')
let featuresModel = require('../../model/feature')
let ModelResult = require('../../model/model_result')

function queryFeatures(req, res, next) {
    let regex = req.query.grade === "2010" ? /^2010/ : /^29/
    let flag = parseInt(req.query.flag)

    const filter = {
        '_id': 0,
        '1_score': 0,
        '2_score': 0,
    }
    new Promise((resolve, reject) => {
        ModelResult
            .find({ sid: { $regex: regex }, flag: flag }, { sid: 1, _id: 0 })
            .then(res => {
                let stu_list = res.map(e => e.sid)
                resolve(stu_list)
            })
    }).then(stu_list => {
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