let util = require('./util')
let stuGPA  = require('../../model/stu_gpa')

function studentGPADataProcess(req,res,next){
    let queryID = req.query.stype || null
    //后台保存一个学生分类的students对象，里面包含各个种类的学生的学号列表
    // let queryID = req.query.stype || null

    let responseData = {gpa:[],flow:[],records:{}}
    // StuRecord.findOne({sid:`${queryID}`})
    stuGPA.find({sid:{$regex:/^201006/}})
    .then(result =>{
        responseData.gpa = result;
        console.log('result',result)
        util.responseClient(res,200,0,'success',responseData)
    })
}


module.exports = studentGPADataProcess