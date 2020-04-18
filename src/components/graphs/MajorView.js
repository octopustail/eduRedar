
/*
 * @Author: your name
 * @Date: 2020-01-17 11:49:41
 * @LastEditTime: 2020-03-04 19:54:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /eduRedar/src/components/HeatmapGraph/HeatmapModel.js
 */
/**  Major View*/
import React, { Component } from 'react'
import * as d3 from 'd3'
import * as Chromatic from 'd3-scale-chromatic'
import { Button } from 'antd'
import { zumaColor, pred_result } from '../../config/config'
import style from './style.css'

const ITEM_PER_PAGE = 35
export default class HeatModelGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: 700,
            width: 1200,
            axis: {},
            page: 1,
            key: '12_lib',
            features:["1_shwr","12_lib","10_lib","1_lib","11_lib","5_lib","6_lib"]
            
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

    drawHeat = (ori_data) => {
        if (ori_data===undefined || ori_data.length === 0) {
            return
        }

        let pred_res = pred_result.filter(e=> {
            return e.predict==1 && e.real==1
        })

        let datacollection = ori_data.map(elem=>{
            let item = pred_res.find(e=>e.sid === elem.sid)
            if(item){
                elem.pred = 1-item.prob
            }else{
                console.log(item.sid)
            }
            return elem
        })
        
        let {features} = this.state


        const arcGenerators = this.formatArc(features.length)
        // 添加x轴和y轴

        var padding = { top: 50, right: 50, bottom: 50, left: 50 };
                // 创建一个分组用来组合要画的图表元素
        var main = this.svg.append('g')
                    .classed('main', true)
                    .attr('transform', `translate(20,30)`);
                

        var xScale = d3.scaleLinear()
                .domain([0, 100])
                // .domain([0, 1])
                .range([0, this.width-padding.left-padding.right]);
        var yScale = d3.scaleLinear()
                .domain([0.5, 1])
                .range([this.height-padding.top-padding.bottom, 0]);
        var xAxis = d3.axisBottom(xScale)
            
        var yAxis = d3.axisRight(yScale)

        const colorScale = d3.scaleThreshold()
        .domain([0, 0.01, 0.03, 0.08, 0.2, 0.4, 0.7])
        // .range([0,1])
        .range(Chromatic.schemeOrRd[8])
        

        var arc = d3.arc()
            .innerRadius(3)
            .outerRadius(5);
        var angle = 2*Math.PI;

            
        // 添加气泡
        main.selectAll('.bubble')
            .data(datacollection)
            .enter()
            .append('circle')
            .attr('class', 'bubble')
            .attr('cx', function(d) {
                console.log(d)
                return xScale(d["cal1_f"]);
            })
            .attr('cy', function(d) {
            return yScale(d.pred);
            })
            .attr("r",2)
            .on("click", d => {
                console.log(d.sid)
            })

        // let petals = main.append("g")
        //     .selectAll("g")
        //     .data(features)
        //     .enter()
        //     .append("g")
        //     .attr('class',function(d, i) {
        //         return 'petal_' + d;
        //     });

        // for(let i=0;i<features.length;i++){
        //     petals.select(`.petal_${features[i]}`)
        //     .data(datacollection)
        //     .enter()
        //     .append("path")
        //     .attr('transform',(d)=>`translate(${xScale(d["6_lib"])},${yScale(d.pred)})`)
        //     .style("fill", d => {
        //         return colorScale(d[features[i]])
        //     })
        //     .attr('d',(d)=>{
        //         return arc(arcGenerators[i])})

        //     }
        // 把x轴应用到对应的SVG元素上
        main.append('g')
        .attr('class', 'axis')
        .attr('transform',`translate(0,${this.height-padding.top-padding.bottom})`)
        .call(xAxis);
        // 把y轴应用到对应的SVG元素上
        main.append('g')
        .attr('class', 'axis')
        .attr('transform',`translate(0,0)`)
        .call(yAxis);

                
        
    }

    formatArc = (featureCount)=>{
        var angle = 2*Math.PI;
        
        const per_item = 1/featureCount
        let arcGenerators = []
        let start=0
        let end= 1 
        for(let i=0;i<featureCount;i++){
            let arc = {
                startAngle:start* per_item *angle,
                endAngle:end* per_item* angle,
            }
            arcGenerators.push(arc)
            start = start+1,
            end = end+1
        }
        return arcGenerators
    }

    render() {
        return (
            <div className="item-wrapper model-heat">
                <svg 
                width={this.state.width} 
                height={this.state.height} 
                ref={element => { this.svg = d3.select(element) }}
                >
                </svg>
            </div>
        )
    }

    componentDidMount() {
        this.drawHeat()
    }
    componentDidUpdate() {
        // this.drawHeat(this.props.data)
        this.drawHeat(this.props.data)
    }
}