import React, { Component } from 'react'
import redarGraph from './redarGraph'
import style from './style.css'

class RedarGraph extends Component {
    constructor(props) {
        super(props)

    }

    // componentDidMount() {
    //     //请求数
    //     //渲染视图
    //     let elem = this.refs.redarGraph
    //     let data = this.props.data

    //     redarGraph.initGraph(elem,data)
    // }

    render() {
        return (
            <div className="redar">
                <div ref="redarGraph">
                </div>
                <div style={{ color: "#fff", width: 100,textAlign:"center",fontSize:9,fontWeight:200}}>{this.props.sems}</div>
            </div>
        )
    }
    componentDidUpdate() {
        //因为RedarGraph的组件的Mount是在Person之前完成的，所以说获取数据的操作放在了DidUpdate里面
        let elem = this.refs.redarGraph
        let data = this.props.data

        redarGraph.initGraph(elem, data)
    }
}
export default RedarGraph