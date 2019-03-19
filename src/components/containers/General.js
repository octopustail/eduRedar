import React,{Component} from 'react'
import ParallelCoordinate from '../ParallelCoordinates/ParallelCoordinateComponents'
import SankeyGraph from '../sankeyGraph/SankeyGraphComponent'
import Heatmap from '../HeatmapGraph/HeatmaoGraphComponent'

class Genaral extends Component{
    constructor(props){
        super(props)
    }

    onBrushSelected(param,instance) {
        console.log('brush event', param)
    }

    onChartClick(param,instance){
        console.log('click',param)
    }

    render(){
        const onEvents = {
            onClick:this.onChartClick,
            onBrushSelected: this.onBrushSelected
        }
        return(
            <div>
            <Heatmap/>
            <SankeyGraph/>
            <ParallelCoordinate onEvents={onEvents}/>
            </div>
        )
    }
}

export default Genaral