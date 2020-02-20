/*
 * @Description: 日历散点图视图的数据获取
 * @Author: octo
 * @LastEditors  : Please set LastEditors
 * @Date: 2019-04-10 21:34:55
 * @LastEditTime : 2020-02-20 12:51:14
 */
let util = require('./util')
let stuConsumption = require('../../model/stu_consumption')
let ModelResult = require('../../model/model_result')
let moment = require('moment')

const schoolCalendar_09 = {
    sems1: {
        start: new Date('2009-08-31'),
        end: new Date('2010-02-28'),
    },
    sems2: {
        start: new Date('2010-03-01'),
        end: new Date('2010-02-28'),
    }
}
const schoolCalendar_10 = {
    sems1: {
        start: new Date('2010-08-31'),
        end: new Date('2011-02-20'),
    },
    sems2: {
        start: new Date('2011-02-21'),
        end: new Date('2011-08-28'),
    }
}
const dealRecordData = (data, calendar) => {
    const createAtomObj = (date) => {
        let obj = new Object({
            date: date,
            mix: 0,
            food: 0,
            shower: 0,
            hotwater: 0,
            library: 0
        })
        return obj
    }
    let date_start = moment(calendar.start)
    let date_end = moment(calendar.end)
    let total = []
    for (let i = 0; i < 24; i++) {
        let hour = 0;
        let arr = []
        let days = date_end.diff(date_start, 'day')
        for (let j = 0; j <= days; j++) {
            let new_date = moment(date_start).add(j, "day").format('YYYY-MM-DD')
            let atom = createAtomObj(new_date)
            arr.push(atom)
        }
        total.push(arr)
    }
    data.forEach(e => {
        let formated_date = moment(e.date, "YYYY-MM-DD")
        let type = e.type
        let hour = parseInt(e.time.split(":")[0])
        let day_index = formated_date.diff(date_start, "days")
        total[hour][day_index][type]++
    })
    return total
}

const byDay = (data, calendar) => {
    let date_start = moment(calendar.start)
    let date_end = moment(calendar.end)

    let days = date_end.diff(date_start, 'day')

    let total = {
        food: new Array(days).fill(0),
        shower: new Array(days).fill(0),
        library: new Array(days).fill(0),
        hotwater: new Array(days).fill(0),
    }

    data.forEach(e => {        
        let formated_date = moment(e.date, "YYYY-MM-DD")
        let day_index = formated_date.diff(date_start, "days")
        total[e.type][day_index]++
    })
    return total
}


function studentGPADataProcess(req, res, next) {
    // let dtype = "food"
    let sems = req.query.sems || "sems1"
    let grade = req.query.grade || "2010"
    let calendar = grade === "2010" ? schoolCalendar_10[sems] : schoolCalendar_09[sems]
    let regex = grade === "2010" ? /^2010/ : /^29/
    let flag = parseInt(req.query.flaga) || 3

    new Promise((resolve, reject) => {
        ModelResult
            .find({ sid: { $regex: regex }, flag: flag }, { sid: 1, _id: 0 })
            .then(res => {
                let stu_list = res.map(e => e.sid)
                resolve(stu_list)
            })
    }).then(stu_list => {
        const projectOption = {
            sid: 1,
            time: 1,
            date: 1,
            type: 1,
            _id: 0

        }
        const matchOption = {
            "sid": { $in: stu_list, $regex: regex },
            "date": { $gt: calendar.start, $lt: calendar.end }
        }

        stuConsumption
            .aggregate([
                { $project: projectOption },
                { $match: matchOption },
            ])
            .then((result) => {
                const r = {
                    dayCount: byDay(result, calendar),
                    count: dealRecordData(result, calendar),
                    stu_list: stu_list,
                    startDate:calendar.start,
                    endDate:calendar.end
                }

                util.responseClient(res, 200, 0, 'success', r)

            })
    })
        .catch((error) => {
            console.log(error)
        })

}


module.exports = studentGPADataProcess
