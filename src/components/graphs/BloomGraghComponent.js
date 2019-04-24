import React, { Component } from 'react'
import * as d3 from 'd3'
import { cateColor } from '../../config/config'

export default class BloomGraph extends Component {
    constructor(props) {
        super(props)
        this.width = 1000
        this.height = 1000
    }
    drawGraph(students) {

        // students.map(cate => {

        // })

        let nodes = [
            { name: "A" },
            { name: "B" },
            { name: "C" },
            { name: "A_A",cate:"A"},
            { name: "A_B",cate:"A"},
            { name: "A_C",cate:"A"},
            { name: "B_A",cate:"B"},
            { name: "B_B",cate:"B"},
            { name: "B_C",cate:"B"},
            { name: "C_A",cate:"C"},
            { name: "C_B",cate:"C"},
            { name: "C_C",cate:"C"},
        ]
        // nodes = students.map((item) => {
        //     return {
        //         name: item.cate
        //     }
        // })
        let edges = [
            { source: 'B', target: "A" },
            { source: 'C', target: "B" },
            { source: 'A', target: "C" },
            { source: 'A', target: "A_A" },
            { source: 'A', target: "A_B" },
            { source: 'A', target: "A_C" },
            { source: 'B', target: "B_A" },
            { source: 'B', target: "B_B" },
            { source: 'B', target: "B_C" },
            { source: 'C', target: "C_A" },
            { source: 'C', target: "C_B" },
            { source: 'C', target: "C_C" },
        ]

        students.forEach((cateObj) => {
            const cate = cateObj.cate
            cateObj.list.forEach(elem => {
                nodes.push({ name: elem, cate: cate })
                edges.push({ source: cate, target: elem, cate:cate})

            })
        })
        //先生成一个构成的力导向布局
        const simulation = d3.forceSimulation()
            //forceLink(links) 是对制定的links和创建弹簧力模型，没有links则默认为空
            .force("link", d3.forceLink().id(d => d.name))
            //将节点视为有一定radius的圆，阻止节点间的碰撞
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(this.width / 2, this.height / 2))




        //绘制力导向图
        let svg_edges = this.svg.append("g")

            .selectAll('line')
            .data(edges)
            .enter()
            .append('line')
            .style("stroke", "#fff")
            // .style("stroke", null)


        let svg_nodes = this.svg.append("g")

            .selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("r", function(d){
                if(!d.cate){return 0}
                if(d.cate=="A"||d.cate=="B"||d.cate=="C"){
                    return 20
                }else{
                    return 3
                }
                
            })
            //这个地方写成箭头函数
            .style("fill",function(d){
                if (d.cate) {
                    return cateColor[d.cate]
                } else {
                    return "#ff0"
                }
            })




        simulation.nodes(nodes)
            .force("link", d3.forceLink(edges).id(d => d.name))
            .force("charge", d3.forceManyBody().strength(((d) => {
                if(d.cate){return -10}else{return 10}
            })))
            .force("x", d3.forceX())
            .force("y", d3.forceY())
            .force("center", d3.forceCenter(this.width / 2, this.height / 2))


        simulation
            .on("tick", function () { //对于每一个时间间隔
                //更新连线坐标
                svg_edges.attr("x1", function (d) { return d.source.x; })
                    .attr("y1", function (d) { return d.source.y; })
                    .attr("x2", function (d) { return d.target.x; })
                    .attr("y2", function (d) { return d.target.y; });

                //更新节点坐标
                svg_nodes.attr("cx", function (d) { return d.x; })
                    .attr("cy", function (d) { return d.y; });

            });

        //力导向图的节点是一个packed 图
    }
    render() {

        return (
            <div className="bloom">
                <svg width={this.width} height={this.height} ref={elem => this.svg = d3.select(elem)}>
                </svg>
            </div>
        )
    }

    componentDidMount() {
        console.log('students', this.props.students)
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