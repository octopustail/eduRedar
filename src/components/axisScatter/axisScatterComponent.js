import React,{Component} from 'react'
import axisScatter from './axisScatterGraph'
import $ from 'jquery'
import style from './style.css'

class AxisScatter extends Component{
    
    componentDidMount(){
        let el = this.refs.axisScatter
        this.getDatafromJsonFile(el)
        
    }
    /** 
     * 异步获取数据，之后应该修改为用action来完成这个操作
    */
    getDatafromJsonFile(el){
        $.getJSON('./record.json').done(function (data) {
            function processdata(data) {
                let nodeData = []
                Object.keys(data).forEach(function (key) {
                    Object.keys(data[key]).forEach(function (item) {
                        // console.log(data[key][item])
                        let itemArray = data[key][item]
                        for (var i = 0; i < itemArray.length; i++) {
                            itemArray[i][0].date = new Date(itemArray[i][0].sdate + ' ' + itemArray[i][0].stime)
                            nodeData.push(itemArray[i][0])
                        }

                    })
                })
                return nodeData
            }
            
            
            let dataObjArray = processdata(data)
            
            axisScatter.create(el, dataObjArray)
        })
    }

    render(){

        return (
            <div className="axisScatter" ref = "axisScatter"></div>
        )
    }
}

export default AxisScatter
