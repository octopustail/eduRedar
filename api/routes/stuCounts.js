/*
 * @Description: 第二版中学生river图数据的获取
 * @Author: octo
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-10 21:34:45
 * @LastEditTime: 2019-04-12 20:11:47
 */
const util = require('./util')
const models = require('../../model/stu_counts_09')
const studentsModel = require('../../model/stu_algorism')
function studentCounts(req, res, next) {
    //一次性返回全部，req.query中应该有使用哪一种分类方式的参数

    //先去数据库里取出所有的学生名单
    const findStuList = new Promise((resolve, reject) => {
        studentsModel.adanets.find().lean().then(list => resolve(list))
    })

    /**
     * @description: 将数据库里取出来的一类学生的刷卡次数统计成一个数组
     * @param {result: array | model.find().lean()的结果} 
     * @return: 处理的结果通过resolve传给promise
     */
    const calCount = (results,resolve,type,cate) => {
        
        let countObj = {
            stype:type,
            cate:cate
        }
        const semes = ['semes1', 'semes2', 'semes3','semes4','semes5','semes6']
        countObj.countArray = semes.map((seme) => {

            const array = results.reduce((pre, cur, index) => {
                let preArr = (index === 1) ? [...pre[seme]] : pre
                
                let curArr = [...cur[seme]]
                let arr = []
                if (preArr.length !== curArr.length) {
                    let diff = Math.abs(preArr.length - curArr.length)
                    let temp = Array.from({ length: diff }).fill(0)

                    preArr.length > curArr.length ? curArr = [...curArr].concat(temp) : preArr = [...preArr].concat(temp)
                    //创建长度为diff，值为0的数组
                }
                for (let i = 0; i < preArr.length; i++) {
                    arr[i] = parseInt(preArr[i]) + parseInt(curArr[i])
                }
                return arr
            })
            return array


        })
        resolve(countObj)
    }
    const createCountQuery = function (list, type,cate) {
        return new Promise((resolve, reject) => {
            //type: shower,food,hotwater,library
            // models[type].find({ sid: { $in: list } }).lean()
            // .then(result => resolve(result))
            // .reject((err) => console.log(err))

            // models[type].find().lean()     
            models[type].find({ sid: { $in: list } }).lean()

                // .then(result => resolve(result))
                .then(result => { calCount(result,resolve,type,cate) })
                .catch((err) => console.log(err))
        })
    }

    findStuList.then((lists) => {
        let promises = []
        lists.forEach(element => {

            let promiseShwr = createCountQuery(element.list, 'shower',element.cate)
            let promiseFd = createCountQuery(element.list, 'food',element.cate)
            let promiseLib = createCountQuery(element.list, 'library',element.cate)
            let promisehw = createCountQuery(element.list, 'hotwater',element.cate)
            promises = promises.concat([promiseShwr, promiseFd, promiseLib, promisehw])
        });


        Promise.all(promises)
            .then((result) => {
                util.responseClient(res, 200, 0, 'success', result)
            })
            .catch((err) => {
                console.log(err)
            })
    })


    // let liststr = req.query.list
    // //后台保存一个学生分类的students对象，里面包含各个种类的学生的学号列表
    // let queryID = req.query.stype || null
    // let list = liststr.split(',')

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


module.exports = studentCounts