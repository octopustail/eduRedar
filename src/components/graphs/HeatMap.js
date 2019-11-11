/*
 * @Description: 用于数据实验的模版barChart
 * @Author: your name
 * @Date: 2019-03-17 15:34:31
 * @LastEditTime: 2019-11-11 16:28:56
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/parallel'
import 'echarts/lib/component/parallelAxis'

import ReactEcharts from 'echarts-for-react';


// 还可以引入节流函数
export default class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: '100%',
            height: '100%',
            //mockData
        }
        this.echartsElement = null
    }

    dataFormate=(data)=>{
        let _arr = []
        this.props.sorted_id.forEach(element => {
            (!_arr.includes(element.sid)) && _arr.push(element.sid)
        
        })
        let scores =[]
        let ids = []
        let _index = 0
         _arr.forEach((element) => {
            let el = data.find((elem)=> elem.sid === element )
            if(el!== undefined){
                scores.push([0,_index, el.linear.midium])
                scores.push([1,_index, el.cal1.midium])
                scores.push([2,_index, el.cal1.final])
                scores.push([3,_index, el.linear.final])
                scores.push([4,_index, el.cal2.midium])
                scores.push([5,_index, el.cal2.final])
                scores.push([6,_index, el.pro.midium])
                scores.push([7,_index, el.pro.final])
                _index++
                ids.push(el.sid)
            }
            
        })
        console.log(scores,ids)
        return {scores, ids}
    }
    getOption = (ori_data) => {

        const {scores, ids} = this.dataFormate(ori_data)

        let days = ['linear.midium', 'cal1.midium', 'cal1.final',
                'linear.final', 'cal2.midium', 'cal2.final', 'pro.midium', 'pro.final'];

        // let data = [[0,0,5],[0,1,1],[0,2,0],[0,3,0],[0,4,0],[0,5,0],[0,6,0],[0,7,0],[0,8,0],[0,9,0],[0,10,0],[0,11,2],[0,12,4],[0,13,1],[0,14,1],[0,15,3],[0,16,4],[0,17,6],[0,18,4],[0,19,4],[0,20,3],[0,21,3],[0,22,2],[0,23,5],[1,0,7],[1,1,0],[1,2,0],[1,3,0],[1,4,0],[1,5,0],[1,6,0],[1,7,0],[1,8,0],[1,9,0],[1,10,5],[1,11,2],[1,12,2],[1,13,6],[1,14,9],[1,15,11],[1,16,6],[1,17,7],[1,18,8],[1,19,12],[1,20,5],[1,21,5],[1,22,7],[1,23,2],[2,0,1],[2,1,1],[2,2,0],[2,3,0],[2,4,0],[2,5,0],[2,6,0],[2,7,0],[2,8,0],[2,9,0],[2,10,3],[2,11,2],[2,12,1],[2,13,9],[2,14,8],[2,15,10],[2,16,6],[2,17,5],[2,18,5],[2,19,5],[2,20,7],[2,21,4],[2,22,2],[2,23,4],[3,0,7],[3,1,3],[3,2,0],[3,3,0],[3,4,0],[3,5,0],[3,6,0],[3,7,0],[3,8,1],[3,9,0],[3,10,5],[3,11,4],[3,12,7],[3,13,14],[3,14,13],[3,15,12],[3,16,9],[3,17,5],[3,18,5],[3,19,10],[3,20,6],[3,21,4],[3,22,4],[3,23,1],[4,0,1],[4,1,3],[4,2,0],[4,3,0],[4,4,0],[4,5,1],[4,6,0],[4,7,0],[4,8,0],[4,9,2],[4,10,4],[4,11,4],[4,12,2],[4,13,4],[4,14,4],[4,15,14],[4,16,12],[4,17,1],[4,18,8],[4,19,5],[4,20,3],[4,21,7],[4,22,3],[4,23,0],[5,0,2],[5,1,1],[5,2,0],[5,3,3],[5,4,0],[5,5,0],[5,6,0],[5,7,0],[5,8,2],[5,9,0],[5,10,4],[5,11,1],[5,12,5],[5,13,10],[5,14,5],[5,15,7],[5,16,11],[5,17,6],[5,18,0],[5,19,5],[5,20,3],[5,21,4],[5,22,2],[5,23,0],[6,0,1],[6,1,0],[6,2,0],[6,3,0],[6,4,0],[6,5,0],[6,6,0],[6,7,0],[6,8,0],[6,9,0],[6,10,1],[6,11,0],[6,12,2],[6,13,1],[6,14,3],[6,15,4],[6,16,0],[6,17,0],[6,18,0],[6,19,0],[6,20,1],[6,21,2],[6,22,2],[6,23,6]];

        let data = scores.map(function (item) {
            return [item[1], item[0], item[2] || '-'];
        });
        

        return {
            tooltip: {
                position: 'top',
                formatter: (params)=>{
                    let res = `学号：${params.name}
                    成绩：${params.data[2]}  
                    排名：${params.data[0]+1}
                    `
                    return res
                }
            },
            animation: false,
            grid: {
                height: '50%',
                y: '10%'
            },
            xAxis: {
                type: 'category',
                data: ids,
                color: "#aaa",
                    axisLabel:{
                        color: '#fff'
                    }
            },
            yAxis: {
                type: 'category',
                data: days,
                nameTextStyle:{
                    color: "#fff",
                    align: 'left'
                },
                axisLabel: {
                    color:'#fff',
                    // formatter: function (a) {
                    //     a = +a;
                    //     return isFinite(a)
                    //         ? echarts.format.addCommas(+a / 1000)
                    //         : '';
                    // }
                }
            },
            visualMap: {
                // type: 'piecewise',
                type: 'continuous',
                min: 0,
                max: 100,
                calculable: true,
                color: ['#d94e5d','#eac736','#50a3ba'],
                orient: 'horizontal',
                left: 'center',
                bottom: '15%',
                textStyle:{
                    color: "#fff"
                }
                // pieces:[
                //     {gt: 90},            // (1500, Infinity]
                //     {gt: 80, lte: 90},  // (900, 1500]
                //     {gt: 70, lte: 80},  // (310, 1000]
                //     {gt: 60, lte: 70},
                //     {gt: 55, lte: 60},
                //     {gt: 50, lte: 55},
                //     {gt: 45, lte: 50},
                //     {gt: 40, lte: 45},
                //     {gt: 35, lte: 40},
                //     {gt: 35, lte: 40},
                //     {gt: 30, lte: 35},
                //     {gt: 25, lte: 30},
                //     {gt: 20, lte: 25},
                //     {gt: 15, lte: 25},
                //     {gt: 10, lte: 15},
                //     {lte: 10}   
                // ]

            },
            dataZoom: [
                {
                    show: true,
                    start: 0,
                    end: 100
                },
                {
                    type: 'inside',
                    start: 0,
                    end: 100
                },
                {
                    show: true,
                    yAxisIndex: 0,
                    filterMode: 'empty',
                    width: 30,
                    height: '80%',
                    showDataShadow: false,
                    left: '93%'
                }
            ],
            series: [{
                name: 'Math Grade',
                type: 'heatmap',
                data: data,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
    }

    render() {
        return (
            <div className="parallel">
                <ReactEcharts option = {this.getOption(this.props.data)} style = {{height:500,width:1300}} />
            </div>
        )
    }
}
