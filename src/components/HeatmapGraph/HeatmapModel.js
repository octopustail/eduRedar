/*
 * @Author: your name
 * @Date: 2020-01-17 11:49:41
 * @LastEditTime: 2020-02-26 10:14:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /eduRedar/src/components/HeatmapGraph/HeatmapModel.js
 */
/**  模型结果展示热力图*/
import React, { Component } from 'react'
import * as d3 from 'd3'
import { zumaColor } from '../../config/config'
import style from './style.css'

const ITEM_PER_PAGE = 30
export default class HeatModelGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: 400,
            width: 800,
            axis: {},
            page: 1
            //定义一学期有多少个礼拜
        }
        this.colors = ['#005824', '#1A693B', '#347B53', '#4F8D6B', '#699F83', '#83B09B', '#9EC2B3', '#B8D4CB', '#D2E6E3', '#EDF8FB', '#FFFFFF', '#F1EEF6', '#E6D3E1', '#DBB9CD', '#D19EB9', '#C684A4', '#BB6990', '#B14F7C', '#A63467', '#9B1A53', '#91003F'];

        this.margin = { top: 0, right: 0, bottom: 0, left: 0 },
            this.width = this.state.width - this.margin.left - this.margin.right,
            this.height = this.state.height - this.margin.top - this.margin.bottom,
            this.gridSize = Math.floor((this.height - 10) / ITEM_PER_PAGE),
            this.legendElementWidth = this.gridSize * 2,
            this.buckets = 9,
            this.colorScale = d3.scaleQuantize()
                .domain([0, 0.5, 1])
                .range(this.colors),
            this.days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            this.times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"];

    }

    /**
     * @description: 绘制river图的area的部分
     * @param 
     * @return: 
     */
    drawHeat = (ori_data) => {
        if (ori_data.length === 0) {
            return
        }
        const filteredData = ori_data.map(el => {
            return {
                'sid': el['sid'],
                '1_shwr': el['1_shwr'],
                '12_lib': el['12_lib'],
                '10_lib': el['10_lib'],
                '1_lib': el['1_lib'],
                '11_lib': el['11_lib'],
                '5_lib': el['5_lib'],
                '6_lib': el['6_lib'],
            }
        })
        const { page } = this.state
        const start = (page - 1) * ITEM_PER_PAGE
        const end = page * ITEM_PER_PAGE

        const data = filteredData.slice(start, end)
        d3.select("svg").selectAll("g").remove()
        const drawColumns = (key, index) => {
            if (key == "sid") {
                return
            }
            let heatmap = this.svg.append("g")
                .selectAll(".cellg")
                .data(data, d => d[key])
                .enter()
                .append("rect")
                .attr("class", "bordered")
                .attr("y", d => index * this.gridSize)
                .attr("x", d => data.indexOf(d) * this.gridSize)
                .attr("width", this.gridSize)
                .attr("height", this.gridSize)
                .style("fill", d => this.colorScale(d[key]))

                .on("mouseover", function (d) {
                    d3.select(this).classed("cell-hover", true);
                    // d3.selectAll(".rowLabel").classed("text-highlight", function (r, ri) { return ri == (d.row - 1); });
                    // d3.selectAll(".colLabel").classed("text-highlight", function (c, ci) { return ci == (d.col - 1); });

                    //Update the tooltip position and value
                    d3.select("#tooltip")
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY - 10) + "px")
                        .select("#value")
                        .text("lables:" + d.sid);
                    //Show the tooltip
                    d3.select("#tooltip").classed("hidden", false);
                })
                .on("mouseout", function () {
                    d3.select(this).classed("cell-hover", false);
                    
                    d3.select("#tooltip").classed("hidden", true);
                })
                .on("click",d=>{
                    this.props.handleSelectedId(d.sid)
                })
        }

        Object.keys((data[0])).forEach((element, index) => drawColumns(element, index))

        const legendElementWidth = 30
        var legend = this.svg.append("g").selectAll(".legend")
            .data([-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
            .enter().append("g")
            .attr("class", "legend");
        const colors = ['#005824', '#1A693B', '#347B53', '#4F8D6B', '#699F83', '#83B09B', '#9EC2B3', '#B8D4CB', '#D2E6E3', '#EDF8FB', '#FFFFFF', '#F1EEF6', '#E6D3E1', '#DBB9CD', '#D19EB9', '#C684A4', '#BB6990', '#B14F7C', '#A63467', '#9B1A53', '#91003F'];

        legend.append("rect")
            .attr("x", function (d, i) { return legendElementWidth * i; })
            .attr("y", this.height - (this.gridSize * 2))
            .attr("width", legendElementWidth)
            .attr("height", this.gridSize)
            .style("fill", function (d, i) { return colors[i]; });

        legend.append("text")
            .attr("class", "mono")
            .text(function (d) { return d; })
            .attr("width", legendElementWidth)
            .attr("x", function (d, i) { return legendElementWidth * i; })
            .attr("y", this.height - (this.gridSize * 4));


        // var legend = svg.selectAll(".legend")
        //     .data([0].concat(colorScale.quantiles()), function (d) { return d; });

        // legend.enter().append("g")
        //     .attr("class", "legend");

        // legend.append("rect")
        //     .attr("x", function (d, i) { return legendElementWidth * i; })
        //     .attr("y", height)
        //     .attr("width", legendElementWidth)
        //     .attr("height", gridSize / 2)
        //     .style("fill", function (d, i) { return colors[i]; });

        // legend.append("text")
        //     .attr("class", "mono")
        //     .text(function (d) { return "≥ " + Math.round(d); })
        //     .attr("x", function (d, i) { return legendElementWidth * i; })
        //     .attr("y", height + gridSize);

        // legend.exit().remove();
    };


    riverEvents = () => {
    }

    nextPage = () => {
        const dataLength = this.props.data.length
        if (this.state.page !== Math.ceil(dataLength / ITEM_PER_PAGE)) {
            this.setState({
                page: this.state.page + 1
            })
        }
    }
    prePage = () => {
        if (this.state.page === 1) {
            return
        }

        this.setState({
            page: this.state.page - 1
        })

    }

    render() {
        return (
            <div className="model-heat">
                <div style={{ background: "#fff", color: "#000" }} onClick={this.prePage}>上一页</div>
                <div style={{ background: "#fff", color: "#000" }} onClick={this.nextPage}>下一页</div>
                <div style={{ background: "#fff", color: "#000" }} >{this.state.page}/</div>
                <div id="tooltip" class="hidden">
                    <p><span id="value"></span></p>
                </div>
                <svg width={this.state.width} height={this.state.height} ref={element => { this.svg = d3.select(element) }}>
                </svg>
            </div>
        )
    }

    componentDidMount() {
        // this.init()
    }
    componentDidUpdate() {
        this.drawHeat(this.props.data)
    }
}