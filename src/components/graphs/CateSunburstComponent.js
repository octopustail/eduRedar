

/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-03-17 15:34:31
 * @LastEditTime: 2020-03-05 09:57:00
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import { stu_list_math } from '../../config/stu_list_and_math'


// 还可以引入节流函数
export default class SunBurst extends Component {
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

    dataFormate = (stu, subject) => {
        if (stu.length === 0) {
            return []
        }
        // let result = [[], [], [], []]
        let result = {
            "0": [],
            "1": [],
            "2": [],
            "3": []
        }

        stu.forEach(elem => {
            const { flag, cate_math } = elem
            if (cate_math.length !== 0) {
                const item = cate_math[0]
                const math_grade = parseFloat(item[subject]['final'])
                result[flag].push({
                    name: item.sid,
                    value: [1, math_grade]
                })
            }

        })

        let dataGroup = [
            {
                name: "TP",
                value: result[3].length,
                itemStyle: {
                    color: 'red'
                },
                children: [{
                    name: '2009',
                    value: 209,
                }, {
                    name: '2010',
                    value: 107,
                }
                ]
            }, {
                name: "FN",
                value: result[1].length,
                itemStyle: {
                    color: 'green'
                },
                children: [{
                    name: '2009',
                    value: 34,
                }, {
                    name: '2010',
                    value: 63,
                }
                ]
            }, {
                name: "TN",
                value: result[0].length,
                itemStyle: {
                    color: 'yellow'
                },
                children: [{
                    name: '2009',
                    value: 608,
                }, {
                    name: '2010',
                    value: 771,
                }
                ]
            }, {
                name: "FP",
                value: result[2].length,
                itemStyle: {
                    color: 'blue'
                },
                children: [{
                    name: '2009',
                    value: 51,
                }, {
                    name: '2010',
                    value: 38,
                }
                ]
            },
        ]
        // if (JSON.stringify(data) === '{}' || !data) { return dataGroup }

        // Object.keys(data).forEach(key => {
        //     dataGroup.push(parseFloat(data[key].midium))
        //     dataGroup.push(parseFloat(data[key].final))
        // })
        return dataGroup


    }
    getOption = (student) => {
        // const data = this.dataFormate(student, this.state.subject)
        return {
            // visualMap: {
            //     type: 'continuous',
            //     min: 0,
            //     max: 1000,
            //     inRange: {
            //         color: ['#2D5F73', '#538EA6', '#F2D1B3', '#F2B8A2', '#F28C8C']
            //     },
            // },
            series: {
                type: 'sunburst',
                downplay: {
                    itemStyle: {
                        opacity: 0.5
                    }
                },
                nodeClick: "none",
                data: [
                    {
                        name: "TP",
                        value: 403,
                        itemStyle: {
                            color: '#2D5F73'
                        },
                        children: [{
                            name: '2009',
                            value: [206,3],
                            itemStyle: {
                                color: '#2D5F73'
                            },
                            
                        }, {
                            name: '2010',
                            value: [197,3],
                            itemStyle: {
                                color: '#2D5F73'
                            },
                        }
                        ]
                    }, {
                        name: "FP",
                        value: 97,
                        itemStyle: {
                            color: '#538EA6'
                        },
                        children: [{
                            name: '2009',
                            value: [34,2],
                            itemStyle: {
                                color: '#538EA6'
                            },
                        }, {
                            name: '2010',
                            value: [63,2],
                            itemStyle: {
                                color: '#538EA6'
                            },
                        }
                        ]
                    }, {
                        name: "TN",
                        value: 1379,
                        itemStyle: {
                            color: '#F2B8A2'
                        },
                        children: [{
                            name: '2009',
                            value: [608,0],
                            itemStyle: {
                                color: '#F2B8A2'
                            },
                        }, {
                            name: '2010',
                            value: [771,0],
                            itemStyle: {
                                color: '#F2B8A2'
                            },
                        }
                        ]
                    }, {
                        name: "FN",
                        value: 89,
                        itemStyle: {
                            color: '#F28C8C'
                        },
                        children: [{
                            name: '2009',
                            value: [51,1],
                            itemStyle: {
                                color: '#F28C8C'
                            },
                        }, {
                            name: '2010',
                            value: [38,1],
                            itemStyle: {
                                color: '#F28C8C'
                            },
                        }
                        ]
                    },
                ],
                radius: [0, '90%'],
                label: {
                    rotate: 'radial'
                }
            }
        };
    }

    onDbClickItem = (params) => {
        this.props.handleEvent(params.data.name,params.data.value[1])
    }

    render() {
        const onEvents = {
            "dblclick": this.onDbClickItem
        }
        return (
            <div className="item-wrapper parallel">
                <ReactEcharts
                    option={this.getOption(stu_list_math)}
                    style={{ height: 400, width: 500 }}
                    ref={e => { this.echarts_react = e }}
                    onEvents={onEvents}

                />
            </div>
        )
    }
}
