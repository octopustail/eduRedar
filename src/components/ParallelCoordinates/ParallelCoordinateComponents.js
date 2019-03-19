import React, { Component } from 'react'
import parallel from './ParallelCoordinates'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/parallel'
import 'echarts/lib/component/parallelAxis'

import style from './style.css'
import { runInThisContext } from 'vm';

// 还可以引入节流函数
export default class ParallelGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: '100%',
            height: '100%',
            //mockData
            data: [[1, 55, 9, 56, 0.46, 18, 6, "良"],
            [2, 25, 11, 21, 0.65, 34, 9, "优"],
            [3, 56, 7, 63, 0.3, 14, 5, "良"],
            [4, 33, 7, 29, 0.33, 16, 6, "优"],
            [5, 42, 24, 44, 0.76, 40, 16, "优"],
            [6, 82, 58, 90, 1.77, 68, 33, "良"],
            [7, 74, 49, 77, 1.46, 48, 27, "良"],
            [8, 78, 55, 80, 1.29, 59, 29, "良"],
            [9, 267, 216, 280, 4.8, 108, 64, "重度污染"],
            [10, 185, 127, 216, 2.52, 61, 27, "中度污染"],
            [11, 39, 19, 38, 0.57, 31, 15, "优"],
            [12, 41, 11, 40, 0.43, 21, 7, "优"],
            [13, 64, 38, 74, 1.04, 46, 22, "良"],
            [14, 108, 79, 120, 1.7, 75, 41, "轻度污染"],
            [15, 108, 63, 116, 1.48, 44, 26, "轻度污染"],
            [16, 33, 6, 29, 0.34, 13, 5, "优"],
            [17, 94, 66, 110, 1.54, 62, 31, "良"],
            [18, 186, 142, 192, 3.88, 93, 79, "中度污染"],
            [19, 57, 31, 54, 0.96, 32, 14, "良"],
            [20, 22, 8, 17, 0.48, 23, 10, "优"],
            [21, 39, 15, 36, 0.61, 29, 13, "优"],
            [22, 94, 69, 114, 2.08, 73, 39, "良"],
            [23, 99, 73, 110, 2.43, 76, 48, "良"],
            [24, 31, 12, 30, 0.5, 32, 16, "优"],
            [25, 42, 27, 43, 1, 53, 22, "优"],
            [26, 154, 117, 157, 3.05, 92, 58, "中度污染"],
            [27, 234, 185, 230, 4.09, 123, 69, "重度污染"],
            [28, 160, 120, 186, 2.77, 91, 50, "中度污染"],
            [29, 134, 96, 165, 2.76, 83, 41, "轻度污染"],
            [30, 52, 24, 60, 1.03, 50, 21, "良"],
            [31, 46, 5, 49, 0.28, 10, 6, "优"]]
        }
        this.echartsInstance = echarts
        this.echartsElement = null
        this.setOptions = this.setOptions.bind(this)
    }

    componentDidMount() {
        //请求数
        //渲染视图

        const echartObj = this.renderEchartsDom()
        const onEvents = this.props.onEvents || {}


        this.bindEvents(echartObj, onEvents)


        //    chart.on('brushSelected',this.brushSelectCallback(param))
        // this.setOptions(this.props.option)
    }
    componentDidUpdate() {
        this.renderEchartsDom()
    }
    // getEchartsInstance = () => this.echartsInstance.getInstanceByDom(this.echartsElement) || this.echartsInstance.init(this.echartsElement)
    getEchartsInstance = () => this.echartsInstance.init(this.echartsElement)

    renderEchartsDom = () => {
        //获取dom容器上的实例，没有的话就init一个
        const echartsObj = this.getEchartsInstance()
        const data = this.state.data
        const options = this.setOptions(data)
        echartsObj.setOption(options)

        return echartsObj
    }

    bindEvents = (instance, events) => {
        const _loopEvent = (eventName,func) => {
            if (typeof eventName === 'string' && typeof events[eventName] === 'function') {
                instance.off(eventName)
                instance.on(eventName, (param) => { // 触发回调 
                    console.log(eventName)
                    func(param,instance)
                })
            }

        }

        for (const eventName in events) {
            if (Object.prototype.hasOwnProperty.call(events, eventName)) { _loopEvent(eventName,events[eventName]) }
        }
    }




    // initChart = (el) => {
    //     const data = this.state.data

    //     let parallelChart = echarts.init(el)
    //     let options = this.setOptions(data)
    //     parallelChart.setOption(options)
    //     return parallelChart
    // }

    setOptions = (data) => {
        const schema = [
            { name: 'sems1', index: 0, text: 'sems1' },
            { name: 'sems2', index: 1, text: 'sems2' },
            { name: 'sems3', index: 2, text: 'sems3' },
            { name: 'sems4', index: 3, text: 'sems4' },
            { name: 'sems5', index: 4, text: 'sems5' },
            { name: 'sems6', index: 5, text: 'sems6' },

        ];

        const lineStyle = {
            normal: {
                width: 1,
                opacity: 0.8
            }
        };
        return {
            backgroundColor: '#333',
            tooltip: {
                padding: 10,
                backgroundColor: '#222',
                borderColor: '#777',
                borderWidth: 1,

            },
            parallelAxis: [
                { dim: 0, name: schema[0].text, inverse: true, max: 31, nameLocation: 'start' },
                { dim: 1, name: schema[1].text },
                { dim: 2, name: schema[2].text },
                { dim: 3, name: schema[3].text },
                { dim: 4, name: schema[4].text },
                { dim: 5, name: schema[5].text },
                // { dim: 6, name: schema[6].text },
                // {
                //     dim: 7, name: schema[7].text,
                //     type: 'category', data: ['优', '良', '轻度污染', '中度污染', '重度污染', '严重污染']
                // }
            ],
            visualMap: {
                show: false,
                min: 0,
                max: 150,
                dimension: 2,
                inRange: {
                    color: ['#d94e5d', '#eac736', '#50a3ba'].reverse(),
                    // colorAlpha: [0, 1]
                }
            },
            parallel: {
                left: '5%',
                right: '18%',
                bottom: 100,
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
                    name: '北京',
                    type: 'parallel',
                    lineStyle: lineStyle,
                    data: data
                }
            ]
        }
    }
    componentWillUnmount() {
        this.echartsInstance.dispose(this.chartsElement)
    }

    //这个click是绑定在parallel元素上面的，所以要找到一个将事件绑定到canvas上面的方法
    handleClick = (param)=>{
        console.log('handleClick')
    }

    render() {

        return (
            <div className="parallel" ref={el => (this.echartsElement = el)} onClick={this.handleClick}></div>
        )
    }
}
