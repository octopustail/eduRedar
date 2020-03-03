

/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-03-17 15:34:31
 * @LastEditTime: 2020-03-03 20:10:00
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import { zumaColor } from '../../config/config'
import moment from 'moment'


// 还可以引入节流函数
export default class RiverEchartsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: '100%',
            height: '100%',
            subject: 'cal1'
            //mockData
        }
        this.echartsElement = null
    }

    componentDidMount() {
    }

    dataFormate = (data, start) => {
        if (JSON.stringify(data) === "{}") {
            return []
        }
        const groupedData = []

        Object.keys(data).forEach((key) => {
            data[key].forEach((e, index) => {
                const date = moment(start).add(index, "day").format('YYYY-MM-DD')
                groupedData.push([date, e, key])
            })
        })

        return groupedData


    }
    getOption = (ori_data, start, end) => {
        const data = this.dataFormate(ori_data, start, end)
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        color: 'rgba(200,200,200,0.2)',
                        width: 1,
                        type: 'solid'
                    }
                },
                textStyle:{
                    color:"#fff"
                }
            },

            legend: {
                data: ["food", "library", "hotwater", "shower"],
                textStyle:{
                    color:"#ccc",
                    fontSize:14
                }
            },

            color:Object.keys(zumaColor).map(e=>{return zumaColor[e]}),

            singleAxis: {
                top: 10,
                bottom: 50,
                axisTick: {
                    lineStyle:{
                        color:"#ff0"
                    }
                },
                type: 'time',
                axisPointer: {
                    animation: true,
                    label: {
                        show: true,
                        textStyle:{
                            color:"#fff",
                            fontSize:14,
                            fontWeight:"bold"
                        },
                        backgroundColor:"#AAABD3"
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        color:'#fff',
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:"#fff"
                    }
                },
                axisLabel:{
                    fontSize:14
                }
            },
            series: [
                {
                    type: 'themeRiver',
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 20,
                            shadowColor: 'rgba(0, 0, 0, 0.8)'
                        }
                    },
                    label: {
                        show: false
                    },
                    itemStyle:{
                        color:zumaColor
                    },
                    data: data
                }
            ]
        };
    }

    onDbClickItem = (params) => {
        this.props.handleEvent(params.data.name, params.data.value[1])
    }

    render() {
        const onEvents = {
            "dblclick": this.onDbClickItem
        }
        return (
            <div className="item-wrapper-left parallel">
                <ReactEcharts
                    option={this.getOption(this.props.counts, this.props.startDate, this.props.endDate)}
                    style={{ height: 400, width: 1400 }}
                    ref={e => { this.echarts_react = e }}
                    onEvents={onEvents}

                />
            </div>
        )
    }
}
