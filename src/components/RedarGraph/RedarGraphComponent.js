/*
 * @Author: your name
 * @Date: 2019-03-04 14:51:11
 * @LastEditTime : 2020-01-19 16:03:57
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /eduRedar/src/components/RedarGraph/RedarGraphComponent.js
 */
import React, { Component } from 'react'
import redarScatterGraph from './redarScatterGraph'
import redarGraph from './redarGraph'
import style from './style.css'

class RedarGraph extends Component {
    constructor(props) {
        super(props)

    }

    // componentDidMount() {
    //     //请求数
    //     //渲染视图
    //     let elem = this.refs.redarScatterGraph
    //     let data = this.props.data

    //     redarScatterGraph.initGraph(elem,data)
    // }

    render() {
        return (
            <div className="redar">
                <div ref="redarGraph">
                </div>
                <div style={{ color: "#fff", width: 100, textAlign: "center", fontSize: 9, fontWeight: 200 }}>{this.props.sems}</div>
            </div>
        )
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
        console.log(redarData)
        // redarGraph.initGraph(elem, redarData)

    }
    componentDidUpdate() {
        //因为RedarGraph的组件的Mount是在Person之前完成的，所以说获取数据的操作放在了DidUpdate里面
        let elem = this.refs.redarGraph
        let data = this.props.data
        let redarData = {
            "prediction": 0.784585,
            "sems1count_lib": 0.23994,
            "sems1ae1_food": 0.23123,
            "sems1count2_hw": 0.23994,
            "sems1ae_shower": 0.23123,


        }

        redarScatterGraph.initGraph(elem, data)
        console.log("cdu")
        redarGraph.initGraph(elem, redarData)

    }
}
export default RedarGraph