/*
 * @Author: your name
 * @Date: 2020-01-17 14:45:46
 * @LastEditTime : 2020-01-19 21:34:20
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /eduRedar/model/feature.js
 */
const mongoose = require('mongoose')
const personalFeatureSchema = require('../schema/personalFeatures')


//model的name不会区分大小写。但是mongo要区分大小写。所以最好mongo的collection用小写，不然会查询不到数据

module.exports = mongoose.model('personal_features',personalFeatureSchema);