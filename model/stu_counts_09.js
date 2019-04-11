let mongoose = require('mongoose')
let countSchema = require('../schema/stu_counts_09')


const models = {}
models.library = mongoose.model('stu_lbrry_09s',countSchema.library);
models.food = mongoose.model('stu_fd_09s',countSchema.food);
models.shower = mongoose.model('stu_shwr_09s',countSchema.shower);
models.hotwater = mongoose.model('stu_hw_09s',countSchema.hotwater)

module.exports = models