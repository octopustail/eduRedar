let mongoose = require('mongoose')
let stuRecordSchema = require('../schema/stu_record')

//model映射到的是mongoDB中的对应的collection的复数形式
//MongoDB中的collection：stu_record,则model中映射就为stu_records

module.exports = mongoose.model('stu_records',stuRecordSchema);