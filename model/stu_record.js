let mongoose = require('mongoose')
let stuRecordSchema = require('../schema/stu_record')

module.exports = mongoose.model('stu_records',stuRecordSchema);