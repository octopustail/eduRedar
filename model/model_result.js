/*
 * @Author: your name
 * @Date: 2020-01-17 14:45:46
 * @LastEditTime : 2020-02-12 18:13:43
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /eduRedar/model/feature.js
 */
const mongoose = require('mongoose')
const featuresSchema = require('../schema/features')


//model的name不会区分大小写。但是mongo要区分大小写。所以最好mongo的collection用小写，不然会查询不到数据

module.exports = mongoose.model('model_results',featuresSchema);