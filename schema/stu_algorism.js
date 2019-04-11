const mongoose = require('mongoose')
const SchemaObj = {
    type:String,
    list:Array,
}
const algorismSchema = {}
algorismSchema.randomForests= new mongoose.Schema(SchemaObj)
algorismSchema.adanets = new mongoose.Schema(SchemaObj)

module.exports = algorismSchema

