/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-03-27 20:45:41
 * @LastEditTime : 2020-02-20 19:54:26
 * @LastEditors  : Please set LastEditors
 */
let util = require('./util')
let stuAE = require('../../model/stu_ae')
let ModelResult = require('../../model/model_result')


function studentAEDataProcess(req, res, next) {
    const regex = req.query.grade === "2010" ? /^2010/ : /^29/
    const flag = parseInt(req.query.flag)

    new Promise((resolve, reject) => {
        ModelResult
            .find({ sid: { $regex: regex }, flag: flag }, { sid: 1, _id: 0 })
            .then(res => {
                let stu_list = res.map(e => e.sid)
                resolve(stu_list)
            })
    }).then(stu_list => {
        stuAE.find({ sid: { $in: stu_list } })
            .then((results) => {
                let response = results
                util.responseClient(res, 200, 0, 'success', response)
            })
    })
        .catch((error) => {
            console.log(error)
        })
}


module.exports = studentAEDataProcess