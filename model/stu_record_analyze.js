/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-25 20:24:25
 * @LastEditTime: 2019-09-25 20:24:25
 * @LastEditors: your name
 */
let mongoose = require('mongoose')
let stuRecordAnalyzeSchema = require('../schema/stu_record_analyze')

//model映射到的是mongoDB中的对应的collection的复数形式
//MongoDB中的collection：stu_record,则model中映射就为stu_records

module.exports = mongoose.model('stu_records_analyzes',stuRecordAnalyzeSchema);