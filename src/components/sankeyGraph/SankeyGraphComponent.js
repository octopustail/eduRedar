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
    calNodeLinks(data, type) {
        filterFuncObj = {
            good: (item) => {
                let ave = (parseFloat(item['sems1']) + parseFloat(item['sems2']) + parseFloat(item['sems3'])).toFixed(2) / 3
                return (ave > 85)
            },
            normal: (item) => {
                let ave = (parseFloat(item['sems1']) + parseFloat(item['sems2']) + parseFloat(item['sems3'])).toFixed(2) / 3
                return (ave < 85 && ave >= 60)
            },
            potential: (item) => {
                let ave = (parseFloat(item['sems1']) + parseFloat(item['sems2']) + parseFloat(item['sems3'])).toFixed(2) / 3
                return (ave < 60)
            }
        }
        
    }
    dataFormatForSankey = (result) => {
        console.log(result)
        let nodes = [],
            links = [],
            data,
            stype

        if (result.length !== 0) {
            data = result.result
            stype = result.stype

            //中优差的逻辑判断有点问题

            // this.calNodeLinks(data, stype)

            const slist = data.filter((item) => {
                let ave = (parseFloat(item['sems1']) + parseFloat(item['sems2']) + parseFloat(item['sems3'])).toFixed(2) / 3
                return (ave > 85)
            })
            nodes = nodes.concat([{ name: 'start', value: [] }, { name: 'good1', value: [] }, { name: 'good2', value: [] }, { name: 'good3', value: [] }])
            links = links.concat([{ source: 'start', target: 'good1', value: 0 }, { source: 'good1', target: 'good2', value: 0 }, { source: 'good2', target: 'good3', value: 0 }])

            // console.log('slist', slist)
            slist.forEach((item) => {
                console.log(item)
                nodes[0].value.push(item.sid)

                const s4 = (parseFloat(item['sems4']).toFixed(2) >= 85)
                const s5 = (parseFloat(item['sems5']).toFixed(2) >= 85)
                const s6 = (parseFloat(item['sems6']).toFixed(2) >= 85)
                console.log(s4, s5, s6)
                if (s4 && s5 && s6) {
                    links[0].value++; links[1].value++; links[2].value++
                    nodes[1].value.push(item.sid); nodes[2].value.push(item.sid); nodes[3].value.push(item.sid)
                    return
                }
                if (s4 && s5 && !s6) {
                    console.log(item.sid)
                    links[0].value++; links[1].value++;
                    nodes[1].value.push(item.sid); nodes[2].value.push(item.sid);
                    nodes.push({ name: `${item.sid}_sems6`, value: item.sid })
                    links.push({ source: `good2`, target: `${item.sid}_sems6`, value: 1 })

                    return
                }
                if (s4 && !s5 && s6) {
                    links[0].value++;
                    nodes.push({ name: `${item.sid}_sems5`, value: item.sid })
                    links.push({ source: 'good1', target: `${item.sid}_sems5`, value: 1 })
                    links.push({ source: `${item.sid}_sems5`, target: 'good3', value: 1 })
                    return
                }
                if (s4 && !s5 && !s6) {
                    links[0].value++;
                    nodes[1].value.push(item.sid);
                    nodes.push({ name: `${item.sid}_sems5`, value: item.sid })
                    nodes.push({ name: `${item.sid}_sems6`, value: item.sid })
                    links.push({ source: 'good1', target: `${item.sid}_sems5`, value: 1 })
                    links.push({ source: `${item.sid}_sems5`, target: `${item.sid}_sems6`, value: 1 })

                    return
                }
                if (!s4 && s5 && s6) {
                    nodes.push({ name: `${item.sid}_sems4`, value: item.sid })
                    links.push({ source: 'start', target: `${item.sid}_sems4`, value: 1 })
                    links.push({ source: `${item.sid}_sems4`, target: 'good2', value: 1 })
                    links[2].value++
                    return
                }
                if (!s4 && s5 && !s6) {
                    links.push({ source: 'start', target: `${item.sid}+${sems4}`, value: 1 })
                    links.push({ source: `${item.sid}+${sems4}`, targe: 'good2', value: 1 })
                    links.push({ source: 'good2', target: `${item.sid}_sems6`, value: 1})
                    nodes.push({ name: `${item.sid}_sems4`, value: item.sid })
                    nodes.push({ name: `${item.sid}_sems6`, value: item.sid })
                    return
                }
                if (!s4 && !s5 && s6) {
                    links.push({ source: 'start', target: `${item.sid}_sems4`, value: 1 })
                    links.push({ source: `${item.sid}_sems4`, target: `${item.sid}_sems5`, value: 1 })
                    links.push({ source: `${item.sid}_sems5`, targe: 'good3', value: 1 })
                    nodes.push({ name: `${item.sid}_sems4`, value: item.sid })
                    nodes.push({ name: `${item.sid}_sems5`, value: item.sid })
                    nodes[3].value.push(item.sid)
                    return
                }
                if (!s4 && !s5 && !s6) {
                    links.push({ source: 'start', target: `${item.sid}_sems4`, value: 1 })
                    links.push({ source: `${item.sid}_sems4`, target: `${item.sid}_sems5`, value: 1 })
                    links.push({ source: `${item.sid}_sems5`, target: `${item.sid}_sems6`, value: 1 })
                    nodes.push({ name: `${item.sid}_sems4`, value: item.sid })
                    nodes.push({ name: `${item.sid}_sems5`, value: item.sid })
                    nodes.push({ name: `${item.sid}_sems6`, value: item.sid })

                    return
                }
            })
        }
        // console.log('nodes', nodes, 'links', links)
        return { nodes, links }

    }

    getOption = (data) => {
        console.log(data)
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
                data: data.nodes,
                links: data.links,
                color: [
                    '#30588C',
                    '#77C3F2',
                    '#FAA805'
                ],
                
            }
        }
    }

    onChartClick = (param, echart) => {
        console.log(param, echart)
    }


    render() {
        let onEvents = {
            'click': this.onChartClick
        }
        return (
            <div className="sankey-graph">
                <ReactEcharts option={this.getOption(this.dataFormatForSankey(this.props.data))} style={{ height: 500, width: 500 }} onEvents={onEvents} />
            </div>
        )
    }
}
export default SankeyGraph