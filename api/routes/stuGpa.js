/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-03-27 20:45:41
 * @LastEditTime: 2019-10-18 11:04:27
 * @LastEditors: Please set LastEditors
 */
let util = require('./util')
let stuGPA = require('../../model/stu_gpa')
let stuLib10s = require('../../model/stu_lib_10')
let stuAE = require('../../model/stu_ae')
let stuType = require('../../model/stu_type')
let StuRecord  = require('../../model/stu_record')

function studentGPADataProcess(req, res, next) {
    let stype = req.query.stype || 'good'
    let liststr = req.query.list
    //后台保存一个学生分类的students对象，里面包含各个种类的学生的学号列表
    // let queryID = req.query.stype || null
   let list =  liststr.split(',')
    let responseData = { gpa: [], ae: [], records: [] }

    const findstuGPA = new Promise((resolve, reject) => {
        // stuGPA.find({sid: {$in: list}}).then((results)=>{resolve(results)})
        stuGPA.find({},{sid:1,_id:0}).sort({"2011-2012_1":-1}).then((results)=>{resolve(results)})
    })

    const findstuLib = new Promise((resolve, reject) => {
        stuLib10s.find({ sid: { $in: list } }).then((results)=>{resolve(results)})
    })
    const findstuAE = new Promise((resolve, reject) => {
        stuAE.find({ sid: { $in: list} }).then((results)=>{resolve(results)})
    })

    const findstuRecord = new Promise((resolve, reject) => {
        stuAE.find({ sid: { $in: list} }).then((results)=>{resolve(results)})
    })    
           
    //results、error都没有打印出来。
Promise.all([findstuGPA,findstuLib,findstuAE,findstuRecord])
.then((results)=>{
    responseData.gpa = results[0] 
    responseData.records = results[1] 
    responseData.ae = results[2]
    // responseData.records = results[3]
    util.responseClient(res, 200, 0, 'success', responseData)
})
.catch((err)=>{
    console.log('err',err)
})
    // const findstuGPA = stuGPA.find({ sid: { $regex: /^2906/ } })
    // const findstuLib = stuLib10s.find({ sid: { $regex: /^2906/ } })


    // Promise.all(findstuGPA, findstuLib)
    //     .then(results => {
    //         console.log(results)
    //         util.responseClient(res, 200, 0, 'success', responseData)
    //     })
    //     .catch(error => { console.log(error) })

    // findstuGpa
    //     // .then(() => { return findstuLib() })
    //     .then(() => {
    //         console.log('resolved')
    //         util.responseClient(res, 200, 0, 'success', responseData)

    //     }).catch(e => {
    //         return e
    //     })

    // stuGPA.find({ sid: { $regex: /^201006/ } })
    //     .then(result => {

    //         // responseData.gpa = {nodes,links};
    //         responseData.gpa = {result,stype:stype};
    //         let promise = new Promise()  
    //     }).then((result)=>{
    //         console.log('result2',result)
    //         // responseData.flow = result 
    //         util.responseClient(res, 200, 0, 'success', responseData)
    //     })
    //     .catch((error)=>{
    //         console.log(error)
    //     })
    //     stuLib10s.find({sid:{$regex:/^2906/}})
    // .then(result=>{
    //     responseData.records = result
    // util.responseClient(res, 200, 0, 'success', responseData)
    // })


}


module.exports = studentGPADataProcess