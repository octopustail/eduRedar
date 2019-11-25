/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-16 20:01:19
 * @LastEditTime: 2019-11-18 16:12:14
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react'
// import redarGraph from './redarGraph'
import * as d3 from 'd3'
import { schoolCalendar } from '../../config/config'
import moment from 'moment'
import style from './style.css'

class Heatmap extends Component {
    constructor(props) {
        super(props)
        this.heatmap = null;
        this.outer = [{ len: 4, color: "#8dd3c7", label: "Begin1", id: "Beginning1" },
        { len: 14, color: "#ffffb3", label: "MiddleS1", id: "MiddleStage1" },
        { len: 4, color: "#d9d9d9", label: "fTest1", id: "finalTest1" },
        { len: 2, color: "#bebada", label: "voca1", id: "vocation1" },

        { len: 2, color: "#bebada", label: "voca1", id: "vocation2" },
        { len: 4, color: "#d9d9d9", label: "fTest2", id: "finalTest2" },
        { len: 14, color: "#ffffb3", label: "MiddleS2", id: "MiddleStage2" },
        { len: 4, color: "#8dd3c7", label: "Begin2", id: "Beginning2" },
        ]
        this.layout = [
            { "id": "chr1", "label": "chr1", "color": "#996600", "len": 249250621 },
            { "id": "chr2", "label": "chr2", "color": "#666600", "len": 243199373 },
            { "id": "chr3", "label": "chr3", "color": "#99991E", "len": 198022430 },
        ]

    }

    //根据校历算每一学期的有多少天，有多少周
    seperateDate = (arr)=>{
        arr.map((item)=>{
            item.end.diff(item.start,"days")
        })
    }

    componentDidMount() {
        //请求数
        //渲染视图
        let elem = this.heatmap
        let data = {}
        data.outer = this.outer

        data.mouths = this.props.data
        // console.log('data',data.mouths)
        this.initGraph(elem, data)
    }

    componentDidUpdate() {
        //因为RedarGraph的组件的Mount是在Person之前完成的，所以说获取数据的操作放在了DidUpdate里面
        // let elem = this.heatmap
        // let data = this.props.data

        let elem = this.heatmap
        let data = {}
        data.outer = this.outer
        data.layout = this.layout
        data.mouths = this.props.data
        this.initGraph(elem, data)
    }

    initGraph = (elem, d) => {

        d3.select('.heatmap svg').remove()

        let data = d
        if (JSON.stringify(data.mouths) === '{}') { return }


        //数据处理部分
        //把学生们每一个学期每一周的真实熵做统计
        let weekoff = []
        const countByweek = []
        const countByWeekSems = {}
        const sems = ['semes1', 'semes2', 'semes3', 'semes4', 'semes5', 'semes6']
        for (let s = 0; s < sems.length; s++) {
            let sem = sems[s]
            for (let i = 0; i < 24; i++) {
                countByweek[i] = data.mouths.reduce((pre, item) => {
                    return parseInt(item[sem][i]) + pre
                }, 0)
            }
            //JS的数组是一个引用对象
            countByWeekSems[sem] = [...countByweek]

        }

        //        //热力图数据处理成对应的对象数组
        // let arr1 = ['sems1', 'sems3', 'sems5']
        // let arr2 = ['sems2', 'sems4', 'sems6']
        let arr1 = ['semes1', 'semes3', 'semes5']
        let arr2 = ['semes2', 'semes4', 'semes6']

        arr1.forEach((key) => {
            let week = countByWeekSems[key].map((item, idx) => {

                let index, id
                if (idx < 4) {
                    index = idx
                    id = 'Beginning1'
                } else if (idx >= 4 && idx < 18) {
                    index = idx - 4
                    id = 'MiddleStage1'
                } else if (idx >= 18 && idx < 22) {
                    index = idx - 18
                    id = 'finalTest1'
                } else {
                    index = idx - 22
                    id = 'vocation1'
                }

                return {
                    block_id: id,
                    start: index,
                    end: index + 1,
                    value: item
                }

            })
            weekoff.push(week)
        })
        arr2.forEach((key) => {
            let week = countByWeekSems[key].map((item, idx) => {
                let index, id
                if (idx < 4) {
                    index = idx
                    id = 'Beginning2'
                } else if (idx >= 4 && idx < 18) {
                    index = idx - 4
                    id = 'MiddleStage2'
                } else if (idx >= 18 && idx < 22) {
                    index = idx - 18
                    id = 'finalTest2'
                } else {
                    index = idx - 22
                    id = 'vocation2'
                }
                return {
                    block_id: id,
                    start: index,
                    end: index + 1,
                    value: parseInt(item),
                    index: idx,
                }

            })
            weekoff.push(week)
        })


        let HeatmapCircos = new Circos({
            container: elem,
            width: 500,
            height: 500
        })

        const HeatmapConfig = {
            innerRadius: 180,
            outerRadius: 200,
            cornerRadius: 5,
            gap: 0.04, // in radian
            labels: {
                display: true,
                position: 'center',
                size: '9px',
                color: '#000',
                radialOffset: 3,
            },
            ticks: {
                display: false,
                color: 'grey',
                spacing: 10000000,
                labels: true,
                labelSpacing: 10,
                labelSuffix: 'Mb',
                labelDenominator: 1000000,
                labelDisplay0: true,
                labelSize: '10px',
                labelColor: '#fff',
                labelFont: 'default',
                majorSpacing: 10,
                size: {
                    minor: 2,
                    major: 5,
                }
            },
            events: {}
        }

        HeatmapCircos.layout(data.outer, HeatmapConfig)
            .heatmap('heat-maptest1', weekoff[0], {
                innerRadius: 0.95,
                outerRadius: 0.85,
                logScale: false,
                color: 'YlOrRd',
                tooltipContent: function (d) {
                    return d
                }
            })
            .heatmap('heat-maptest2', weekoff[1], {
                innerRadius: 0.85,
                outerRadius: 0.75,
                logScale: false,
                color: 'YlOrRd'
            })
            .heatmap('heat-maptest5', weekoff[2], {
                innerRadius: 0.75,
                outerRadius: 0.65,
                logScale: false,
                color: 'YlOrRd'
            })
            .heatmap('heat-maptest6', weekoff[3], {
                innerRadius: 0.95,
                outerRadius: 0.85,
                logScale: false,
                color: 'YlOrRd'
            })
            .heatmap('heat-maptest3', weekoff[4], {
                innerRadius: 0.85,
                outerRadius: 0.75,
                logScale: false,
                color: 'YlOrRd'
            })
            .heatmap('heat-maptest4', weekoff[5], {
                innerRadius: 0.75,
                outerRadius: 0.65,
                logScale: false,
                color: 'YlOrRd'
            })
            .line('snp-in', [], {
                innerRadius: 0.25,
                outerRadius: 0.65,
                maxGap: 1000000,
                direction: 'in',
                min: 0,
                max: 0.015,
                color: '#fff',
                axes: [
                    { spacing: 2 }
                ],
                tooltipContent: null
            })
        HeatmapCircos.render()

        // let ScatterCircos = new Circos({
        //     container: elem,
        //     width: 250,
        //     height: 200
        // })
    }

    render() {
        return (
            <div className="heatMap" ref={(e) => { this.heatmap = e }}>
                {/* <div className="entropy"></div> */}
            </div>
        )
    }

}
export default Heatmap