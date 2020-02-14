/*
 * @Author: your name
 * @Date: 2020-01-17 14:49:10
 * @LastEditTime : 2020-02-12 18:13:32
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /eduRedar/schema/features.js
 */
const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
	"sid" : String,
	"real" : Number,
	"predict" : Number,
	"flag" : Number
})