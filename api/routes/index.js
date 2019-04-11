
module.exports = function(app){
  
  app.get('/',function(req,res){
    res.send('hello world')
  })
  app.get('/api',function(req,res,){
    res.send('hello sapi')
   })
  app.get('/studentRecord',require('./studentRecord'))


  // app.get('/studentGpa',function(req,res,){
  //   res.send('hello studentGpa')
  //  })
  
  //获得各个种类的学生的名单
  app.get('/studentCate',require('./stuCate'))
  //获取各个种类的学生的刷卡次数统计 river图
  app.get('/studentCounts',require('./stuCounts'))
  //获取各个种类的学生刷卡记录 scatter图
  app.get('/studentRecords',require('./stuRecords'))

  app.get('/studentGpa',require('./stuGpa'))




};

// var express = require('express')

// var router = express.Router()

// router.get('/studentRecord',require('./studentRecord'))

// module.exports = router