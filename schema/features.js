/*
 * @Author: your name
 * @Date: 2020-01-17 14:49:10
 * @LastEditTime : 2020-01-17 15:00:57
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /eduRedar/schema/features.js
 */
const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
	"10_hw" :Number,
	"10_lib" : Number,
	"11_hw" : Number,
	"11_lib" :Number,
	"12_hw" :Number,
	"12_lib" :Number,
	"1_hw" : Number,
	"1_lib" :Number,
	"1_score" : Number,
	"1_shwr" : Number,
	"2_hw" : Number,
	"2_lib" : Number,
	"2_score" : Number,
	"3_hw" : Number,
	"3_lib" : Number,
	"4_hw" : Number,
	"4_lib" :Number,
	"5_hw" : Number,
	"5_lib" :Number,
	"6_hw" : Number,
	"6_lib" :Number,
	"7_hw" : Number,
	"7_lib" :Number,
	"8_hw" : Number,
	"8_lib" :Number,
	"9_hw" : Number,
	"9_lib" :Number,
	"cal1_f" : Number,
	"cal1_m" : Number,
	"linear_f" :Number,
	"linear_m" :Number,
	"sid" : String
})