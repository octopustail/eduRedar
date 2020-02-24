/*
 * @Author: your name
 * @Date: 2019-03-26 17:08:31
 * @LastEditTime : 2020-02-24 20:01:27
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * 
 * @FilePath: /eduRedar/schema/stu_type.js
 */
const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    sid:String,
    wtype:String,
    stu_school:String
})