/*
 * @Author: your name
 * @Date: 2020-02-12 11:08:39
 * @LastEditTime: 2020-02-12 11:10:28
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /eduRedar/schema/stu_consumption.js
 */
const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
	"sid" : String,
	"date" : Date,
	"time" : String,
	"type" : String,
	"place" : String,
	"cost" : String,
	"balance" : String
})