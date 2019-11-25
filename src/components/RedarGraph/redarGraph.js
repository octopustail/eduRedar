/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-03-04 14:51:35
 * @LastEditTime: 2019-11-20 11:13:33
 * @LastEditors: Please set LastEditors
 */
import * as d3 from 'd3'
import style from './style.css'
import { color } from 'd3';
import { zumaColor as colorScale, schoolCalendar } from '../../config/config'


let redarGraph = {}


redarGraph.initGraph = function (el, data) {
    //MaxMin时间要转化成分钟的相对时间 MaxDay:一学期的总天数，应该用相对时间计算获
    
    //清空画布 重新开始画
    if(data==undefined || !data.hasOwnProperty('sems')){
        return 
    }
    const sems = data.sems

    d3.select(el).selectAll('svg').remove()
    let formatDatas = []
    // const startTime_ms = Date.parse(schoolCalendar[`sems${sems}`])
    //当前学期开始时间
    const startTime_ms = Date.parse(schoolCalendar[sems-1].start)

    function convertDatatoFormat(startTime_ms, record) {
        let dayStr = record.sdate.split('-').join(',')
        let day_ms = Date.parse(new Date(dayStr))
        let day = (day_ms - startTime_ms) / (1000 * 60 * 60 * 24)

        let hourArr = record.stime.split(':').slice(0, 2)
        let hour = parseInt(hourArr[0]) * 60 + parseInt(hourArr[1])
        return [hour, day]

    }
    if (JSON.stringify(data) !== {}) {
        ['food', 'shower', 'library', 'hotwater'].forEach(function (key) {
            let formatData = data[key].map(function (item) {
                let arr = convertDatatoFormat(startTime_ms, item)
                arr.push(item)
                return arr
            })
            formatDatas = formatDatas.concat(formatData)
        })
    }
    const MaxMin = 60 * 24
    const MaxDay = 200
    const width = 240
    const height = 240
    const margin = 50
    // const radius = Math.min(height, height) / 2
    const radius = Math.min(width - margin, height - margin) / 2

    let Mockdata = [[3, 133],
    [480, 80], [0, 0], [180, 199]]

    const angle = d3.scaleLinear()
        .domain([0, MaxMin])
        .range([0, 2 * Math.PI])

    const r = d3.scaleLinear()
        .domain([0, MaxDay])
        .range([20, radius])

    let svg = d3.select(el).append("svg")
        .attr("width", width + margin)
        .attr("height", height + margin)
        .append("g")
        .attr("transform", `translate(${(width + margin) / 2},${(height + margin) / 2})`);
    // .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    let gr = svg.append("g")
        .attr("class", "r axis")
        .selectAll("g")
        .data(r.ticks(4))
        .enter()
        .append("g")


    gr.append("circle")
        .attr("r", r)

    let ga = svg.append("g")
        .attr("class", "a axis")
        .selectAll("g")
        //d3.range(start,end,step)
        .data(d3.range(-90, 270, 45))
        .enter()
        .append("g")
        .attr("transform", function (d) {
            return `rotate(${d})`
        })
    //之前对每一根line旋转了坐标系，这个地方设置x2不设置x1.则line的端点(0,0),(radius,0)
    ga.append("line")
        .attr("x2", radius)

    ga.append("text")
        .attr("x", radius + 6)
        .attr("dy", ".35em")
        .style("text-anchor", function (d) { return d < 270 && d > 90 ? "end" : null; })
        .attr("transform", function (d) {
            // console.log(d)
            return d < 270 && d > 90 ? "rotate(180 " + (radius + 6) + ",0)" : null;
        })
        .text(function (d, i) {
            // console.log(d,i)
            return i * 3 + ":00"
        });

    let line = d3.radialLine()
        .angle(function (d) {
            return angle(d[0])
        })
        .radius(function (d) {
            return r(d[1])
        })

    const color = d3.scaleOrdinal([colorScale.food, colorScale.library, colorScale.hotwater, colorScale.shower]);

    svg.selectAll("point")
        .data(formatDatas)
        .enter()
        .append("circle")
        .attr("class", "point")
        .attr("transform", function (d) {
            const coors = line([d.slice(0, 2)])
            let coors1 = coors.slice(1).slice(0, -1);
            return `translate(${coors1})`
        })
        .attr("r", 1.5)
        // .attr("class", function (d) {
        //     return d
        // })
        .attr("fill", function (d, i) {
            return color(d[2].stype)
        })
        .style("opacity", 0.7)


    let tooltip = d3.select(el)
        .append('div')
        .attr("class", "tooltip")

    tooltip.append('div')
        .attr("class", "date")
        .append('div')
        .attr("class", 'value')

    svg.selectAll(".point")
        .on("mouseover", function (d) {
            tooltip.select('.date').html(`${d[2].stype}: ${d[2].sdate} ${d[2].stime}`)
            d3.select(this)
                .style("stroke", "#fff")
                .style("stroke-width", "2px")

            // let nodes = document.getElementsByClassName(this.getAttribute('class'))

            // d3.selectAll(nodes)
            //     .style("stroke", '#ffffff')
            //     .style("stroke-width", "2px")

            tooltip.style('display', 'block');
            tooltip.style('opacity', 1);
        })
        .on('mousemove', function (d) {
            tooltip.style('top', (d3.event.layerY + 10) + 'px')
                .style('left', (d3.event.layerX - 25) + 'px');
        })
        .on('mouseout', function (d) {
            d3.selectAll(".point")
                .style("fill", function (d) { return color(d[2].stype); })
                .style("stroke", "none")

                let nodes = document.getElementsByClassName(this.getAttribute('class'))
            d3.selectAll(nodes)
                .style("opacity", 0.7)
                .style("stroke", "none")
            tooltip.style('display', 'none');
            tooltip.style('opacity', 0);
        });
}

export default redarGraph