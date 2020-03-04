/*
 * @Author: your name
 * @Date: 2019-03-04 14:51:11
 * @LastEditTime: 2020-03-04 17:20:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /eduRedar/src/components/RedarGraph/RedarGraphComponent.js
 */
import React, { Component } from 'react'
import redarScatterGraph from './redarScatterGraph'
import redarGraph from './redarGraph'
import { Checkbox } from 'antd'
import { zumaColor } from '../../config/config'
import style from './style.css'

const CheckboxGroup = Checkbox.Group
class RedarGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            food: true,
            hotwater: true,
            library: true,
            shower: true
        }

    }

    // componentDidMount() {
    //     //请求数
    //     //渲染视图
    //     let elem = this.refs.redarScatterGraph
    //     let data = this.props.data

    //     redarScatterGraph.initGraph(elem,data)
    // }
    handleTypeChange = (e) => {
        this.setState({
            [e.target.innerText]: !this.state[e.target.innerText]
        })
    }
    componentDidMount() {
        let elem = this.refs.redarGraph
        let redarData = {
            "prediction": 0.784585,
            "sems1count_lib": 0.23994,
            "sems1ae1_food": 0.23123,
            "sems1count2_hw": 0.23994,
            "sems1ae_shower": 0.23123,
        }
        // redarGraph.initGraph(elem, redarData)

    }
    componentDidUpdate() {
        //因为RedarGraph的组件的Mount是在Person之前完成的，所以说获取数据的操作放在了DidUpdate里面
        let elem = this.refs.redarGraph
        let data = {}
        let redarData = {
            "prediction": 0.784585,
            "sems1count_lib": 0.23994,
            "sems1ae1_food": 0.23123,
            "sems1count2_hw": 0.23994,
            "sems1ae_shower": 0.23123,


        }
        // console.log(this.state)
        console.log(data)
        if(JSON.stringify(this.props.data)!=="{}"){
            data.keys = [];
            ["food","library","hotwater","shower"].forEach((key)=>{
                if(this.state[key]){
                    data[key] = this.props.data[key]
                    data.keys.push(key)
                }
            })
            data.sid = this.props.data.sid
            console.log(this.props.data)
            data.sems = this.props.data.sems
        }
        
        console.log("redar",data)

        redarData.prediction = this.props.feature ? this.props.feature[`${this.props.sems}pred_food`] : 0
        redarData.sems1count_lib = this.props.feature ? this.props.feature[`${this.props.sems}count_library`] : 0
        redarData.sems1ae1_food = this.props.feature ? this.props.feature[`${this.props.sems}ae_food`] : 0
        redarData.sems1count2_hw = this.props.feature ? this.props.feature[`${this.props.sems}count_hotwater`] : 0
        redarData.sems1ae_shower = this.props.feature ? this.props.feature[`${this.props.sems}ae_shower`] : 0
        redarScatterGraph.initGraph(elem, data, this.props.sems)
        redarGraph.initGraph(elem, redarData, this.props.sems)

    }

    render() {
        return (
            <div className="item-wrapper redar">
                <div className="legend-wrapper">
                    {/* <Checkbox.Group className="ratio-wrapper" onChange={this.handleTypeChange}> */}
                    <div onClick={this.handleTypeChange} value="food" style={{background: (this.state.food ? zumaColor.food : "rgba(33,33,33,0.5)"), color: ((this.state.food ? "#fff" : "rgba(238, 238, 238,0.4)")) }}>food</div>
                    <div onClick={this.handleTypeChange} value="shower" style={{background: (this.state.shower ? zumaColor.shower : "rgba(33,33,33,0.5)"), color: ((this.state.shower ? "#fff" : "rgba(238, 238, 238,0.4)"))}}>shower</div>
                    <div onClick={this.handleTypeChange} value="library" style={{ background: (this.state.library ? zumaColor.library : "rgba(33,33,33,0.5)"), color: ((this.state.library ? "#fff" : "rgba(238, 238, 238,0.4)"))}}>library</div>
                    <div onClick={this.handleTypeChange} value="hotwater" style={{ background: (this.state.hotwater ? zumaColor.hotwater : "rgba(33,33,33,0.5)"), color: ((this.state.hotwater ? "#fff" : "rgba(238, 238, 238,0.4)"))}}>hotwater</div>
                    {/* </Checkbox.Group> */}
                </div>
                <div ref="redarGraph">
                </div>
                <div style={{ color: "#fff", width: 100, textAlign: "center", fontSize: 9, fontWeight: 200 }}>{this.props.sems}</div>
            </div>
        )
    }

}
export default RedarGraph