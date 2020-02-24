/*
 * @Author: your name
 * @Date: 2019-12-23 10:30:06
 * @LastEditTime : 2020-02-24 20:27:03
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /eduRedar/api/routes/studentRecord.js
 */
let util = require('./util')
let StuRecord = require('../../model/stu_record')
let PersonalFeature = require('../../model/Personalfeature')
let StuMath  = require('../../model/stu_math')
let StuWork  = require('../../model/stu_works')

function studentRecordDataProcess(req, res, next) {
    let queryID = req.query.sid || null
    let responseData = { stuRecord: {} }

    const findstuRecord = new Promise((resolve, reject) => {

        StuRecord.find({ sid: `${queryID}` }).then((results) => { resolve(results) })

    })

    const findPersonalFeature = new Promise((resolve, reject) => {

        PersonalFeature.findOne({ sid: `${queryID}` }).then((results) => { resolve(results) })

    })

    const findstuMath = new Promise((resolve, reject) => {

        StuMath.findOne({ sid: `${queryID}` },{_id:0,sid:0}).then((results) => { 
            resolve(results) })

    })

    const findstuWork =  new Promise((resolve, reject) => {

        StuWork.findOne({ sid: `${queryID}` },{_id:0,sid:0}).then((results) => { 
            resolve(results) })

    })

    Promise.all([findstuRecord, findPersonalFeature,findstuMath,findstuWork])
        .then((results) => {
            responseData.mathGrade = results[2]
            responseData.stuRecord = results[0]
            responseData.personalFeature = results[1]
            responseData. work_info= results[3]
            responseData.sid = queryID;
            util.responseClient(res, 200, 0, 'success', responseData)
        })
        .catch((err) => {
            console.log('err', err)
        })
}


module.exports = studentRecordDataProcess