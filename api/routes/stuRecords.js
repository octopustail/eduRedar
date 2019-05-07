/*
 * @Description: 第二版视图中的学生scatter视图的数据获取
 * @Author: octo
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-10 21:34:55
 * @LastEditTime: 2019-04-11 15:53:23
 */
let util = require('./util')
let stuRecords = require('../../model/stu_record')

function studentGPADataProcess(req, res, next) {

    stuRecords.findOne()
        .then((result) => {
            util.responseClient(res, 200, 0, 'success', result)

        })

    // let stype = req.query.stype || 'good'
    // let liststr = req.query.list
    // //后台保存一个学生分类的students对象，里面包含各个种类的学生的学号列表
    // // let queryID = req.query.stype || null
    // let list = liststr.split(',')


    // let responseData = { gpa: [], ae: [], records: [] }

    // const findstuGPA = new Promise((resolve, reject) => {
    //     console.log('in promise1')
    //     // resolve('p1')
    //     stuGPA.find({ sid: { $in: list } }).then((results) => { resolve(results) })
    //     // stuGPA.find({ sid: { $in: list } }).then((results)=>{resolve(results)}).catch((err)=>{reject(err)})
    //     console.log('out promise1')

    // })

    // const findstuLib = new Promise((resolve, reject) => {
    //     console.log('in promise2')

    //     // stuLib10s.find({ sid: { $in: list } }).then((results)=>{resolve(results)}).catch((err)=>{reject(err)})
    //     stuLib10s.find({ sid: { $in: list } }).then((results) => { resolve(results) })
    //     console.log('out promise1')


    // })
    // const findstuAE = new Promise((resolve, reject) => {
    //     console.log('in promise3')
    //     // resolve('p1')

    //     // stuAE.find({ sid: { $in: list} }).then((results)=>{resolve(results)}).catch((err)=>{reject(err)})
    //     stuAE.find({ sid: { $in: list } }).then((results) => { resolve(results) })
    //     console.log('out promise1')

    // })

    // //results、error都没有打印出来。
    // Promise.all([findstuGPA, findstuLib, findstuAE])
    //     .then((results) => {
    //         responseData.gpa = results[0]
    //         responseData.records = results[1]
    //         responseData.ae = results[2]
    //         responseData.stype = stype
    //         util.responseClient(res, 200, 0, 'success', responseData)
    //         console.log(results)
    //     })
    //     .catch((err) => {
    //         console.log('err', err)
    //     })



}


module.exports = studentGPADataProcess