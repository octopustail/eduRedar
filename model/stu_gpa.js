let mongoose = require('mongoose')
let stuGpaSchema = require('../schema/stu_gpa')



module.exports = mongoose.model('stu_gpas',stuGpaSchema);