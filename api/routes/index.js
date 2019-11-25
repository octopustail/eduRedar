/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-16 20:01:19
 * @LastEditTime: 2019-10-17 09:59:36
 * @LastEditors: Please set LastEditors
 */

module.exports = function(app){
  
  app.get('/',function(req,res){
    res.send('hello world')
  })
  // app.get('/api',function(req,res,){
  //   res.send('hello sapi')
  //  })

  //  app.get('/api2',function(req,res,){
  //   res.send('hello sapi')
  //  })

  app.get('/studentRecord',require('./studentRecord'))

  //获得各个种类的学生的名单
  app.get('/studentCate',require('./stuCate'))
  //获取各个种类的学生的刷卡次数统计 river图
  app.get('/studentCounts',require('./stuCounts'))

  //某一类型的刷卡数据统计
  app.get('/studentRecordsAnalyze',require('./studentRecordAnalyze'))

  //获取各个种类的学生刷卡记录 scatter图
  app.get('/studentRecords',require('./stuRecords'))

  app.get('/studentGpa',require('./stuGpa'))

  app.get('/studentList',require('./stuList'))
  app.get('/studentMath',require('./studentMath'))
  app.get('/studentWeekRecord',require('./stuWeekRecord'))
  app.get('/studentAE',require('./stuAE'))




};

// var express = require('express')

// var router = express.Router()

// router.get('/studentRecord',require('./studentRecord'))

// module.exports = router