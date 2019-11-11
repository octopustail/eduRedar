/*
 * @Description: 用于数据实验的模版barChart
 * @Author: your name
 * @Date: 2019-03-17 15:34:31
 * @LastEditTime: 2019-10-17 10:27:04
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
        if(!data) {return []}
        let d = data,
        dataGroup = [],
        stype = data.stype;

        d.forEach((item)=>{
            //parseInt应该在父亲函数位置处理。
            dataGroup.push([parseInt(item["2009-2010_1"]),parseInt(item["2009-2010_2"]),parseInt(item["2010-2011_1"]),parseInt(item["2010-2011_2"]),parseInt(item["2011-2012_1"]),parseInt(item["2011-2012_2"])])
        })
        const xData = []
        const shower = []
        const food = []
        const lib = []
        const hotwater = []
        d.forEach(e => {
            xData.push(e.sid)
            shower.push(e.size_shower)
            food.push(e.size_food)
            lib.push(e.size_library)
            hotwater.push(e.size_hotwater)
        })
        
        return {xData, shower,lib, hotwater,food}
        

    }
    getOption = (ori_data) => {
        // const schema = [
        //     { name: 'sems1', index: 0, text: 'sems1' },
        //     { name: 'sems2', index: 1, text: 'sems2' },
        //     { name: 'sems3', index: 2, text: 'sems3' },
        //     { name: 'sems4', index: 3, text: 'sems4' },
        //     { name: 'sems5', index: 4, text: 'sems5' },
        //     { name: 'sems6', index: 5, text: 'sems6' },

        // ];

        // const lineStyle = {
        //     normal: {
        //         width: 1,
        //         opacity: 0.8
        //     }
        // };

        const data = this.dataFormate(ori_data)
        return {
            color: ["#ffda8e","#80d4f6","#CE6D39","#fffff5"],
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    label: {
                        show: true
                    }
                }
            },
            // toolbox: {
            //     show : true,
            //     feature : {
            //         mark : {show: true},
            //         dataView : {show: true, readOnly: false},
            //         magicType: {show: true, type: ['line', 'bar']},
            //         restore : {show: true},
            //         saveAsImage : {show: true}
            //     }
            // },
            calculable : true,
            legend: {
                data:['shower', 'food', 'library','hotwater'],
                itemGap: 5,
                textStyle: {
                    color: '#fff'
                }
            },
            grid: {
                top: '12%',
                left: '1%',
                right: '10%',
                containLabel: true
            },
            xAxis: [
                {
                    type : 'category',
                    data : data.xData,
                    color: "#aaa",
                    axisLabel:{
                        color: '#fff'
                    }
                }
            ],
            yAxis: [
                {
                    type : 'value',
                    name : '一学期总次数',
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
                }
            ],
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
            series : [

                {
                    name: 'food',
                    type: 'bar',
                    data: data.food,
                    stack: "stack1"
                },                
                {
                    name: 'shower',
                    type: 'bar',
                    data: data.shower,
                    stack: "stack1"
                },
                {
                    name: 'hotwater',
                    type: 'bar',
                    data: data.hotwater,
                    stack: "stack1"
                },
                {
                    name: 'library',
                    type: 'bar',
                    data: data.lib,
                    stack: "stack1"
                }
            ]
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


