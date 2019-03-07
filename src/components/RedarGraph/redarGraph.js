import * as d3 from 'd3'
import style from './style.css'
import { color } from 'd3';

let redarGraph = {}

redarGraph.initGraph = function (el) {
    //MaxMin时间要转化成分钟的相对时间 MaxDay:一学期的总天数，应该用相对时间计算获
    const MaxMin = 60 * 24
    const MaxDay = 200
    const width = 500
    const height = 500
    const margin = 100
    const radius = Math.min(height, height) / 2

    let data = [[3, 133],
    [480, 80], [0, 0], [180, 199]]

    const angle = d3.scaleLinear()
        .domain([0, MaxMin])
        .range([0, 2 * Math.PI])

    const r = d3.scaleLinear()
        .domain([0, MaxDay])
        .range([0, radius])

    let svg = d3.select(el).append("svg")
        .attr("width", width+margin)
        .attr("height", height+margin)
        .append("g")
        .attr("transform", `translate(${(width+margin)/2},${(height+margin)/2})`);
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
        .attr("x", radius+6)
        .attr("dy", ".35em")
        .style("text-anchor", function (d) { return d < 270 && d > 90 ? "end" : null; })
        .attr("transform", function (d) {
            console.log(d)
            return d < 270 && d > 90 ? "rotate(180 " + (radius + 6) + ",0)" : null;
        })
        .text(function (d, i) { 
            console.log(d,i)
            return i * 3 + ":00" });

    let line = d3.radialLine()
        .angle(function (d) {
            return angle(d[0])
        })
        .radius(function (d) {
            return r(d[1])
        })

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    svg.selectAll("point")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "point")
        .attr("transform", function (d) {
            const coors = line([d]).slice(1).slice(0, -1);
            return `translate(${coors})`
        })
        .attr("r", 8)
        .attr("fill", function (d, i) {
            return color(i)
        })
}

export default redarGraph