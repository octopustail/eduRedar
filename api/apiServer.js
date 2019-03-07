var express = require('express')
var bodyParser = require('body-parser')
var cookie = require('cookie')
var mongoose = require('mongoose')
var routers = require('./routes/index')
var bluebird = require('bluebird')

const app = new express()

routers(app)


// app.get('/api',require('./routes/index'))
// app.get('/', function (req, res) {
//     res.send('hello world')
// })

var dbPort = '27017'
var dbHost = 'localhost'
var port = 3033

mongoose.Promise = require('bluebird')
mongoose.connect(`mongodb://${dbHost}:${dbPort}/eduRedar`, function (err) {
    if (err) {
        console.log(err, '数据库连接失败');
        return;
    }
    console.log("数据库连接成功")
    app.listen(port, function (err) {
        if (err) {
            console.error('err:', err);
        } else {
            console.info(`===> api server is running at 127.0.0.1:${port}`)
        }
    });
})