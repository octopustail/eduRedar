import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ParallelCoordinate from '../ParallelCoordinates/ParallelCoordinateComponents'
import SankeyGraph from '../sankeyGraph/SankeyGraphComponent'
import Heatmap from '../HeatmapGraph/HeatmapGraphComponent'

import { actions as generalAction } from '../../reducers/general'
const get_general_gpa_flow_record = generalAction.get_general_gpa_flow_record
const get_student_group   = generalAction.get_student_group
import style from './style.css'
import { resolve } from 'path';

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
        return { result: d.filter(filterFunc[t]), stype: t }
    }

    render() {
        const onEvents = {
            onClick: this.onChartClick,
            onBrushSelected: this.onBrushSelected
        }
        return (
            <div className="general-container">
                <div className="row">
                    <div className ="filter"></div>
                    <SankeyGraph className="sankey" data={this.selecteData(this.props.general_gpa)} />


                </div>
                <div className="row">
                    <Heatmap className="heatmap" data={this.props.general_records} />
                    {/* <ParallelCoordinate classNsme="parallel" data={this.selecteData(this.props.general_gpa)} /> */}
                    <ParallelCoordinate classNsme="parallel" data={this.props.general_gpa} />
                </div>
            </div>
        )
    }
    

    componentDidMount() {


        this.props.get_student_group('type:any')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_general_gpa_flow_record: bindActionCreators(get_general_gpa_flow_record, dispatch),
        get_student_group:bindActionCreators(get_student_group,dispatch)
        
    }
}
function mapStateToProps(state) {
    return {
        general_gpa: state.general.general_gpa,
        general_flow: state.general.general_flow,
        general_records: state.general.general_records,
        student_group: state.general.student_group,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Genaral)