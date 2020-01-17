/*
 * @Author: your name
 * @Date: 2020-01-17 11:49:41
 * @LastEditTime : 2020-01-17 17:43:42
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /eduRedar/src/components/HeatmapGraph/HeatmapModel.js
 */
/**  模型结果展示热力图*/
import React, { Component } from 'react'
import * as d3 from 'd3'
import { zumaColor } from '../../config/config'
import style from './style.css'

export default class HeatModelGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: 1000,
            width: 800,
            axis: {}
            //定义一学期有多少个礼拜
        }
        this.colors = ['#005824', '#1A693B', '#347B53', '#4F8D6B', '#699F83', '#83B09B', '#9EC2B3', '#B8D4CB', '#D2E6E3', '#EDF8FB', '#FFFFFF', '#F1EEF6', '#E6D3E1', '#DBB9CD', '#D19EB9', '#C684A4', '#BB6990', '#B14F7C', '#A63467', '#9B1A53', '#91003F'];

        this.margin = { top: 0, right: 0, bottom: 0, left: 0 },
            this.width = this.state.width - this.margin.left - this.margin.right,
            this.height = this.state.height - this.margin.top - this.margin.bottom,
            this.gridSize = Math.floor((this.height-50) / 100),
            this.legendElementWidth = this.gridSize * 2,
            this.buckets = 9,
            this.colorScale = d3.scaleQuantize()
                .domain([0, 0.5, 1])
                .range(this.colors),
            this.days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            this.times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"];
    }

    // dataformat = (data)=>{
    //     formatedData = data.map(elem=>{
    //         arr = []
    //         Object.keys(elem).forEach((el)=>{
    //             arr.push(el)
    //         })
    //     })
    //     return formatedData
    // }
    initAxis(slen, width, height, margin, counts) {

    }
    /**
     * @description: 绘制river图的area的部分
     * @param 
     * @return: 
     */
    drawHeat = (data) => {


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
                .attr("x", d => index * this.gridSize)
                .attr("y", d => data.indexOf(d) * this.gridSize)
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
                    // d3.selectAll(".rowLabel").classed("text-highlight", false);
                    // d3.selectAll(".colLabel").classed("text-highlight", false);
                    d3.select("#tooltip").classed("hidden", true);
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

    render() {
        console.log(this.props.data)
        return (
            <div className="model-heat">
                <span style={{ color: "#fff" }}></span>
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