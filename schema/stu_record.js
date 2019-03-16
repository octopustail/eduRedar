const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    sid:String,
    food:Array,
    shower:Array,
    library:Array,
    hotWater:Array,
    sems:Number,

})