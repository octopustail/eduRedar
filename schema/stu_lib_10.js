const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    sid:String,
    sems1:Array,
    sems2:Array,
    sems3:Array,
    sems4:Array,
    sems5:Array,
    sems6:Array
})