let util = require('./util')
 
function studentRecordDataProcess(req,res,next){
    let queryID = req.query.sid || null
    util.responseClient(res,200,0,`成功收到${queryID}`)
}

module.exports = studentRecordDataProcess