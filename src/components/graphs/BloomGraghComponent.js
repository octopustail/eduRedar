import React,{Component} from 'react'
import * as d3 from 'd3'

export default class BloomGraph extends Component{
    constructor(props){
        super(props)
        this.width = 400
        this.height = 400
    }
    drawGraph(){
        
    }
    render(){
        return (
            <svg width={this.width} height={this.height} ref={elem => this.svg = d3.select(elem)}>

            </svg>
        )
    }

    componentDidMount(){
        this.drawGraph()
    }
    // componentDidUpdate(){
    //     if(JSON.stringify(this.props.stuCates)!= "{}"){
    //         this.drawGraph()
    //     }
    // }
}