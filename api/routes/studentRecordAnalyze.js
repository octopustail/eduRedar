/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-25 16:33:09
 * @LastEditTime: 2019-10-31 18:33:00
 * @LastEditors: Please set LastEditors
 */
let util = require('./util')
let StuRecordAnalyze = require('../../model/stu_record_analyze')
let StuGpaAnalyze = require('../../model/stu_gpa')

function studentRecordDataProcess(req, res, next) {
    // let queryID = req.query.sid || null
    let responseData = { stuRecordAnalyze: {} }
    // StuRecord.findOne({sid:`${queryID}`})
    // StuGpaAnalyze.findOne()
    // StuGpaAnalyze
    // .find({$where:"(this['2009-2010_1'] - this['2009-2010_2']) > 10  && (this['2009-2010_2']-this['2010-2011_1']>10)"},{_id:0,sid:1})
    // // .find({$where:"this['2009-2010_1']>85  && this['2009-2010_2']>85 && this['2010-2011_1']>85"},{_id:0,sid:1})
    // .then(result => {
    //     // console.log('result',result)
    //     let ids = result.map(el=>el.sid)
    //     let _ids = new Set(ids)
    //     console.log('ids',_ids)
    //     StuRecordAnalyze.find({ sid:{$in: ids},sems:7 })

    //     // .sort({sid:1})
    //     // .sort({ size_food: -1 })
    //     .sort({ size_library: -1 })
    //     // .sort({size_shower:-1})
    //     // .sort({size_hotwater:-1})

    //     // .limit(100)
    //     .then(results => {
    //         responseData.stuRecordAnalyze = results;

    //         util.responseClient(res, 200, 0, 'success', responseData)
    //     })
    // })

    let arr = ["2906303032","2906306023","2906301017","2906302026","2906005010","2906301025","2906302014"]
    StuRecordAnalyze.find({ sems: 7,sid:{$in: arr}})

        // .sort({sid:-1})
        // .sort({size_food:-1})
        .sort({ size_library: -1 })
        // .sort({size_shower:-1})
        // .sort({size_hotwater:-1})

        // .limit(100)
        .then(result => {
            responseData.stuRecordAnalyze = result;
            util.responseClient(res, 200, 0, 'success', responseData)
        })
}


module.exports = studentRecordDataProcess
