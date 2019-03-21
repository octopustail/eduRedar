import React, { Component } from 'react'
// import redarGraph from './redarGraph'
import * as d3 from 'd3'
import { map } from 'zrender/lib/core/util';

class Heatmap extends Component {
    constructor(props) {
        super(props)
        this.heatmap = null;
        this.state = {
            data: {
                // outer: [{ len: 31, color: "#8dd3c7", label: "January", id: "january" },
                // { len: 28, color: "#ffffb3", label: "February", id: "february" },
                // { len: 31, color: "#bebada", label: "March", id: "march" },
                // { len: 30, color: "#fb8072", label: "April", id: "april" },
                // { len: 31, color: "#80b1d3", label: "May", id: "may" },
                // { len: 30, color: "#fdb462", label: "June", id: "june" },
                // { len: 31, color: "#b3de69", label: "July", id: "july" },
                // { len: 31, color: "#fccde5", label: "August", id: "august" },
                // { len: 30, color: "#d9d9d9", label: "September", id: "september" },
                // { len: 31, color: "#bc80bd", label: "October", id: "october" },
                // { len: 30, color: "#ccebc5", label: "November", id: "november" },
                // { len: 31, color: "#ffed6f", label: "December", id: "december" }],
                outer: [{ len: 4, color: "#8dd3c7", label: "Begin1", id: "Beginning1" },
                { len: 14, color: "#ffffb3", label: "MiddleS1", id: "MiddleStage1" },
                { len: 4, color: "#d9d9d9", label: "fTest1", id: "finalTest1" },
                { len: 2, color: "#bebada", label: "voca1", id: "vocation1" },

                { len: 2, color: "#bebada", label: "voca1", id: "vocation2" },
                { len: 4, color: "#d9d9d9", label: "fTest2", id: "finalTest2" },
                { len: 14, color: "#ffffb3", label: "MiddleS2", id: "MiddleStage2" },
                { len: 4, color: "#8dd3c7", label: "Begin2", id: "Beginning2" },


                ],
                inner: [{
                    block_id: 'january',
                    start: 0,
                    end: 1,
                    value: 13
                },
                {
                    block_id: 'february',
                    start: 1,
                    end: 2,
                    value: 14
                },
                ],
                test: [['january', 0, 1, 2],
                ['january', 1, 2, 0],
                ['january', 2, 3, 0],
                ['january', 3, 4, 1],
                ['january', 4, 5, 1],
                ['january', 5, 6, 0],
                ['january', 6, 7, 0],
                ['january', 7, 8, 0],
                ['january', 8, 9, 0],
                ['january', 9, 10, 0],
                ['january', 10, 11, 1],
                ['january', 11, 12, 1],
                ['january', 12, 13, 0],
                ['january', 13, 14, 0],
                ['january', 14, 15, 0],
                ['january', 15, 16, 0],
                ['january', 16, 17, 0],
                ['january', 17, 18, 1],
                ['january', 18, 19, 1],
                ['january', 19, 20, 0],
                ['january', 20, 21, 0],
                ['january', 21, 22, 0],
                ['january', 22, 23, 0],
                ['january', 23, 24, 0],
                ['january', 24, 25, 1],
                ['january', 25, 26, 1],
                ['january', 26, 27, 0],
                ['january', 27, 28, 0],
                ['january', 28, 29, 0],
                ['january', 29, 30, 0],
                ['january', 30, 31, 0],
                ['february', 0, 1, 1],
                ['february', 1, 2, 1],
                ['february', 2, 3, 0],
                ['february', 3, 4, 0],
                ['february', 4, 5, 0],
                ['february', 5, 6, 0],
                ['february', 6, 7, 0],
                ['february', 7, 8, 1],
                ['february', 8, 9, 1],
                ['february', 9, 10, 0],
                ['february', 10, 11, 0],
                ['february', 11, 12, 0],
                ['february', 12, 13, 0],
                ['february', 13, 14, 0],
                ['february', 14, 15, 1],
                ['february', 15, 16, 1],
                ['february', 16, 17, 0],
                ['february', 17, 18, 0],
                ['february', 18, 19, 0],
                ['february', 19, 20, 0],
                ['february', 20, 21, 0],
                ['february', 21, 22, 1],
                ['february', 22, 23, 1],
                ['february', 23, 24, 0],
                ['february', 24, 25, 0],
                ['february', 25, 26, 0],
                ['february', 26, 27, 0],
                ['february', 27, 28, 0],
                ['march', 0, 1, 1],
                ['march', 1, 2, 1],
                ['march', 2, 3, 0],
                ['march', 3, 4, 0],
                ['march', 4, 5, 0],
                ['march', 5, 6, 0],
                ['march', 6, 7, 0],
                ['march', 7, 8, 1],
                ['march', 8, 9, 1],
                ['march', 9, 10, 0],
                ['march', 10, 11, 0],
                ['march', 11, 12, 0],
                ['march', 12, 13, 0],
                ['march', 13, 14, 0],
                ['march', 14, 15, 1],
                ['march', 15, 16, 1],
                ['march', 16, 17, 0],
                ['march', 17, 18, 0],
                ['march', 18, 19, 0],
                ['march', 19, 20, 0],
                ['march', 20, 21, 0],
                ['march', 21, 22, 1],
                ['march', 22, 23, 1],
                ['march', 23, 24, 0],
                ['march', 24, 25, 0],
                ['march', 25, 26, 0],
                ['march', 26, 27, 0],
                ['march', 27, 28, 0],
                ['march', 28, 29, 1],
                ['march', 29, 30, 1],
                ['march', 30, 31, 0],
                ['april', 0, 1, 0],
                ['april', 1, 2, 0],
                ['april', 2, 3, 0],
                ['april', 3, 4, 0],
                ['april', 4, 5, 1],
                ['april', 5, 6, 1],
                ['april', 6, 7, 0],
                ['april', 7, 8, 0],
                ['april', 8, 9, 0],
                ['april', 9, 10, 0],
                ['april', 10, 11, 0],
                ['april', 11, 12, 1],
                ['april', 12, 13, 1],
                ['april', 13, 14, 0],
                ['april', 14, 15, 0],
                ['april', 15, 16, 0],
                ['april', 16, 17, 0],
                ['april', 17, 18, 0],
                ['april', 18, 19, 1],
                ['april', 19, 20, 1],
                ['april', 20, 21, 2],
                ['april', 21, 22, 0],
                ['april', 22, 23, 0],
                ['april', 23, 24, 0],
                ['april', 24, 25, 0],
                ['april', 25, 26, 1],
                ['april', 26, 27, 1],
                ['april', 27, 28, 0],
                ['april', 28, 29, 0],
                ['april', 29, 30, 0],
                ['may', 0, 1, 2],
                ['may', 1, 2, 0],
                ['may', 2, 3, 1],
                ['may', 3, 4, 1],
                ['may', 4, 5, 0],
                ['may', 5, 6, 0],
                ['may', 6, 7, 0],
                ['may', 7, 8, 2],
                ['may', 8, 9, 0],
                ['may', 9, 10, 1],
                ['may', 10, 11, 1],
                ['may', 11, 12, 0],
                ['may', 12, 13, 0],
                ['may', 13, 14, 0],
                ['may', 14, 15, 0],
                ['may', 15, 16, 0],
                ['may', 16, 17, 1],
                ['may', 17, 18, 1],
                ['may', 18, 19, 0],
                ['may', 19, 20, 0],
                ['may', 20, 21, 0],
                ['may', 21, 22, 0],
                ['may', 22, 23, 0],
                ['may', 23, 24, 1],
                ['may', 24, 25, 1],
                ['may', 25, 26, 0],
                ['may', 26, 27, 0],
                ['may', 27, 28, 0],
                ['may', 28, 29, 2],
                ['may', 29, 30, 0],
                ['may', 30, 31, 1],
                ['june', 0, 1, 1],
                ['june', 1, 2, 0],
                ['june', 2, 3, 0],
                ['june', 3, 4, 0],
                ['june', 4, 5, 0],
                ['june', 5, 6, 0],
                ['june', 6, 7, 1],
                ['june', 7, 8, 1],
                ['june', 8, 9, 2],
                ['june', 9, 10, 0],
                ['june', 10, 11, 0],
                ['june', 11, 12, 0],
                ['june', 12, 13, 0],
                ['june', 13, 14, 1],
                ['june', 14, 15, 1],
                ['june', 15, 16, 0],
                ['june', 16, 17, 0],
                ['june', 17, 18, 0],
                ['june', 18, 19, 0],
                ['june', 19, 20, 0],
                ['june', 20, 21, 1],
                ['june', 21, 22, 1],
                ['june', 22, 23, 0],
                ['june', 23, 24, 0],
                ['june', 24, 25, 0],
                ['june', 25, 26, 0],
                ['june', 26, 27, 0],
                ['june', 27, 28, 1],
                ['june', 28, 29, 1],
                ['june', 29, 30, 0],
                ['july', 0, 1, 0],
                ['july', 1, 2, 0],
                ['july', 2, 3, 0],
                ['july', 3, 4, 0],
                ['july', 4, 5, 1],
                ['july', 5, 6, 1],
                ['july', 6, 7, 0],
                ['july', 7, 8, 0],
                ['july', 8, 9, 0],
                ['july', 9, 10, 0],
                ['july', 10, 11, 0],
                ['july', 11, 12, 1],
                ['july', 12, 13, 1],
                ['july', 13, 14, 2],
                ['july', 14, 15, 0],
                ['july', 15, 16, 0],
                ['july', 16, 17, 0],
                ['july', 17, 18, 0],
                ['july', 18, 19, 1],
                ['july', 19, 20, 1],
                ['july', 20, 21, 0],
                ['july', 21, 22, 0],
                ['july', 22, 23, 0],
                ['july', 23, 24, 0],
                ['july', 24, 25, 0],
                ['july', 25, 26, 1],
                ['july', 26, 27, 1],
                ['july', 27, 28, 0],
                ['july', 28, 29, 0],
                ['july', 29, 30, 0],
                ['july', 30, 31, 0],
                ['august', 0, 1, 0],
                ['august', 1, 2, 1],
                ['august', 2, 3, 1],
                ['august', 3, 4, 0],
                ['august', 4, 5, 0],
                ['august', 5, 6, 0],
                ['august', 6, 7, 0],
                ['august', 7, 8, 0],
                ['august', 8, 9, 1],
                ['august', 9, 10, 1],
                ['august', 10, 11, 0],
                ['august', 11, 12, 0],
                ['august', 12, 13, 0],
                ['august', 13, 14, 0],
                ['august', 14, 15, 2],
                ['august', 15, 16, 1],
                ['august', 16, 17, 1],
                ['august', 17, 18, 0],
                ['august', 18, 19, 0],
                ['august', 19, 20, 0],
                ['august', 20, 21, 0],
                ['august', 21, 22, 0],
                ['august', 22, 23, 1],
                ['august', 23, 24, 1],
                ['august', 24, 25, 0],
                ['august', 25, 26, 0],
                ['august', 26, 27, 0],
                ['august', 27, 28, 0],
                ['august', 28, 29, 0],
                ['august', 29, 30, 1],
                ['august', 30, 31, 1],
                ['september', 0, 1, 0],
                ['september', 1, 2, 0],
                ['september', 2, 3, 0],
                ['september', 3, 4, 0],
                ['september', 4, 5, 0],
                ['september', 5, 6, 1],
                ['september', 6, 7, 1],
                ['september', 7, 8, 0],
                ['september', 8, 9, 0],
                ['september', 9, 10, 0],
                ['september', 10, 11, 0],
                ['september', 11, 12, 0],
                ['september', 12, 13, 1],
                ['september', 13, 14, 1],
                ['september', 14, 15, 0],
                ['september', 15, 16, 0],
                ['september', 16, 17, 0],
                ['september', 17, 18, 0],
                ['september', 18, 19, 0],
                ['september', 19, 20, 1],
                ['september', 20, 21, 1],
                ['september', 21, 22, 0],
                ['september', 22, 23, 0],
                ['september', 23, 24, 0],
                ['september', 24, 25, 0],
                ['september', 25, 26, 0],
                ['september', 26, 27, 1],
                ['september', 27, 28, 1],
                ['september', 28, 29, 0],
                ['september', 29, 30, 0],
                ['october', 0, 1, 0],
                ['october', 1, 2, 0],
                ['october', 2, 3, 0],
                ['october', 3, 4, 1],
                ['october', 4, 5, 1],
                ['october', 5, 6, 0],
                ['october', 6, 7, 0],
                ['october', 7, 8, 0],
                ['october', 8, 9, 0],
                ['october', 9, 10, 0],
                ['october', 10, 11, 1],
                ['october', 11, 12, 1],
                ['october', 12, 13, 0],
                ['october', 13, 14, 0],
                ['october', 14, 15, 0],
                ['october', 15, 16, 0],
                ['october', 16, 17, 0],
                ['october', 17, 18, 1],
                ['october', 18, 19, 1],
                ['october', 19, 20, 0],
                ['october', 20, 21, 0],
                ['october', 21, 22, 0],
                ['october', 22, 23, 0],
                ['october', 23, 24, 0],
                ['october', 24, 25, 1],
                ['october', 25, 26, 1],
                ['october', 26, 27, 0],
                ['october', 27, 28, 0],
                ['october', 28, 29, 0],
                ['october', 29, 30, 0],
                ['october', 30, 31, 0],
                ['november', 0, 1, 1],
                ['november', 1, 2, 1],
                ['november', 2, 3, 0],
                ['november', 3, 4, 0],
                ['november', 4, 5, 0],
                ['november', 5, 6, 0],
                ['november', 6, 7, 0],
                ['november', 7, 8, 1],
                ['november', 8, 9, 1],
                ['november', 9, 10, 0],
                ['november', 10, 11, 2],
                ['november', 11, 12, 0],
                ['november', 12, 13, 0],
                ['november', 13, 14, 0],
                ['november', 14, 15, 1],
                ['november', 15, 16, 1],
                ['november', 16, 17, 0],
                ['november', 17, 18, 0],
                ['november', 18, 19, 0],
                ['november', 19, 20, 0],
                ['november', 20, 21, 0],
                ['november', 21, 22, 1],
                ['november', 22, 23, 1],
                ['november', 23, 24, 0],
                ['november', 24, 25, 0],
                ['november', 25, 26, 0],
                ['november', 26, 27, 0],
                ['november', 27, 28, 0],
                ['november', 28, 29, 1],
                ['november', 29, 30, 1],
                ['december', 0, 1, 0],
                ['december', 1, 2, 0],
                ['december', 2, 3, 0],
                ['december', 3, 4, 0],
                ['december', 4, 5, 0],
                ['december', 5, 6, 1],
                ['december', 6, 7, 1],
                ['december', 7, 8, 0],
                ['december', 8, 9, 0],
                ['december', 9, 10, 0],
                ['december', 10, 11, 0],
                ['december', 11, 12, 0],
                ['december', 12, 13, 1],
                ['december', 13, 14, 1],
                ['december', 14, 15, 0],
                ['december', 15, 16, 0],
                ['december', 16, 17, 0],
                ['december', 17, 18, 0],
                ['december', 18, 19, 0],
                ['december', 19, 20, 1],
                ['december', 20, 21, 1],
                ['december', 21, 22, 0],
                ['december', 22, 23, 0],
                ['december', 23, 24, 0],
                ['december', 24, 25, 2],
                ['december', 25, 26, 0],
                ['december', 26, 27, 1],
                ['december', 27, 28, 1],
                ['december', 28, 29, 0],
                ['december', 29, 30, 0],
                ['december', 30, 31, 0]]
            },


        }
    }

    componentDidMount() {
        //请求数
        //渲染视图
        let elem = this.heatmap
        let data = {}
        data.outer = this.state.data.outer

        data.mouths = this.props.data
        this.initGraph(elem, data)
    }

    initGraph = (elem, d) => {

        let data = d
        if (JSON.stringify(data.mouths) === '{}') { return }
        let myCircos = new Circos({
            container: elem,
            width: 500,
            height: 500
        })
        let weekoff = []
        // console.log(data)
        const countByweek = []
        const countByWeekSems = {}
        const sems = ['sems1', 'sems2', 'sems3', 'sems4', 'sems5', 'sems6']
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

        let arr1 = ['sems1', 'sems3', 'sems5']
        let arr2 = ['sems2', 'sems4', 'sems6']

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
console.log('weekoff',weekoff)
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
                } else{
                    index = idx - 22
                    id = 'vocation2'
                }
                return {
                    block_id: id,
                    start: index,
                    end: index + 1,
                    value: parseInt(item),
                    index:idx,
                }

            })
            weekoff.push(week)
        })


        // let dayoff = d.mouths.map((d) => {
        //     return {
        //         block_id: d[0],
        //         start: parseInt(d[1]),
        //         end: parseInt(d[2]),
        //         value: parseInt(d[3]),

        //     }
        // })

        //处理数据

        const configuration = {
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

        myCircos.layout(data.outer, configuration)
            .heatmap('heat-maptest1', weekoff[0], {
                innerRadius: 0.95,
                outerRadius: 0.85,
                logScale: false,
                color: 'YlOrRd',
                tooltipContent:function(d){
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
        myCircos.render()
    }

    render() {
        return (
            <div className="heatMap" ref={(e) => { this.heatmap = e }}>
            </div>
        )
    }
    componentDidUpdate() {
        //因为RedarGraph的组件的Mount是在Person之前完成的，所以说获取数据的操作放在了DidUpdate里面
        // let elem = this.heatmap
        // let data = this.props.data

        let elem = this.heatmap
        let data = {}
        data.outer = this.state.data.outer

        data.mouths = this.props.data
        this.initGraph(elem, data)
    }
}
export default Heatmap