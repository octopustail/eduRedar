let util = require('./util')
// let stuGPA = require('../../model/stu_gpa')
// let stuLib10s = require('../../model/stu_lib_10')
// let stuAE = require('../../model/stu_ae')
let stuType = require('../../model/stu_type')
function studentGroupDataProcess(req, res, next) {
    let stype = req.query.stype || 'real_lowStu'
    //后台保存一个学生分类的students对象，里面包含各个种类的学生的学号列表
    // let queryID = req.query.stype || null

    // let responseData = { gpa: [], ae: [], records: [] }
    stuType.find({stype:stype}).then((result) => {
        util.responseClient(res, 200, 0, 'success', result)
        // next(result)
    })

}


module.exports = studentGroupDataProcess