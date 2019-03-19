import React, { Component } from 'react'
// import sankeyGraph from './sankeyGraph'
import * as echarts from 'echarts'
import style from './style.css'
import ReactEcharts from 'echarts-for-react'

// 还可以引入节流函数
class SankeyGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: '100%',
            height: '100%'
        }
        this.chart = null
    }
    getOption = (data) => {
        const colorGroup = { a1: "#ff0", b1: '#00f', c1: '#0f0' }

        return {
        tooltip: {
            trigger: 'item',
            formatter: "{b} :{c}"

        },
        series: {
            type: 'sankey',
            layout: 'none',
            focusNodeAdjacency: 'allEdges',
            data: [{
                name: 'a1',
            }, {
                name: 'b1'
            }, {
                name: 'c1'
            }, {
                name: 'a2',
            }, {
                name: 'b2'
            }, {
                name: 'c2'
            }],
            links: [
                {
                    source: 'a1',
                    target: 'a2',
                    value: 80,
                    lineStyle: { color: colorGroup.a1 }
                },
                {
                    source: 'a1',
                    target: 'b2',
                    value: 20,
                    lineStyle: { color: colorGroup.a1 }
                }, {
                    source: 'a1',
                    target: 'c2',
                    value: 5,
                    lineStyle: { color: colorGroup.a1 }
                }, {
                    source: 'b1',
                    target: 'a2',
                    value: 10,
                    lineStyle: { color: colorGroup.b1 }
                }, {
                    source: 'b1',
                    target: 'b2',
                    value: 99,
                    lineStyle: { color: colorGroup.b1 }

                }, {
                    source: 'b1',
                    target: 'c2',
                    value: 6,
                    lineStyle: { color: colorGroup.b1 }

                }, {
                    source: 'c1',
                    target: 'a2',
                    value: 5,
                    lineStyle: { color: colorGroup.c1 }

                }, {
                    source: 'c1',
                    target: 'b2',
                    value: 10,
                    lineStyle: { color: colorGroup.c1 }
                }, {
                    source: 'c1',
                    target: 'c2',
                    value: 23,
                    lineStyle: { color: colorGroup.c1 }
                }]
        }
    }}

    onChartClick = (param, echart) => {
        console.log(param,echart)
    }


    render() {
        let onEvents = {
            'click': this.onChartClick
        }
        return (
            <div className="sankey-graph">
                <ReactEcharts option={this.getOption()} style={{ height: 500,width:500}} onEvents={onEvents} />
            </div>
        )
    }
}
export default SankeyGraph