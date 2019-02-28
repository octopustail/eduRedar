import React, { Component } from 'react';
import zumaGraph from './zumaGraph'
import $ from 'jquery'
import style from './style.css'

class ZumaGraph extends Component {

    componentDidMount() {
        let el = this.refs.zuma
        const dataArray = this.getDatafromJsonFile(el)
        
    }

    componentDidUpdate() {
        let el = this.refs.zuma
    }

    // processdata(data) {
    //     nodeData = []
    //     Object.keys(data).forEach(function (key) {
    //         Object.keys(data[key]).forEach(function (item) {
    //             // console.log(data[key][item])
    //             itemArray = data[key][item]
    //             for (var i = 0; i < itemArray.length; i++) {
    //                 itemArray[i][0].date = new Date(itemArray[i][0].sdate + ' ' + itemArray[i][0].stime)
    //                 nodeData.push(itemArray[i][0])
    //             }

    //         })
    //     })
    //     return nodeData
    // }
    getDatafromJsonFile(el) {
       $.getJSON('./record.json').done(function (data) {
            function processdata(data) {
                let nodeData = []
                Object.keys(data).forEach(function (key) {
                    Object.keys(data[key]).forEach(function (item) {
                        // console.log(data[key][item])
                        let itemArray = data[key][item]
                        for (var i = 0; i < itemArray.length; i++) {
                            itemArray[i][0].date = new Date(itemArray[i][0].sdate + ' ' + itemArray[i][0].stime)
                            nodeData.push(itemArray[i][0])
                        }

                    })
                })
                return nodeData
            }
            function sortedByProps(props) {
                return function (obj1, obj2) {
                    var value1 = obj1[props]
                    var value2 = obj2[props]
                    return value1 - value2
                }
            }

            
            let dataObjArray = processdata(data)
            let dataObjArraySorted = dataObjArray.sort(sortedByProps('date'))
            dataObjArraySorted.map(function (item, index) {
                item.index = index
            })
            zumaGraph.create(el, dataObjArraySorted)
        })
    }
    render() {
        return (
            <div className="Zuma" ref="zuma" ></div>
        )
    }
}

export default ZumaGraph