/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-03-17 15:34:31
 * @LastEditTime : 2020-02-24 16:14:16
 * @LastEditors  : Please set LastEditors
 */
import React, { Component } from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/parallel'
import 'echarts/lib/component/parallelAxis'

import ReactEcharts from 'echarts-for-react';


// 还可以引入节流函数
export default class ParallelGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: '100%',
            height: '100%',
            //mockData
        }
        this.echartsElement = null
    }

    componentDidMount() {
        // const echarts_instance = this.echarts_react.getEchartsInstance()
        // let that = this
        // echarts_instance.on('axisareaselected', function () {
        //     let series0 = echarts_instance.getModel().getSeries()[0];
        //     let indices0 = series0.getRawIndicesByActiveState('active');
        //     //取刷选出来的第一个数据
        //     let selectedDataIndex = indices0.shift()
        //     let { sid } = that.props.data.find((el, index) => index === selectedDataIndex)
        //     sid && that.props.handleParallelSelectedId(sid)
        // });
    }

    dataFormate = (data) => {
        if (data.length === 0) { return { dataGroup: [], axis: [], schema: [] } }
        let d = data,
            dataGroup = [],
            axis = [],
            schema = []


        dataGroup = d.map((item) => Object.keys(item).map(e => item[e]))
        Object.keys(data[0]).forEach((key, index) => {
            const obj_schema = {
                name: key,
                index: index,
                text: key
            }
            schema.push(obj_schema)

            const obj_axis = {
                dim: index,
                name: schema[index].text,
                max: (key === 'cal1_f' || key === 'cal1_m' || key === 'linear_f' || key === 'linear_m') ? 100 : 0,
                min: 0
            }
            if (key !== 'sid') { axis.push(obj_axis) }
        })
        return { dataGroup, axis, schema }
    }
    getOption = (ori_data) => {
        const lineStyle = {
            normal: {
                color: '#577ceb',
                width: 0.5,
                opacity: 0.6
            }
        };

        const { dataGroup, axis, schema } = this.dataFormate(ori_data)
        if (dataGroup.length === 0) {
            return {}
        }
        return {
            tooltip: {
                padding: 10,
                backgroundColor: '#222',
                borderColor: '#777',
                borderWidth: 1,

            },
            parallelAxis: axis,
            // visualMap: {
            //     show: false,
            //     min: 100,
            //     max: 30,
            //     dimension: 2,
            //     inRange: {
            //         color: ['#d94e5d', '#eac736', '#50a3ba'].reverse(),
            //         // colorAlpha: [0, 1]
            //     }
            // },
            parallel: {
                left: '3%',
                right: '3%',
                bottom: '2%',
                parallelAxisDefault: {
                    type: 'value',
                    name: 'gradeDistribution',
                    nameLocation: 'end',
                    nameGap: 20,
                    nameTextStyle: {
                        color: '#fff',
                        fontSize: 12
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#aaa'
                        }
                    },
                    axisTick: {
                        lineStyle: {
                            color: '#777'
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#fff'
                        }
                    }
                }
            },
            series: [
                {
                    name: 'stu_gpa',
                    type: 'parallel',
                    smooth: true,
                    lineStyle: lineStyle,
                    blendMode: 'lighter',
                    data: dataGroup
                }
            ]
        }
    }

    onAxisAreaSelected = () => {

    }

    render() {
        // const onEvents = {
        //     "axisareaselected": this.onAxisAreaSelected
        // }
        return (
            <div className="parallel">
                <ReactEcharts option={this.getOption(this.props.data)} style={{ height: 300, width: 900 }} ref={e => { this.echarts_react = e }} />
            </div>
        )
    }
}
