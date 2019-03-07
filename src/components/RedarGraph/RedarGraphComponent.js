import React,{Component} from 'react'
import redarGraph from './redarGraph'

class RedarGraph extends Component{
    componentDidMount(){
        //请求数
        //渲染视图
        let elem = this.refs.redarGraph
        redarGraph.initGraph(elem)    
    }

    render(){
        return(
            <div  className= "redarGraph" ref = "redarGraph"></div>
        )
    }
}
export default RedarGraph