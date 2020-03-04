/*
 * @Author: your name
 * @Date: 2020-01-17 11:49:41
 * @LastEditTime: 2020-03-04 19:54:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /eduRedar/src/components/HeatmapGraph/HeatmapModel.js
 */
/**  模型结果展示热力图*/
import React, { Component } from 'react'
import * as d3 from 'd3'
import * as Chromatic from 'd3-scale-chromatic'
import { Button } from 'antd'
import { zumaColor } from '../../config/config'
import style from './style.css'

const ITEM_PER_PAGE = 35
export default class HeatModelGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: 300,
            width: 1200,
            axis: {},
            page: 1,
            key: '12_lib'
            //定义一学期有多少个礼拜
        }
        // this.colors = ['#005824', '#1A693B', '#347B53', '#4F8D6B', '#699F83', '#83B09B', '#9EC2B3', '#B8D4CB', '#D2E6E3', '#EDF8FB', '#FFFFFF', '#F1EEF6', '#E6D3E1', '#DBB9CD', '#D19EB9', '#C684A4', '#BB6990', '#B14F7C', '#A63467', '#9B1A53', '#91003F'];
        // this.colors = d3.interpolateRgbBasis(['#347B53', '#9EC2B3']);
        const colors = ["#6a60a9", "#fbd14b"]
        var color = d3.scaleThreshold()
            .domain([0, 0.1, 0.2, 0.3, 0.4, 0.7, 1])
        this.margin = { top: 10, right: 10, bottom: 10, left: 10 },
            this.width = this.state.width - this.margin.left - this.margin.right,
            this.height = this.state.height - this.margin.top - this.margin.bottom,
            // this.gridSize = Math.floor((this.width - 100) / ITEM_PER_PAGE),
            this.gridSize = 30,
            this.legendElementWidth = this.gridSize * 2,
            this.buckets = 9,


            // this.colorScale = d3.scaleSequentialSqrt([0, 1], d3.interpolatePuRd)

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

        const { page } = this.state
        const start = (page - 1) * ITEM_PER_PAGE
        const end = page * ITEM_PER_PAGE
        const sortedData = this.sorteDataByKey(ori_data)

        const filteredData = sortedData.map(el => {
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

        const data = filteredData.slice(start, end)
        const colorScale = d3.scaleThreshold()
            .domain([0, 0.01, 0.03, 0.08, 0.2, 0.4, 0.7])
            .range(Chromatic.schemeOrRd[8])

        d3.select("svg").selectAll("g").remove()
        const drawColumns = (key, index) => {
            if (key == "sid") {
                return
            }
            let heatmap = this.svg.append("g")
                .attr("transform", `translate(80,20)`)
                .attr("class", `one-row-${key}`)
                .selectAll(".cellg")
                .data(data, d => d[key])
                .enter()
                .append("rect")
                .attr("class", "bordered")
                .attr("y", d => index * this.gridSize)
                .attr("x", d => data.indexOf(d) * this.gridSize)
                .attr("width", this.gridSize)
                .attr("height", this.gridSize)
                .attr("rx", 5.5)
                .attr("rx", 5.5)
                .style("fill", d => colorScale(d[key]))

            d3.select(`.one-row-${key}`)
                .append("text")
                .attr("x", -65)
                .attr("y", d => (index + 0.8) * this.gridSize)
                .attr("class", "label-text")
                .text(key)

            heatmap.on("mouseover", function (d) {
                d3.select(this).classed("cell-hover", true);
                // d3.selectAll(".rowLabel").classed("text-highlight", function (r, ri) { return ri == (d.row - 1); });
                // d3.selectAll(".colLabel").classed("text-highlight", function (c, ci) { return ci == (d.col - 1); });

                //Update the tooltip position and value
                d3.select("#tooltip")
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 10) + "px")
                    .select("#value")
                    .text(`${d.sid} : ${d[key]}`);
                //Show the tooltip
                d3.select("#tooltip").classed("hidden", false);
            })
                .on("mouseout", function () {
                    d3.select(this).classed("cell-hover", false);

                    d3.select("#tooltip").classed("hidden", true);
                })
                .on("click", d => {
                    this.props.handleSelectedId(d.sid)
                })
        }

        Object.keys((data[0])).forEach((element, index) => drawColumns(element, index))

        // const legendElementWidth = 30
        // var legend = this.svg.append("g").selectAll(".legend")
        //     .data([0, 1])
        //     .enter().append("g")
        //     .attr("class", "legend");
        // const colors = ["#6a60a9", "#fbd14b"]

        // legend.append("rect")
        //     .attr("x", function (d, i) { return legendElementWidth * i; })
        //     .attr("y", this.height - (this.gridSize * 2))
        //     .attr("width", legendElementWidth)
        //     .attr("height", this.gridSize)
        //     .style("fill", function (d, i) { return colors[i]; });
        var x = d3.scaleSqrt()
            .domain([0, 1])
            .rangeRound([440, 950]);

        var g = this.svg.append("g")
            .attr("class", "heat-legend")
            .attr("transform", "translate(180,12)");

        g.selectAll("rect")
            .data(colorScale.range().map(function (d) {
                d = colorScale.invertExtent(d);
                if (d[0] == null) d[0] = x.domain()[0];
                if (d[1] == null) d[1] = x.domain()[1];
                return d;
            }))
            .enter().append("rect")
            .attr("height", 8)
            .attr("x", function (d) { return x(d[0]); })
            .attr("width", function (d) { return x(d[1]) - x(d[0]); })
            .attr("fill", function (d) { return colorScale(d[0]); });


            
        g.call(d3.axisBottom(x)
            .tickSize(13)
            .tickValues(colorScale.domain()))
            .select(".domain")
            .remove();
        // legend.append("text")
        //     .attr("class", "mono")
        //     .text(function (d) { return d; })
        //     .attr("width", legendElementWidth)
        //     .attr("x", function (d, i) { return legendElementWidth * i; })
        //     .attr("y", this.height - (this.gridSize * 4));


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

    handleSorted = (e) => {
        this.setState({
            key: "1_shwr"
        })
    }

    sorteDataByKey = (data) => {
        const key = this.state.key
        return data.sort((a, b) => {
            return b['cal1_f'] - a['cal1_f']
        })
    }

    render() {
        return (
            <div className="item-wrapper model-heat">
                <div id="tooltip" class="hidden">
                    <p><span id="value"></span></p>
                </div>
                <svg width={this.state.width} height={this.state.height} ref={element => { this.svg = d3.select(element) }}>
                </svg>
                <div className="control-group">
                    <Button className="control-item" onClick={this.prePage}>PrevPage</Button>
                    <span className="control-span"> {this.state.page} </span>
                    <Button className="control-item" onClick={this.nextPage}>NextPage</Button>
                </div>
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