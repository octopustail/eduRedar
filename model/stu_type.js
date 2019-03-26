let mongoose = require('mongoose')
let stuTypeSchema = require('../schema/stu_gpa')



module.exports = mongoose.model('stu_type_09s',stuTypeSchema);