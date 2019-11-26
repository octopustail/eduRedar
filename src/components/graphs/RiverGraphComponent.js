import React, { Component } from 'react'
import * as d3 from 'd3'
import { zumaColor } from '../../config/config'
import style from './style.css'

export default class RiverGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: 120,
            width: 800,
            axis: {}
            //定义一学期有多少个礼拜
        }
        this.sems = 27
        this.colorScale = zumaColor
        this.direction = {
            food: 1,
            library: -1,
            shower: 1,
            hotwater: -1,
        }
    }

    generateData(data) {
        let arrs = data.countsArray.map((arr) => {
            return [].fill.call(Array.from({ length: arr.length }), 0)
        })
        let obj = { sems1: [...arrs[0]], sems2: [...arr[1]], sems3: [...arr[2]] }

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
    initAxis(slen, width, height, margin, counts) {

        let arr = [...counts[0].countArray[0], ...counts[0].countArray[1], ...counts[0].countArray[2]]
        const x = d3.scaleLinear()
            .domain([0, arr.length])
            .range([0, width])

        // const y = d3.scaleLinear()
        //     .domain([0, 1000])
        //     .range([0, height])

        //tickSize:指定的是tick的长短
        const xAxisScale = d3.scaleTime().range([0, width])
            .domain([new Date(2009, 8), new Date(2011, 2)])
        const xAxis = d3.axisBottom(xAxisScale)
            .ticks(12)
            .tickSize(-height)

        const gX = this.svg.append("g")
            .attr("class", "xAxis")
            .attr("transform", `translate(0,${height})`)
            .attr("stroke", "#fff")
            .call(xAxis)
            .selectAll("text")
            .style("font-size", "12px")
            .style("text-anchor", "start")
            .attr("transform", "rotate(45 -10 10)")


        // const yAxis = d3.axisRight(y)
        //增加zoom交互

        return {
            xAxis: gX,
            xScale: x,
            // yScale: y
        }
    }
    /**
     * @description: 绘制river图的area的部分
     * @param {data:Obj --{stype,cata,countArray}axis:initAxis中设置的比例尺与坐标轴对象,height:绘制的基线,direction:绘制的方向} 
     * @return: 
     */
    drawRiver(data, axis, height, direction,totalStu) {
        //调整比例尺，因为food的次数太大，如果用相同的比例尺，其他三类会被压缩的看不见
        const yScaleByType={
            food:60,
            shower:14,
            library:14,
            hotwater:14
        }

        const color = d3.scaleOrdinal([this.colorScale.food, this.colorScale.library, this.colorScale.shower, this.colorScale.hotwater])
        // const data = this.generateData(this.props.counts)
        const countsData = [].concat([...data.countArray[0], ...data.countArray[1], ...data.countArray[2]])
        // const countsData= [].concat([...data.countArray[0],...data.countArray[1],...data.countArray[2]])
        
        //将次数换算成 刷卡次数次数/人
        const aveData = countsData.map((element)=>{
            return element/totalStu
        })
        const yScale = d3.scaleLinear()
            // .domain(d3.extent(countsData))
            .domain([0,yScaleByType[data.stype]])
            .range([0, height])
        const areaPath = d3.area()
            .curve(d3.curveMonotoneX)
            .x((d, i) => axis.xScale(i))
            .y0((d, i) => height)
            .y1((d) => height - direction * yScale(d))



        const river = this.svg.append("path")
            .datum(aveData)
            .attr("d", areaPath)
            .attr("class", data.stype)
            .attr("stroke", "white")
            .attr("fill", this.colorScale[data.stype])
            .attr("opacity", "0.8")


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

    riverEvents = () => {

        d3.selectAll("path").on("mouseover", function () {
            d3.select(this)
                .raise()
                .transition()
                .duration(200)
                .attr("opacity", "1")
                .ease(d3.easeQuadIn)
        })
        d3.selectAll("path").on("mouseout", function () {
            d3.select(this)
                .lower()
                .transition()
                .duration(200)
                .attr("opacity", "0.8")
                .ease(d3.easeQuadIn)
        })

    }

    render() {
        return (
            <div className="river">
                <span style={{color:"#fff"}}>{this.props.cate}</span>
                <svg width={this.state.width} height={this.state.height} ref={element => { this.svg = d3.select(element) }}>
                </svg>
            </div>
        )
    }

    componentDidMount() {
        let slen = this.sems,
            height = this.state.height / 2,
            width = this.state.width,
            margin = 30,
            counts = this.props.counts,
            totalStu = this.props.totalStu;



        //绘制坐标轴和area
        if (counts.length !== 0) {
            let axis = this.initAxis(slen, width, height, margin, counts)
            counts.forEach(element => {
                const direction = this.direction[element.stype]
                this.drawRiver(element, axis, height, direction,totalStu)
            });
        }

        //添加鼠标交互
        this.riverEvents()
    }
    componentDidUpdate() {
        let isToggles = this.props.isToggles

        Object.keys(isToggles).map((key) => {
            if (!isToggles[key]) {
                this.svg.selectAll(`.${key}`)
                    .attr("opacity", "0")
            }else{
                this.svg.selectAll(`.${key}`)
                    .attr("opacity", "0.8")
            }
        })
    }
}