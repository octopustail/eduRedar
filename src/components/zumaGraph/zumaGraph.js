import { zumaColor } from '../../config/config'
import * as d3 from 'd3'
let zumaGraph = {}

const start = 0
const end = 2.25
const width = 400
const height = 500
const numSpirals = 8
const margin = { top: 50, bottom: 50, left: 50, right: 50 }

let theta = function (r) {
    return numSpirals * Math.PI * r;
};

zumaGraph.create = function (el,dataArray) {
    // let svg = d3.select(el).append("svg")
    //     .attr("width", width)
    //     .attr("height", height)
    //     .append('g')
    //     .attr("transform", `translate(${width / 2},${height / 2})`)

    // this.update(el, svg)

    var color = d3.scaleOrdinal([zumaColor.food,zumaColor.library,zumaColor.shower]);
    let r = d3.min([width, height]) / 2;

    let radius = d3.scaleLinear()
        .domain([start, end])
        .range([0, r]);

    let svg = d3.select(el).append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    let points = d3.range(start, end + 0.001, (end - start) / 500);

    let spiral = d3.radialLine()
        .curve(d3.curveCardinal)
        .angle(theta)
        .radius(radius);

    let path = svg.append("path")
        .datum(points)
        .attr("id", "spiral")
        .attr("d", spiral)
        .style("fill", "none")
        .style("stroke", "none");

    let spiralLength = path.node().getTotalLength(),
        N = dataArray.length, //节点个数
        barWidth = (spiralLength / N) - 1;

    let timeScale = d3.scaleTime()
        .domain(d3.extent(dataArray, function (d) {
            return d.index;
        }))
        .range([0, spiralLength]);

    svg.selectAll("circle")
        .data(dataArray)
        .enter()
        .append("circle")
        .attr("x", function (d, i) {

            let linePer = timeScale(d.index);
            let posOnLine = path.node().getPointAtLength(linePer);
            d.linePer = linePer; // % distance are on the spiral
            d.cx = posOnLine.x; // x postion on the spiral
            d.cy = posOnLine.y; // y position on the spiral

            // d.a = (Math.atan2(angleOnLine.y, angleOnLine.x) * 180 / Math.PI) - 90; //angle at the spiral position

            return d.x;
        })
        .attr("cy", function (d) {
            return d.cy;
        })
        .attr("r", function (d) {
            return barWidth / 2;
        })
        .attr("cx", function (d) {
            return d.cx;
        })
        /* 所有节点有一个class，值为其sdate的值，在于将节点按日期分类 */
        .attr("class", function (d) {
            return d.sdate;
        })
        .style("fill", function (d) { return color(d.stype); })
        .style("opacity", 1)
        .style("stroke", "none")

    /* tooltip：悬浮信息显示 */
    let tooltip = d3.select(el)
        .append('div')
        .attr('class', 'tooltip');

    tooltip.append('div')
        .attr('class', 'date');
    tooltip.append('div')
        .attr('class', 'value');

    svg.selectAll("circle")
        .on('mouseover', function (d) {

            tooltip.select('.date').html("Date: <b>" + d.sdate + ' ' + d.stime + "</b>");
            tooltip.select('.value').html("Value: <b>" + d.stype + "<b>");

            d3.select(this)
                // .style("fill", "#FFFFFF")
                .style("stroke", "#000000")
                .style("stroke-width", "2px")
                .attr("r", barWidth / 1.5)


            let nodes = document.getElementsByClassName(this.getAttribute('class'))
            d3.selectAll(nodes)
                .style("stroke", '#ffffff')
                .style("stroke-width", "2px")

            tooltip.style('display', 'block');
            tooltip.style('opacity', 0.5);

        })
        .on('mousemove', function (d) {
            tooltip.style('top', (d3.event.layerY + 10) + 'px')
                .style('left', (d3.event.layerX - 25) + 'px');
        })
        .on('mouseout', function (d) {
            d3.selectAll("circle")
                .style("fill", function (d) { return color(d.stype); })
                .style("stroke", "none")
                .attr("r", barWidth / 2)
            let nodes = document.getElementsByClassName(this.getAttribute('class'))
            d3.selectAll(nodes)
                .style("opacity", 1)
                .style("stroke", "none")
            tooltip.style('display', 'none');
            tooltip.style('opacity', 0);
        });



}



export default zumaGraph