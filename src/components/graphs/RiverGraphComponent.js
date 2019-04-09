

import React, { Component } from 'react'
import * as d3 from 'd3'

export default class RiverGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: 300,
            width: 800,
            axis:{}
            //定义一学期有多少个礼拜
        }
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
    /**
     * @description: 绘制river坐标轴
     * @param {
     * slen:学期长度,
     * height:svg画布height
     * width: svg画布width}
     * dir： area的方向 
     * @return: null
     */
    initAxis(slen, width, height) {


        const x = d3.scaleLinear()
            .domain([0, slen * 3])
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

        const gX = this.svg.append("g")
            .attr("class", "xAxis")
            .attr("transform", `translate(0,${height})`)
            .attr("stroke", "red")
            .call(xAxis)
        // const yAxis = d3.axisRight(y)
        //增加zoom交互

        return {
            xAxis: gX,
            xScale: x,
            yScale: y
        }
    }
    /**
     * @description: 绘制river图的area的部分
     * @param {axis:initAxis中设置的比例尺与坐标轴对象,height:绘制的基线,direction:绘制的方向} 
     * @return: 
     */
    drawRiver(axis,height, direction) {


        const data = this.generateData(this.props.records)
        //数据绘制有问题
        // const data =[1,0,0,500,0,0,20,30]
        const areaPath = d3.area()
            .curve(d3.curveMonotoneX)
            .x((d, i) => axis.xScale(i))
            .y0((d, i) => height)
            .y1((d) => height - axis.yScale(d))



        const river = this.svg.append("path")
            .datum(data)
            .attr("d", areaPath)
            .attr("class", "area")
            .attr("stroke", "white")
            .attr("fill", "yellow")




        //缩放river
        // function zoomd() {
        //     //在这里可以随意选择缩放操作控制的元素以及他们的变化
        //     let t = d3.event.transform
        //     // river.attr("transform", t);
        //     console.log(t,t.rescaleX)

        //     //相当于在新的x的scale上重新绘制data，
        //     //t.rescaleX(x)会拷贝x的比例尺，返回一个新的比例尺
        //     x.domain(t.rescaleX(x).domain())
        //     river.attr("d", areaPath)
        //     //坐标轴的缩放
        //     gX.call(xAxis.scale(t.rescaleX(x)))
        // }

        // const zoom = d3.zoom()
        //     .scaleExtent([1, 1.2])
        //     .translateExtent([0, 0], [width, height])
        //     .extent([0, 0], [width, height])
        //     .on("zoom", zoomd)



        // river.call(zoom)
    }
    render() {
        return (
            <svg width={this.state.width} height={this.state.height} ref={element => { this.svg = d3.select(element) }}>
            </svg>
        )
    }

    componentDidMount() {
        let slen = this.sems,
            height = this.state.height / 2,
            width = this.state.width;
        // direction = this.props.direction|| 'up',

        let axis = this.initAxis(slen, width, height)
        this.setState({
            axis:axis
        })
    }
    componentDidUpdate() {
        let height = this.state.height / 2,

            // direction = this.props.direction|| 'up',
            direction = 'up'

        if (JSON.stringify(this.props.records) !== "{}") {
            this.drawRiver(this.state.axis, height, direction)
        }

    }
}