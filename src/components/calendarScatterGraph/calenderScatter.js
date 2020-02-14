/*
 * @Description: 用于数据实验的模版barChart
 * @Author: your name
 * @Date: 2019-03-17 15:34:31
 * @LastEditTime : 2020-02-14 17:53:52
 * @LastEditors  : Please set LastEditors
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
            end = '2010-2-28',
            data = []
        console.log(ori_data)
        if ((typeof (ori_data) !== "undefined")) {
            const { startTime, endTime, timeline, stuListLength } = this.props.data
            start = startTime
            end = endTime
            data = timeline[2]
        }

        const option = {

            backgroundColor: '#404a59',

            title: {
                top: 30,
                text: '2016年某人每天的步数',
                subtext: '数据纯属虚构',
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '30',
                left: '100',
                data: ['步数', 'Top 12'],
                textStyle: {
                    color: '#fff'
                }
            },
            visualMap:{
                    min: 0,
                    max: 100,
                    calculable: true,
                    orient: 'horizontal',
                    left: 'center',
                    inRange:{
                        symbolSize: [8, 20],
                        colorAlpha:[0,1]              
                    },
                    dimension:1
            
            },
            calendar: [{
                top: 100,
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
            series: [{
                name: '步数',
                type: 'scatter',
                coordinateSystem: 'calendar',
                data: data,
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
            },{
                name: 'Top 12',
                type: 'effectScatter',
                coordinateSystem: 'calendar',
                data: data.sort(function (a, b) {
                    return b[1] - a[1];
                }).slice(0, 12),
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                itemStyle: {
                    color: function (val) {
                        if (val["data"]) {
                            return zumaColor[val["data"][2]]

                        }
                    }
                },
                zlevel: 1
            },]

        }
        console.log("option", option)
        return option
    }




    componentDidMount() {
        this.echartsElement = this.echarts_react.getEchartsInstance()
    }
    // componentDidUpdate() {
    // const { startTime, endTime, timeline,stuListLength } = this.props.data
    // if(!(timeline instanceof Array)){
    //     return
    // }
    // console.log("startTime",startTime, "endTime",endTime,"stuListLength",stuListLength, "timeline",timeline, )
    // const new_option = this.state.option
    // for(let i=0;i<timeline.length;i++){
    //     new_option.options.push(
    //         {
    //             name: '刷卡统计',
    //             type: 'scatter',
    //             coordinateSystem: 'calendar',
    //             data: timeline[i],
    //             symbolSize: function (val) {
    //                 return val[1]
    //             },
    //             itemStyle: {
    //                 normal: {
    //                     color: '#ddb926'
    //                 }
    //             }
    //         })
    // }

    // this.echartsElement.setOption(new_option)

    // }

    render() {
        return (
            <div className="parallel">
                <ReactEcharts ref={(e) => { this.echarts_react = e; }} option={this.getOption(this.props.data)} style={{ height: 500, width: 1300 }} />
            </div>
        )
    }
}


