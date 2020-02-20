/*
 * @Author: your name
 * @Date: 2020-02-12 11:05:22
 * @LastEditTime : 2020-02-20 18:18:21
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /eduRedar/model/stu_consumption.js
 */
let mongoose = require('mongoose')
let stuRecordSchema = require('../schema/stu_record')

//model映射到的是mongoDB中的对应的collection的复数形式
//MongoDB中的collection：stu_record,则model中映射就为stu_records

module.exports = mongoose.model('stu_consumpotion_0910s', stuRecordSchema);

