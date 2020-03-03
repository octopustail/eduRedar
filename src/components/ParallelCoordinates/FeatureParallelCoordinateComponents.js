/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-03-17 15:34:31
 * @LastEditTime: 2020-03-03 20:10:16
 * @LastEditors: Please set LastEditors
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
        this.echarts_instance = this.echarts_react.getEchartsInstance()
        // echarts_instance.on('axisareaselected', function () {
        //     let series0 = echarts_instance.getModel().getSeries()[0];
        //     let indices0 = series0.getRawIndicesByActiveState('active');
        //     //取刷选出来的第一个数据
        //     let selectedDataIndex = indices0.shift()
        //     let item = that.props.data.find((el, index) => index === selectedDataIndex)
        //     item.sid !== undefined && that.props.handleSelectedId(item.sid)
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
                color: '#6a60a9',
                width: 0.5,
                opacity: 0.8
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
                    nameRotate: 45,
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
        let series0 = this.echarts_instance.getModel().getSeries()[0];
        let indices0 = series0.getRawIndicesByActiveState('active');
        //取刷选出来的第一个数据
        if (indices0.length!==0) {
            let selectedDataIndex = indices0.shift()
            let item = this.props.data.find((el, index) => index === selectedDataIndex)
            item.sid !== undefined && this.props.handleSelectedId(item.sid)
        }

    }

    render() {
        const onEvents = {
            "axisareaselected": this.onAxisAreaSelected
        }
        return (
            <div className="item-wrapper-left parallel">
                <ReactEcharts
                    option={this.getOption(this.props.data)}
                    style={{ height: 350, width: 1500 }}
                    ref={e => { this.echarts_react = e }}
                    onEvents={onEvents}
                />
            </div>
        )
    }
}
