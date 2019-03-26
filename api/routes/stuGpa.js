let util = require('./util')
let stuGPA = require('../../model/stu_gpa')
let stuLib10s = require('../../model/stu_lib_10')
let stuAE = require('../../model/stu_ae')
let stuType = require('../../model/stu_type')
function studentGPADataProcess(req, res, next) {
    let stype = req.query.stype || 'good'
    let list = req.query.list
    //后台保存一个学生分类的students对象，里面包含各个种类的学生的学号列表
    // let queryID = req.query.stype || null

    let responseData = { gpa: [], ae: [], records: [] }
    stuGPA.find({ sid: { $in: list } })
        .then(result => {

            // responseData.gpa = {nodes,links};
            responseData.gpa = { result, stype: stype };
            stuLib10s.find({ sid: { $in: list } })
                .then((result) => {
                    console.log('result2', result)
                    responseData.records = result
                    stuAE.find({ sid: { $regex: /^2906/ } })
                        .then((result) => {
                            responseData.ae = result
                            util.responseClient(res, 200, 0, 'success', responseData)

                        })
                })

        })
        .catch((error) => {
            console.log(error)
        })
    //这么写真的非常丑陋，希望通过promise的方式来进行两次查询异步控制，当两次都查询都返回结果的时候在response，但是没有做到。之后代码优化的点

    // const findstuGPA = new Promise((resolve, reject) => {
    //     console.log('in promise')
    //     return stuGPA.find({ sid: { $regex: /^2906/ } })
    //     // .then((result) => {
    //     //     console.log('lib', result)
    //     //     responseData.records = result
    //     //     resolve()

    //     // })
    // })

    // const findstuLib = new Promise((resolve, reject) => {
    //     console.log('in promise')
    //     return stuLib10s.find({ sid: { $regex: /^2906/ } })
    //     // .then((result) => {
    //     //     console.log('lib', result)
    //     //     responseData.records = result
    //     //     resolve()

    //     // })
    // })

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