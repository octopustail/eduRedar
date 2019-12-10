/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-25 16:33:09
 * @LastEditTime: 2019-12-10 15:32:04
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

    let arr = ["2902002026","2902002029","2923104033","2908001014","2908002003","2901101007","2911103002","2903201005","2903001028","2903004020","2903005031","2902103033","2902104013","2902102002","2906305001","2906303035","2902002008","2902001028","2901309034","2901311008","2901102016","2907101024","2906002007","2906003022","2906005021","2901308022","2901305010","2901306019","2904203009","2908007023","2908005022","2908007012","2908008008","2908008033","2902113033","2904302002","2902107013","2907102027","2911103033"]
    StuRecordAnalyze.find({ sems: 2,sid:{$in: arr}})

        .sort({sid:-1})
        // .sort({size_food:-1})
        // .sort({ size_library: -1 })
        // .sort({size_shower:-1})
        // .sort({size_hotwater:-1})

        // .limit(100)
        .then(result => {
            responseData.stuRecordAnalyze = result;
            util.responseClient(res, 200, 0, 'success', responseData)
        })
}


module.exports = studentRecordDataProcess
