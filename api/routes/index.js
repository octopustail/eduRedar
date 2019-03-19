
module.exports = function(app){
  
  app.get('/',function(req,res){
    res.send('hello world')
  })
  app.get('/api',function(req,res,){
    res.send('hello api')
   })
  app.get('/studentRecord',require('./studentRecord'))

  // app.get('/studentGpa',function(req,res,){
  //   res.send('hello studentGpa')
  //  })
  
  app.get('/studentGpa',require('./stuGpa'))

};

// var express = require('express')

// var router = express.Router()

// router.get('/studentRecord',require('./studentRecord'))

// module.exports = router