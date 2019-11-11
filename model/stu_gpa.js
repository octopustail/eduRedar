/*
 * @Description: 成绩数据Model
 * @Author: zyw
 * @Date: 2019-03-19 17:49:02
 * @LastEditTime: 2019-10-10 20:30:12
 * @LastEditors: Please set LastEditors
 */
let mongoose = require('mongoose')
let stuGpaSchema = require('../schema/stu_gpa')


//一帆版本的成绩数据
// module.exports = mongoose.model('stu_gpas',stuGpaSchema);

//成绩数据更换为我重新算的版本
// module.exports = mongoose.model('students_wa_totals',stuGpaSchema);
//每学期成绩的加权平均分
module.exports = mongoose.model('student_total_wa_eachs',stuGpaSchema);