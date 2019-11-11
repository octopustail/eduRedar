/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-17 09:38:11
 * @LastEditTime: 2019-10-17 10:03:17
 * @LastEditors: Please set LastEditors
 */
const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    sid:String,
    cal1:{ midium: String,final: String },
    cal2:{ midium: String,final: String },
    linear:{ midium: String,final: String },
    pro:{ midium: String,final: String },
})

