/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-03-27 20:45:41
 * @LastEditTime: 2019-09-23 21:30:50
 * @LastEditors: Please set LastEditors
 */
let util = require('./util')
let stuGPA = require('../../model/stu_gpa')
let stuLib10s = require('../../model/stu_lib_10')
let stuAE = require('../../model/stu_ae')
let stuType = require('../../model/stu_type')
function studentGPADataProcess(req, res, next) {
    let stype = req.query.stype || 'good'
    let liststr = req.query.list
    //后台保存一个学生分类的students对象，里面包含各个种类的学生的学号列表
    // let queryID = req.query.stype || null
   let list =  liststr.split(',')


    let responseData = { gpa: [], ae: [], records: [] }

    const findstuGPA = new Promise((resolve, reject) => {
        console.log('in promise1')
        // resolve('p1')
        stuGPA.find({sid: {$in: list}}).then((results)=>{resolve(results)})
        // stuGPA.find().skip(start-1).limit(end-start+1).then((results)=>{resolve(results)}).catch((err)=>{reject(err)})
        console.log('out promise1')

    })

    const findstuLib = new Promise((resolve, reject) => {
        console.log('in promise2')

        // stuLib10s.find({ sid: { $in: list } }).then((results)=>{resolve(results)}).catch((err)=>{reject(err)})
        stuLib10s.find({ sid: { $in: list } }).then((results)=>{resolve(results)})
        console.log('out promise1')

        
    })
    const findstuAE = new Promise((resolve, reject) => {
        console.log('in promise3')
        // resolve('p1')

        // stuAE.find({ sid: { $in: list} }).then((results)=>{resolve(results)}).catch((err)=>{reject(err)})
        stuAE.find({ sid: { $in: list} }).then((results)=>{resolve(results)})
        console.log('out promise1')
        
    })
           
    //results、error都没有打印出来。
Promise.all([findstuGPA,findstuLib,findstuAE])
.then((results)=>{
    responseData.gpa = results[0] 
    responseData.records = results[1]
    responseData.ae = results[2]
    responseData.stype = stype
    util.responseClient(res, 200, 0, 'success', responseData)
    // console.log(results)
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