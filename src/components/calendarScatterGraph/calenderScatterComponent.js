
/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-03-16 16:41:07
 * @LastEditTime: 2020-03-04 15:54:29
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react'
import CalenderScatterGraph from './calenderScatter'
import style from './style.css'
import { Radio } from 'antd'
import { zumaColor } from '../../config/config'

class CalenderScatterComponent extends Component {
    constructor(props) {
        super(props)
        //    this.sems = ['sems1', 'sems2', 'sems3', 'sems4', 'sems5', 'sems6']
        this.sems = ['sems1', 'sems2']
        this.state = {
            type: "general"
        }
    }

    handleTypeChange = (e) => {
        this.setState({
            type: e.target.value
        })
    }

    formatData = () => {
        if (this.props.records.length === 0) {
            return {}
        }
        const { type } = this.state

        const { records, stuList } = this.props
        const result = {}
        const stuListLength = stuList.length
        result.timeline = []
        let max_value = 0
        let min_value = 9999
        if (type === "general") {
            result.timeline = records.map(hour => {
                return hour.map(elem => {
                    //返回几类数据中最大的一项
                    let types = ["food", "shower", "library", "hotwater"]
                    let arr = [elem["food"], elem["shower"], elem["library"], elem["hotwater"]]
                    let max = Math.max.apply(null, arr)
                    let idx = arr.indexOf(max)
                    //按人次算
                    let value = max / stuListLength
                    max_value = value > max_value ? value : max_value
                    min_value = value < min_value ? value : min_value
                    return [elem["date"], value, types[idx]]
                })
            })

        } else {
            result.timeline = records.map(hour => {
                return hour.map(elem => {
                    //返回选中的类型的数据
                    let value = elem[type] / stuListLength
                    max_value = value > max_value ? value : max_value
                    min_value = value < min_value ? value : min_value
                    return [elem["date"], value, type]
                })
            })
        }


        result.startTime = records[0][0]["date"]
        result.endTime = records[0][records[0].length - 1]["date"]
        result.stuListLength = stuList.length
        result.max_value = max_value
        result.min_value = min_value
        return result
    }
    render() {
        const data = this.formatData()
        return (
            //画出六个学期的图
            <div className="item-wrapper-row">
                <div>
                    <Radio.Group className="ratio-wrapper" onChange={this.handleTypeChange} value={this.state.type}>
                        <Radio value="general"><span style={{ display: "inline-block", textAlign: "center", width: "100px", background: "#aaabd3", borderRadius: "3px", padding: "3px 10px" }}>general</span></Radio>
                        <Radio value="food"><span style={{ display: "inline-block", textAlign: "center", width: "100px", background: zumaColor.food, borderRadius: "3px", padding: "3px 10px" }}>food</span></Radio>
                        <Radio value="shower"><span style={{ display: "inline-block", textAlign: "center", width: "100px", background: zumaColor.shower, borderRadius: "3px", padding: "3px 10px" }}>shower</span></Radio>
                        <Radio value="library"><span style={{ display: "inline-block", textAlign: "center", width: "100px", background: zumaColor.library, borderRadius: "3px", padding: "3px 10px" }}>library</span></Radio>
                        <Radio value="hotwater"><span style={{ display: "inline-block", textAlign: "center", width: "100px", background: zumaColor.hotwater, borderRadius: "3px", padding: "3px 10px" }}>hotwater</span></Radio>
                    </Radio.Group>
                </div>
                <CalenderScatterGraph data={data} />
            </div>
        )
    }

}


export default CalenderScatterComponent