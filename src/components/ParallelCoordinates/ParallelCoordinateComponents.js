/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-03-17 15:34:31
 * @LastEditTime : 2020-02-19 17:02:01
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

    dataFormate=(data)=>{
        if(!data) {return []}
        const groupData = data.map(elem=>{
            return [
                elem['sems1'],
                elem['sems2'],
                elem['sems3'],
                elem['sems4'],
                elem['sems5'],
                elem['sems6'],
                elem['sid']
            ]
        })
        return groupData
        

    }
    getOption = (ori_data) => {
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

        const data = this.dataFormate(ori_data)
        return {
            tooltip: {
                padding: 10,
                backgroundColor: '#222',
                borderColor: '#777',
                borderWidth: 1,

            },
            parallelAxis: [
                { dim: 0, name: schema[0].text,max:100,min:0},
                { dim: 1, name: schema[1].text,max:100,min:0},
                { dim: 2, name: schema[2].text,max:100,min:0},
                { dim: 3, name: schema[3].text,max:100,min:0},
                { dim: 4, name: schema[4].text,max:100,min:0},
                { dim: 5, name: schema[5].text,max:100,min:0},
                // { dim: 6, name: schema[6].text },
                // {
                //     dim: 7, name: schema[7].text,
                //     type: 'category', data: ['优', '良', '轻度污染', '中度污染', '重度污染', '严重污染']
                // }
            ],
            visualMap: {
                show: false,
                min: 100,
                max: 30,
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
                    name: 'stu_gpa',
                    type: 'parallel',
                    lineStyle: lineStyle,
                    data: data
                }
            ]
        }
    }

    render() {

        return (
            <div className="parallel">
                <ReactEcharts option = {this.getOption(this.props.data)} style = {{height:400,width:500}} />
            </div>
        )
    }
}
