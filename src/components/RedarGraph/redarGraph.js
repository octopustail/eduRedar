/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-03-04 14:51:35
 * @LastEditTime: 2020-02-28 11:11:51
 * @LastEditors: Please set LastEditors
 */
import * as d3 from 'd3'
import style from './style.css'
import { color } from 'd3';
import { zumaColor as colorScale, schoolCalendar } from '../../config/config'


let redarGraph = {}


redarGraph.initGraph = function (el, data, sems) {
    //MaxMin时间要转化成分钟的相对时间 MaxDay:一学期的总天数，应该用相对时间计算获

    //清空画布 重新开始画
    // if (data == undefined || !data.hasOwnProperty('sems')) {
    //     return
    // }
    // const sems = data.sems

    // d3.select(el).selectAll('svg').remove()
    let formatDatas = []
    const MaxDay = 200
    const width = 240
    const height = 240
    // const width = 20
    // const height = 20
    const margin = 30

    const Redarwidth = 86
    const Redarheight = 60
    const Redarmargin = 20
    const rangeMax = 1
    const rangeMin = 0
    const level = 4
    //指标数
    const total = 5
    const radius = Math.min(Redarwidth - Redarmargin, Redarheight - Redarmargin) / 2
    const arc = 2 * Math.PI
    const onePiece = arc / total

    let polygons = {
        webs: [],
        webPoints: []
    }
    //再散点图的svg中绘制
    let svg = d3.select(el)
        .select('svg')
        .append("g")
        .attr("class", `star_${sems}`)
        .attr("transform", `translate(${(width + margin) / 2},${(height + margin) / 2})`);


    //计算用于连城网格线的点的位置,k--的目的是让最外圈最先加入数组，添加纵轴时取index=0的就可以找到最外圈的点
    for (let k = level; k > 0; k--) {
        let webs = '',
            webPoints = []
        let r = radius / level * k;
        for (let i = 0; i < total; i++) {
            let x = r * Math.sin(i * onePiece)
            let y = r * Math.cos(i * onePiece)
            webs += `${x},${y} `
            webPoints.push({
                x: x,
                y: y
            })
        }
        polygons.webs.push(webs)
        polygons.webPoints.push(webPoints)
    }

    let webs = svg.append('g')
        .classed('webs', true)

    webs.selectAll('polygon')
        .data(polygons.webs)
        .enter()
        .append('polygon')
        .attr('points', d => d)

    //添加纵轴
    let line = svg.append("g")
        .classed("lines", true)

    line.selectAll("line")
        .data(polygons.webPoints[0])
        .enter()
        .append("line")
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', d => d.x)
        .attr('y2', d => d.y)

    //计算数据点位置
    let areasData = {}
    let value = Object.keys(data).map(el => data[el])

    let area = '',
        points = []
    for (let k = 0; k < total; k++) {
        const r = radius * (value[k] - rangeMin) / (rangeMax - rangeMin);
        const x = r * Math.sin(k * onePiece),
            y = r * Math.cos(k * onePiece);
        area += x + ',' + y + ' ';
        points.push({
            x: x,
            y: y,
            v: value[k]
        })
    }
    areasData = {
        polygon: area,
        points: points
    };

    let areas = svg.append('g')
        .classed('area', true)

    areas
        .append('polygon')
        .attr('points', areasData.polygon)
        .attr('stroke', 'rgba(252,211,3, 0.8)')
        .attr('fill', 'rgba(252,211,3, 0.3)')
    let circle = areas.append('g')
        .classed('circles', true)

    circle.selectAll('circle')
        .data(areasData.points)
        .enter()
        .append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 1)
    console.log(data)

    let tooltip = d3.select(`.star_${sems}`)
        .append('div')
        .attr("class", "star_tooltip")

    tooltip.append('div')
        .attr("class", "star-tool")

    // d3.select("svg")
    //     .select(`.star_${sems}`)
    //     .selectAll("circle")
    //     .on("mouseover", function (d) {
    //         let str = ""
    //         Object.keys(data).forEach((key) => {
    //             str = str + `${key}: ${data[key]} \n`
    //         })
           
    //         const ttp = tooltip.select('.star-tool')
    //             // .html(`${data[keys[]].stype}: ${d[2].sdate} ${d[2].stime}`)
    //             ttp.html(str)
    //             ttp.style('display', 'block');
    //             ttp.style('opacity', 1);
    //     })
}

export default redarGraph