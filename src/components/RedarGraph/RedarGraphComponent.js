import React, { Component } from 'react'
import redarGraph from './redarGraph'

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
            <div className="redarGraph" ref="redarGraph">
            </div>
        )
    }
    componentDidUpdate(){
        //因为RedarGraph的组件的Mount是在Person之前完成的，所以说获取数据的操作放在了DidUpdate里面
        let elem = this.refs.redarGraph
        let data = this.props.data

        redarGraph.initGraph(elem,data)
    }
}
export default RedarGraph