/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-08 19:29:31
 * @LastEditTime: 2019-12-25 17:19:53
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react'
import * as d3 from 'd3'
import { cateColor } from '../../config/config'
import style from './style.css'

export default class BloomGraph extends Component {
    constructor(props) {
        super(props)
        this.width = 400
        this.height = 400
        this.svg = {}
    }
    drawGraph(students) {

        // students.map(cate => {

        // })

        let nodes_a = [
            { name: "A_A", cate: "A" },
            { name: "A_B", cate: "A" },
            { name: "A_C", cate: "A" },
        ]

        let edges_a = [

            { source: 'A_B', target: "A_A" },
            { source: 'A_C', target: "A_B" },
            { source: 'A_A', target: "A_C" },
        ]
        let nodes_b = [
            { name: "B_A", cate: "B" },
            { name: "B_B", cate: "B" },
            { name: "B_C", cate: "B" },
        ]

        let edges_b = [
            { source: 'B_B', target: "B_A" },
            { source: 'B_C', target: "B_B" },
            { source: 'B_A', target: "B_C" },
        ]

        let nodes_c = [
            { name: "C_A", cate: "C" },
            { name: "C_B", cate: "C" },
            { name: "C_C", cate: "C" },
        ]

        let edges_c = [
            { source: 'C_B', target: "C_A" },
            { source: 'C_C', target: "C_B" },
            { source: 'C_A', target: "C_C" },
        ]


        students.forEach((cateObj) => {
            const cate = cateObj.cate


            cateObj.list.forEach(elem => {
                if (cate === "A_A" || cate === "A_B" || cate === "A_C") {
                    nodes_a.push({ name: elem, cate: cate })
                    edges_a.push({ source: cate, target: elem, cate: cate })
                }
                if (cate === "B_A" || cate === "B_B" || cate === "B_C") {
                    nodes_b.push({ name: elem, cate: cate })
                    edges_b.push({ source: cate, target: elem, cate: cate })
                }
                if (cate === "C_A" || cate === "C_B" || cate === "C_C") {
                    nodes_c.push({ name: elem, cate: cate })
                    edges_c.push({ source: cate, target: elem, cate: cate })
                }

            })
        })

        function svgNodeEgdeCreator(nodes, edges, svg) {
            //绘制力导向图
            let svg_edges = svg.append("g")

                .selectAll('line')
                .data(edges)
                .enter()
                .append('line')
                // .style("stroke", "#fff")
                .style("stroke", null)


            let svg_nodes = svg.append("g")

                .selectAll("circle")
                .data(nodes)
                .enter()
                .append("circle")
                .attr("r", function (d) {
                    if (!d.cate) { return 0 }
                    if (d.cate == "A" || d.cate == "B" || d.cate == "C") {
                        return 0
                    } else {
                        return 2
                    }

                })
                //这个地方写成箭头函数
                .style("fill", function (d) {
                    if (d.cate) {
                        return cateColor[d.cate]
                    } else {
                        return "#ff0"
                    }
                })
            return { svg_nodes, svg_edges }
        }



        const svg_a = svgNodeEgdeCreator(nodes_a, edges_a, this.svg.a)
        const svg_b = svgNodeEgdeCreator(nodes_b, edges_b, this.svg.b)
        const svg_c = svgNodeEgdeCreator(nodes_c, edges_c, this.svg.c)

        function simulationCreator(nodes, edges, svg_nodes, svg_edges, width, height, decay) {
            const simulation = d3.forceSimulation()
                .velocityDecay(decay)
                .nodes(nodes)
                .force("link", d3.forceLink(edges).id(d => d.name))
                .force("charge", d3.forceManyBody()
                    .strength(((d) => {
                        if (d.cate == "A" || d.cate == "B" || d.cate == "C") { return -80 } else { return 0 }
                    }))
                )
                .force("collide", d3.forceCollide(() => 3.5))
                .force("x", d3.forceX())
                .force("y", d3.forceY())
                .force("center", d3.forceCenter(width / 2, height / 2))


            simulation
                .on("tick", function () { //对于每一个时间间隔
                    //更新连线坐标
                    svg_edges.attr("x1", function (d) { return validateXY(d.source.x, 'x', width, height) })
                        .attr("y1", function (d) { return validateXY(d.source.y, 'y', width, height) })
                        .attr("x2", function (d) { return validateXY(d.target.x, 'x', width, height) })
                        .attr("y2", function (d) { return validateXY(d.target.y, 'y', width, height) });

                    //更新节点坐标
                    svg_nodes.attr("cx", function (d) { return validateXY(d.x, 'x', width, height) })
                        .attr("cy", function (d) { return validateXY(d.y, 'y', width, height) });

                });


            function validateXY(val, type, width, height) {
                var r = 20;
                if (val < r) return r;
                if (type == 'x') {
                    if (val > width - r) return width - r
                } else {
                    if (val > height - r) return height - r
                }
                return val
            }
        }

        simulationCreator(nodes_a, edges_a, svg_a.svg_nodes, svg_a.svg_edges, this.width, this.height, 0.7)
        simulationCreator(nodes_b, edges_b, svg_b.svg_nodes, svg_b.svg_edges, this.width, this.height, 0.8)
        simulationCreator(nodes_c, edges_c, svg_c.svg_nodes, svg_c.svg_edges, this.width, this.height, 0.8)

    }
    render() {

        return (
            <div className="bloom">
                <div>
                    <svg width={this.width} height={this.height} ref={elem => this.svg.a = d3.select(elem)}></svg>
                    <div class="bloom-label">
                        <div>Precision: 23.07%</div>
                        <div>Recall: 6.66%</div>
                    </div>
                </div>
                <div>
                    <svg width={this.width} height={this.height} ref={elem => this.svg.b = d3.select(elem)}></svg>
                    <div class="bloom-label">
                        <div>Precision: 76.88%</div>
                        <div>Recall: 95.16%</div>
                    </div>
                </div>
                <div>
                    <svg width={this.width} height={this.height} ref={elem => this.svg.c = d3.select(elem)}></svg>
                    <div class="bloom-label">
                        <div>Precision: 33.33%</div>
                        <div>Recall: 5.63%</div>
                    </div>
                </div>
                
            </div>
        )
    }

    componentDidMount() {
        this.drawGraph(this.props.students)
    }
    // componentDidUpdate() {
    //     console.log('students', this.props.students)
    //     this.drawGraph(this.props.students)
    // }
    // componentDidUpdate(){
    //     if(JSON.stringify(this.props.stuCates)!= "{}"){
    //         this.drawGraph()
    //     }
    // }
}