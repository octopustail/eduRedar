import React, { Component } from 'react'
import * as d3 from 'd3'

export default class RiverGraph extends Component {
    constructor(props) {
        super(props)
        this.height = 300
        this.width = 800

        this.sems = 27
    }
    initAxis() {
        this.svg.append('circle')
            .attr('cx', 30)
            .attr('cy', 30)
            .attr('r', 10)
            .style('fill', '#fff')

    }
    generateData(data) {
        let arr = [].fill.call(Array.from({ length: 27 }), 0)
        let obj = { sems1: [...arr], sems2: [...arr], sems3: [...arr] }

        //将每个学生的周records数组累加起来，形成所有学生的周records之和
        obj = data.reduce((obj, student) => {
            for (let i = 1; i <= 3; i++) {
                for (let j = 0; j < 27; j++) {
                    obj[`sems${i}`][j] += parseInt(student[`sems${i}`][j])
                }
            }
            return obj
        }, obj)


        const sems1 = [...obj.sems1], sems2 = [...obj.sems2], sems3 = [...obj.sems3];
        return [...sems1, ...sems2, ...sems3]

    }
    drawRiver() {
        let s = 27,
            height = this.height / 2,
            width = this.width;

        const x = d3.scaleLinear()
            .domain([0, s * 3])
            .range([0, width])

        const y = d3.scaleLinear()
            .domain([0, 1000])
            .range([0, height])

        //tickSize:指定的是tick的长短
        const xAxisScale = d3.scaleTime().range([0, width])
            .domain([new Date(2009, 8), new Date(2011, 2)])
        const xAxis = d3.axisBottom(xAxisScale)
            .ticks(12)
            .tickSize(-height)

        // const yAxis = d3.axisRight(y)
        //增加zoom交互

        const data = this.generateData(this.props.records)
        //数据绘制有问题
        // const data =[1,0,0,500,0,0,20,30]
        const areaPath = d3.area()
            .curve(d3.curveMonotoneX)
            .x((d, i) => x(i))
            .y0((d, i) => height)
            .y1((d) => height - y(d))



        const river = this.svg.append("path")
            .datum(data)
            .attr("d", areaPath)
            .attr("class", "area")
            .attr("stroke", "white")
            .attr("fill", "yellow")


        const gX = this.svg.append("g")
            .attr("class", "xAxis")
            .attr("transform", `translate(0,${height})`)
            .attr("stroke", "red")
            .call(xAxis)

        function zoomd() {
            //在这里可以随意选择缩放操作控制的元素以及他们的变化
            let t = d3.event.transform
            // river.attr("transform", t);

            //相当于在新的x的scale上重新绘制data，
            //t.rescaleX(x)会拷贝x的比例尺，返回一个新的比例尺
            x.domain(t.rescaleX(x).domain())
            river.attr("d", areaPath)
            //坐标轴的缩放
            gX.call(xAxis.scale(t.rescaleX(x)))
        }

        const zoom = d3.zoom()
            .scaleExtent([1, 1.2])
            .translateExtent([0, 0], [width, height])
            .extent([0, 0], [width, height])
            .on("zoom", zoomd)



        river.call(zoom)
    }
    render() {
        return (
            <div className="recordScatter">
                <svg width={this.width} height={this.height} ref={element => { this.svg = d3.select(element) }}>
                </svg>
            </div>
        )
    }

    // componentDidMount() {
    //     this.initAxis()
    // }
    // componentDidUpdate() {
    //     if (JSON.stringify(this.props.records) !== "{}") {
    //         this.drawRiver()
    //     }

    // }
}