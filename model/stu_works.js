/*
 * @Author: your name
 * @Date: 2019-03-26 17:08:46
 * @LastEditTime : 2020-02-24 20:01:54
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /eduRedar/model/stu_works.js
 */
let mongoose = require('mongoose')
let stuTypeSchema = require('../schema/stu_works')



module.exports = mongoose.model('work_09s',stuTypeSchema);