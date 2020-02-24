

/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-03-17 15:34:31
 * @LastEditTime : 2020-02-24 19:39:58
 * @LastEditors  : Please set LastEditors
 */
import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';


// 还可以引入节流函数
export default class MathLineChart extends Component {
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
    }

    dataFormate = (data) => {
        let dataGroup = []
        if (JSON.stringify(data) === '{}') { return dataGroup }

        Object.keys(data).forEach(key => {
            dataGroup.push(parseFloat(data[key].midium))
            dataGroup.push(parseFloat(data[key].final))
        })

        return dataGroup


    }
    getOption = (ori_data) => {
        const data = this.dataFormate(ori_data)
        const averageScore = {
            "g_29":[67.70,80.39,65.02,81.37,70.64,75.66,62.75,70.66],
            "g_2010":[64.60,77.98,73.43,83.30,66.38,72.34,58.74,72.99]
        }
        return {
            tooltip: {
                padding: 10,
                backgroundColor: '#222',
                borderColor: '#777',
                borderWidth: 1,
                trigger: 'axis',
                axisPointer: {
                    type:"cross",
                    lineStyle: {
                        type:'dashed',
                        color: 'rgba(255,255,255,0.8)',
                    },
                },
            },
            xAxis: [{
                type: 'category',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.4)',
                        width: 2
                    }
                },
                axisLabel: {
                    color: '#fff'
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                },
                boundaryGap: false,
                data: ['Cal1_m', 'Cal1_f', 'LA_1', 'LA_2', 'Cal2_m', 'Cal2_f', 'PT_m', 'PT_f'],

            }],
            yAxis: [{
                type: 'value',
                min: 0,
                max: 100,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.4)',
                        width: 2
                    }
                },
                axisLabel: {
                    show: true,
                    margin: 20,
                    textStyle: {
                        color: '#d1e6eb',

                    },
                },
                axisTick: {
                    show: false,
                },
            }],
            series: [
                {
                    name: 'Math Grade',
                    type: 'line',
                    // smooth: true, //是否平滑
                    showAllSymbol: true,
                    // symbol: 'image://./static/images/guang-circle.png',
                    symbol: 'circle',
                    symbolSize: 10,
                    lineStyle: {
                        normal: {
                            color: "#FFAD4F",
                        },
                    },
                    label: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: '#eee',
                        }
                    },
                    itemStyle: {
                        color: "#FFAD4F",
                        borderColor: "#fff",
                        borderWidth: 1,
                    },
                    tooltip: {
                        show: false
                    },
                    data: data
                },
                {
                    name: '2009 Average Grade',
                    type: 'line',
                    // smooth: true, //是否平滑
                    showAllSymbol: true,
                    // symbol: 'image://./static/images/guang-circle.png',
                    symbol: 'circle',
                    symbolSize: 10,
                    lineStyle: {
                        normal: {
                            color: "#4FB362",
                        },
                        opacity:0.1
                    },
                    label: {
                        show: false,
                        position: 'top',
                        textStyle: {
                            color: '#eee',
                        }
                    },
                    itemStyle: {
                        color: "#4FB362",
                        opacity:0.3
                    },
                    tooltip: {
                        show: false
                    },
                    data: averageScore.g_29
                },
                {
                    name: '2010 Average Grade',
                    type: 'line',
                    // smooth: true, //是否平滑
                    showAllSymbol: true,
                    // symbol: 'image://./static/images/guang-circle.png',
                    symbol: 'circle',
                    symbolSize: 10,
                    lineStyle: {
                        normal: {
                            color: "#AE7EFF",
                            opacity:0.3
                        },
                    },
                    label: {
                        show: false,
                        position: 'top',
                        textStyle: {
                            color: '#eee',
                        }
                    },
                    itemStyle: {
                        color: "#AE7EFF",
                        opacity:0.3
                    },
                    tooltip: {
                        show: true
                    },
                    data: averageScore.g_2010
                },
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
                <ReactEcharts option={this.getOption(this.props.data)} style={{ height: 400, width: 500 }} ref={e => { this.echarts_react = e }} />
            </div>
        )
    }
}
