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
        let nodes = [],
            links = [],
            data,
            stype,
            t

        if (result.length !== 0) {
            data = result
            console.log(data)
            // t = result.stype
            // try{
            // if(result.type === "good"){t = 0}
            // if(result.type === "normal"){t=1}
            // if(result.type === "normal"){t=2}
            // }catch(err){
            //     return "type不在定义中"
            // }

            t = 0


            //中优差的逻辑判断有点问题

            // this.calNodeLinks(data, stype)

            // const slist = data.filter((item) => {
            //     let ave = (parseFloat(item['sems1']) + parseFloat(item['sems2']) + parseFloat(item['sems3'])).toFixed(2) / 3
            //     return (ave > 85)
            // })


            console.log('data',data)
            nodes = nodes.concat([{ name: `s${t}0`, value: [] }, { name: `s${t}1`, value: [] }, { name: `s${t}2`, value: [] }, { name: `s${t}3`, value: [] },{name:"test1",value:"test1"},{name:"test2",value:"test2"}])
            links = links.concat({ source: `s${t}0`, target: `s${t}1`, value: 0 }, { source: `s${t}1`, target: `s${t}2`, value: 0 }, { source: `s${t}2`, target: `s${t}3`, value: 0 })
            // console.log('slist', slist)
            data.forEach((item) => {
                let sid = item.sid
                let level = []


                function calCategory(num) {
                    let n = parseFloat(num).toFixed(2)
                    if (n >= 85) {
                        return 0;
                    } else if (n < 60) {
                        return 2;
                    } else {
                        return 1
                    }
                }


                //0: good 1:normal 2: potential
                let arr = ['sems4', 'sems5', 'sems6']
                arr.forEach((key) => {
                    level.push(calCategory(item[key]))
                })

                // console.log(item,level)

                const calCategory2 = (num) => {
                    let n = ParseFloat(num).toFixed(2)
                    if (n >= 85) { return 0; }
                    else if (n < 60) { return 2; } else {
                        return 1
                    }

                }
                // console.log(sid, level)
                level.reduce((prel, curl, index) => {
                    //第一个判断语句没有进去过
                    if (index === 0) {
                        if (curl === t) {
                            nodes[index + 1].value.push(sid); links[index].value++;
                        } else {
                            nodes.push({ name: `${sid}_${curl}_${index + 1}`, value: sid })
                            links.push({ source: `s00`, target: `${sid}_${curl}_${index + 1}`, value: 1 })
                        }
                        return curl
                    }
                    if (curl === t && prel === t) { nodes[index + 1].value.push(sid); links[index].value++; return curl }
                    if (curl !== t && prel !== t) { nodes.push({ name: `${sid}_${curl}_${index + 1}`, value: sid }); links.push({ source: `${sid}_${prel}_${index}`, target: `${sid}_${curl}_${index + 1}`, value: 1 }); return curl }
                    if (curl === t && prel !== t) { nodes[index + 1].value.push(sid); links.push({ source: `${sid}_${prel}_${index}`, target: `s${t}`+`${index + 1}`, value: 1 }); return curl }
                    if (curl !== t && prel === t) { console.log(sid); nodes.push({ name: `${sid}_${curl}_${index + 1}`, value: sid }); 
                    // links.push({ source: `s${t}` + `${index}`, target: `${sid}_${curl}_${index + 1} `, value: 1 });
                    // links.push({ source: `s${t}`+`${index + 1}`, target: `${sid}_${curl}_${index + 1} `, value: 1 });
                    links.push({ target: `${sid}_${curl}_${index + 1}`, source: `s${t}`+`${index}`, value: 1 });

                     return curl }



                }, t)

                //reduce 返回计算出来的List


                // console.log(item)
                // nodes[0].value.push(item.sid)

                // const s4 = (parseFloat(item['sems4']).toFixed(2) >= 85)
                // const s5 = (parseFloat(item['sems5']).toFixed(2) >= 85)
                // const s6 = (parseFloat(item['sems6']).toFixed(2) >= 85)
                // // console.log(s4, s5, s6)
                // if (s4 && s5 && s6) {
                //     links[0].value++; links[1].value++; links[2].value++
                //     nodes[1].value.push(item.sid); nodes[2].value.push(item.sid); nodes[3].value.push(item.sid)
                //     return
                // }
                // if (s4 && s5 && !s6) {
                //     console.log(item.sid)
                //     links[0].value++; links[1].value++;
                //     nodes[1].value.push(item.sid); nodes[2].value.push(item.sid);
                //     nodes.push({ name: `${ item.sid } _sems6`, value: item.sid })
                //     links.push({ source: `good2`, target: `${ item.sid } _sems6`, value: 1 })

                //     return
                // }
                // if (s4 && !s5 && s6) {
                //     links[0].value++;
                //     nodes.push({ name: `${ item.sid } _sems5`, value: item.sid })
                //     links.push({ source: 'good1', target: `${ item.sid } _sems5`, value: 1 })
                //     links.push({ source: `${ item.sid } _sems5`, target: 'good3', value: 1 })
                //     return
                // }
                // if (s4 && !s5 && !s6) {
                //     links[0].value++;
                //     nodes[1].value.push(item.sid);
                //     nodes.push({ name: `${ item.sid } _sems5`, value: item.sid })
                //     nodes.push({ name: `${ item.sid } _sems6`, value: item.sid })
                //     links.push({ source: 'good1', target: `${ item.sid } _sems5`, value: 1 })
                //     links.push({ source: `${ item.sid } _sems5`, target: `${ item.sid } _sems6`, value: 1 })

                //     return
                // }
                // if (!s4 && s5 && s6) {
                //     nodes.push({ name: `${ item.sid } _sems4`, value: item.sid })
                //     links.push({ source: 'start', target: `${ item.sid } _sems4`, value: 1 })
                //     links.push({ source: `${ item.sid } _sems4`, target: 'good2', value: 1 })
                //     links[2].value++
                //     return
                // }
                // if (!s4 && s5 && !s6) {
                //     links.push({ source: 'start', target: `${ item.sid } +${ sems4 } `, value: 1 })
                //     links.push({ source: `${ item.sid } +${ sems4 } `, targe: 'good2', value: 1 })
                //     links.push({ source: 'good2', target: `${ item.sid } _sems6`, value: 1 })
                //     nodes.push({ name: `${ item.sid } _sems4`, value: item.sid })
                //     nodes.push({ name: `${ item.sid } _sems6`, value: item.sid })
                //     return
                // }
                // if (!s4 && !s5 && s6) {
                //     links.push({ source: 'start', target: `${ item.sid } _sems4`, value: 1 })
                //     links.push({ source: `${ item.sid } _sems4`, target: `${ item.sid } _sems5`, value: 1 })
                //     links.push({ source: `${ item.sid } _sems5`, targe: 'good3', value: 1 })
                //     nodes.push({ name: `${ item.sid } _sems4`, value: item.sid })
                //     nodes.push({ name: `${ item.sid } _sems5`, value: item.sid })
                //     nodes[3].value.push(item.sid)
                //     return
                // }
                // if (!s4 && !s5 && !s6) {
                //     links.push({ source: 'start', target: `${ item.sid } _sems4`, value: 1 })
                //     links.push({ source: `${ item.sid } _sems4`, target: `${ item.sid } _sems5`, value: 1 })
                //     links.push({ source: `${ item.sid } _sems5`, target: `${ item.sid } _sems6`, value: 1 })
                //     nodes.push({ name: `${ item.sid } _sems4`, value: item.sid })
                //     nodes.push({ name: `${ item.sid } _sems5`, value: item.sid })
                //     nodes.push({ name: `${ item.sid } _sems6`, value: item.sid })

                //     return
                // }
            })
        }
        console.log('nodes', nodes, 'links', links)
        return { nodes, links }
    }

    getOption = (data) => {
        console.log(data)

        return {

            // tooltip: {
            //     trigger: 'item',
            //     formatter: "{c}"

            // },
            series: {
                type: 'sankey',
                layout: 'none',
                focusNodeAdjacency: 'allEdges',
                data: data.nodes,
                links: data.links,
                color: [
                    '#FA8670',
                    '#319D50',
             
                ],
                lineStyle: {
                    color: 'source',
                    opacity: 0.4
                },
                label: {
                    show: false,
                    backgroundColor: "rgba(0,0,0,0.3)",
                    color: "#fff",
                    padding: [4, 3],
                    borderRadius: 3
                }

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
            <div className="sankey">
                <ReactEcharts option={this.getOption(this.dataFormatForSankey(this.props.data))} style={{ height: this.state.height, width: this.state.width }} onEvents={onEvents} />
            </div>
        )
    }

    componentDidUpdate(){
        
    }
}
export default SankeyGraph