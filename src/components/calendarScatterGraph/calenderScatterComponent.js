
/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-03-16 16:41:07
 * @LastEditTime : 2020-02-14 16:15:34
 * @LastEditors  : Please set LastEditors
 */
import React, { Component } from 'react'
import CalenderScatterGraph from './calenderScatter'
import { zumaColor } from '../../config/config'
// import style from './style.css'
import { connect } from 'react-redux'

class CalenderScatterComponent extends Component {
    constructor(props) {
        super(props)
        //    this.sems = ['sems1', 'sems2', 'sems3', 'sems4', 'sems5', 'sems6']
        this.sems = ['sems1', 'sems2']
        this.state = {
            type: "mix"
        }
    }

    handleTypeChange = () => {
        this.setState({
            type: "food"
        })
    }

    formatData = () => {
        if (this.props.records.length === 0) {
            return
        }
        const { type } = this.state

        console.log("type",type)
        const { records,stuList } = this.props
        const result = {}
        result.timeline = []
        if (type === "mix") {
            result.timeline = records.map(hour => {
                return hour.map(elem => {
                    //返回几类数据中最大的一项
                    let types = ["food", "shower", "library", "hotwater"]
                    let arr = [elem["food"], elem["shower"], elem["library"], elem["hotwater"]]
                    let max = Math.max.apply(null, arr)
                    let idx = arr.indexOf(max)

                    return [elem["date"], max, types[idx]]
                })
            })

        } else {
            result.timeline = records.map(hour => {
                return hour.map(elem => {
                    //返回选中的类型的数据
                    return [elem["date"], elem[type], type]
                })
            })
        }
        result.startTime = records[0][0]["date"]
        result.endTime = records[0][records[0].length - 1]["date"]
        result.stuListLength = stuList.length
        return result
    }
    render() {
        const data = this.formatData()
        return (
            //画出六个学期的图
            <div className="person">
                <div style={{ width: 100, background: "#fff", color: "#000" }} onClick={this.handleTypeChange}>改变数据类型</div>
                <CalenderScatterGraph data={data} />
            </div>
        )
    }

}


export default CalenderScatterComponent