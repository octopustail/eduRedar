/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-17 09:34:53
 * @LastEditTime: 2019-10-17 09:34:53
 * @LastEditors: your name
 */

let mongoose = require('mongoose')
let stuMath = require('../schema/stu_math')



module.exports = mongoose.model('student_math_grades',stuMath);