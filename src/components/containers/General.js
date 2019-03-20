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
        this.selectedData = []
    }

    onBrushSelected(param, instance) {
        console.log('brush event', param)
    }

    onChartClick(param, instance) {
        console.log('click', param)
    }

    selecteData(data) {

        let t = data.stype,
            d = data.result;
        if (!d) { return [] }

        const filterFunc = {
            'good': (item) => {
                let ave = (parseFloat(item['sems1']) + parseFloat(item['sems2']) + parseFloat(item['sems3'])).toFixed(2) / 3
                return (ave >= 85)
            },
            'normal': (item) => {
                let ave = (parseFloat(item['sems1']) + parseFloat(item['sems2']) + parseFloat(item['sems3'])).toFixed(2) / 3
                return (ave < 85 && ave >= 60)
            },
            'protential': (item) => {
                let ave = (parseFloat(item['sems1']) + parseFloat(item['sems2']) + parseFloat(item['sems3'])).toFixed(2) / 3
                return (ave < 60)
            }
        }
        return { result:d.filter(filterFunc[t]),stype:t}
    }

    render() {
        const onEvents = {
            onClick: this.onChartClick,
            onBrushSelected: this.onBrushSelected
        }
        return (
            <div>
                <Heatmap />
                <SankeyGraph data={this.selecteData(this.props.general_gpa)} />
                <ParallelCoordinate data={this.selecteData(this.props.general_gpa)} />
            </div>
        )
    }

    componentDidMount() {
        this.props.get_general_gpa_flow_record('type:any')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_general_gpa_flow_record: bindActionCreators(get_general_gpa_flow_record, dispatch)
    }
}
function mapStateToProps(state) {
    return {
        general_gpa: state.general.general_gpa,
        general_flow: state.general.general_flow,
        general_records: state.general.general_records
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Genaral)