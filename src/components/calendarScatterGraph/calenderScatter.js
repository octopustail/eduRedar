/*
 * @Description: 用于数据实验的模版barChart
 * @Author: your name
 * @Date: 2019-03-17 15:34:31
 * @LastEditTime: 2020-03-01 11:31:57
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/parallel'
import 'echarts/lib/component/parallelAxis'
import { zumaColor } from '../../config/config'
import ReactEcharts from 'echarts-for-react';


// 还可以引入节流函数
export default class CalenderScatterGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: '100%',
            height: '100%',
        }
        this.echartsElement = null
    }
    getOption = (ori_data) => {
        let start = '2009-08-31',
            end = '2010-2-28'
 
        const option = {

            backgroundColor: '#404a59',
            tooltip: {
                trigger: 'item'
            },
            calendar: [{
                top: 40,
                left: 'center',
                range: [start, end],
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#000',
                        width: 4,
                        type: 'solid'
                    }
                },
                yearLabel: {
                    formatter: '{start}  1st',
                    textStyle: {
                        color: '#fff'
                    }
                },

                itemStyle: {
                    normal: {
                        color: '#323c48',
                        borderWidth: 1,
                        borderColor: '#111'
                    }
                }
            }],

        }
        return option
    }




    componentDidMount() {
        this.echartsElement = this.echarts_react.getEchartsInstance()
    }
    componentDidUpdate() {
        let start = '2009-08-31',
            end = '2010-2-28',
            data = [],
            max = 1.5,
            min = 0,
            stuListLen=0
        if ((JSON.stringify(this.props.data)!=='{}')) {
            const { startTime, endTime, timeline, stuListLength,max_value,min_value} = this.props.data
            start = startTime
            end = endTime
            data = timeline
            max = max_value,
            min = min_value,
            stuListLen = stuListLength
            
        }

        const option = {
            baseOption: {
                backgroundColor: '#404a59',
                timeline: {
                    axisType: 'category',
                    autoPlay: true,
                    playInterval: 2000,
                    // width: 55,
                    // height: null,
                    label: {
                        color: '#999',
                        interval:0,
                        position:"bottom",
                        verticalAlign:"top"
                    },
                    symbol: 'emptyCircle',
                    symbolSize:3,
                    lineStyle: {
                        color: '#555'
                    },
                    checkpointStyle: {
                        color: '#bbb',
                        borderColor: '#777',
                        borderWidth: 2
                    },
                    controlStyle: {
                        showNextBtn: false,
                        showPrevBtn: false,
                        color: '#666',
                        borderColor: '#666'
                    },
                    emphasis: {
                        label: {
                            color: '#fff'
                        },
                        controlStyle: {
                            color: '#aaa',
                            borderColor: '#aaa'
                        }
                    },
                    data: []
                },
                tooltip: {
                    trigger: 'item',
                    formatter: (params)=>{
                        return `【日期】：${params.value[0]}
                        【类型】：${params.value[2]}
                        【刷卡次数】：${params.value[1]}`
                    }
                },
                visualMap: {
                    min: min,
                    max: max,
                    show:false,
                    calculable: true,
                    orient: 'vertical',
                    inRange: {
                        symbolSize: [5, 20],
                        colorAlpha: [0.4, 1]
                    },
                    range:[0.0000001,1.5],
                    outRange:{
                        opacity:0
                    },
                    dimension: 1

                },
                calendar: [{
                    top: 40,
                    left: 'center',
                    range: [start, end],
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#000',
                            width: 4,
                            type: 'solid'
                        }
                    },
                    yearLabel: {
                        formatter: '{start}  1st',
                        textStyle: {
                            color: '#fff'
                        }
                    },

                    itemStyle: {
                        normal: {
                            color: '#323c48',
                            borderWidth: 1,
                            borderColor: '#111'
                        }
                    }
                }],


            },
            options: []
        }
        for (let i = 0; i < data.length; i++) {
            option.baseOption.timeline.data.push(i)
            option.options.push({
                series: [{
                    name: `学生人数${stuListLen}`,
                    type: 'scatter',
                    coordinateSystem: 'calendar',
                    data: data[i],
                    // symbolSize: function (val) {
                    //     return val[1] / 10
                    // },
                    itemStyle: {
                        // color: "#ff0"
                        color: function (val) {
                            if (val["data"]) {
                                return zumaColor[val["data"][2]]

                            }
                        }
                    }
                },
                // {
                //     name: 'Top 12',
                //     type: 'effectScatter',
                //     coordinateSystem: 'calendar',
                //     data: data.sort(function (a, b) {
                //         return b[1] - a[1];
                //     }).slice(0, 12),
                //     showEffectOn: 'render',
                //     rippleEffect: {
                //         brushType: 'stroke'
                //     },
                //     hoverAnimation: true,
                //     itemStyle: {
                //         color: function (val) {
                //             if (val["data"]) {
                //                 console.log(val["data"])
                //                 return zumaColor[val["data"][2]]
                //             }
                //         }
                //     },
                //     zlevel: 1
                // },
            ]
            })
        }
        this.echartsElement.setOption(option)
    }

    render() {
        return (
            <div className="parallel" >
                <ReactEcharts ref={(e) => { this.echarts_react = e; }} option={this.getOption(this.props.data)} style={{ height: 300, width: 900 }} />
            </div>
        )
    }
}


