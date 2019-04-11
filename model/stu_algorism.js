/* 学生预测分类第二版
 * @Description: 
 * @Author: octo
 * @LastEditors: octo 
 * @Date: 2019-04-10 11:01:25
 * @LastEditTime: 2019-04-11 11:26:40 整合两个算法的model到同一个文件
 */
const mongoose = require('mongoose')
const algorismSchema = require('../schema/stu_algorism')

const algorismModels = {}

//model的name不会区分大小写。但是mongo要区分大小写。所以最好mongo的collection用小写，不然会查询不到数据
algorismModels.randomForests = mongoose.model('random_forests',algorismSchema.randomForests);
algorismModels.adanets = mongoose.model('adanets',algorismSchema.adanets)

module.exports = algorismModels