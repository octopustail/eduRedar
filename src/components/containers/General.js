import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ParallelCoordinate from '../ParallelCoordinates/ParallelCoordinateComponents'
import SankeyGraph from '../sankeyGraph/SankeyGraphComponent'
import Heatmap from '../HeatmapGraph/HeatmapGraphComponent'

import { actions as generalAction } from '../../reducers/general'
const get_general_gpa_flow_record = generalAction.get_general_gpa_flow_record


class Genaral extends Component {
    constructor(props) {
        super(props)
    }

    onBrushSelected(param, instance) {
        console.log('brush event', param)
    }

    onChartClick(param, instance) {
        console.log('click', param)
    }

    render() {
        const onEvents = {
            onClick: this.onChartClick,
            onBrushSelected: this.onBrushSelected
        }
        return (
            <div>
                <Heatmap />
                <SankeyGraph data={this.props.data} />
                <ParallelCoordinate onEvents={onEvents} />
            </div>
        )
    }

    componentDidMount(){
        this.props.get_general_gpa_flow_record('type:any')
    }
}

function mapDispatchToProps(dispatch){
    return {
        get_general_gpa_flow_record:bindActionCreators(get_general_gpa_flow_record,dispatch)
    }
}
function mapStateToProps(state){
    return{
        general_gpa:state.general.general_gpa,
        general_flow:state.general.general_flow,
        general_records:state.general.general_records
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Genaral)