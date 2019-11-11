/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-16 20:01:19
 * @LastEditTime: 2019-10-22 11:06:44
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { InputNumber, Button, Input} from 'antd'

import ParallelCoordinate from '../ParallelCoordinates/ParallelCoordinateComponents'
import SankeyGraph from '../sankeyGraph/SankeyGraphComponent'
import Heatmap from '../HeatmapGraph/HeatmapGraphComponent'
import Filter from './Filter'
import RiverGraph from '../graphs/RiverGraphComponent'
// import BloomGragh from '../graphs/BloomGraghComponent'
import RecordScatterGraph from '../graphs/RecordScatterGraph'
import BarChart from '../graphs/BarCharts'
import MathHeatmap from '../graphs/HeatMap'

import { actions as generalAction } from '../../reducers/general'
const get_general_gpa_flow_record = generalAction.get_general_gpa_flow_record
const get_student_group   = generalAction.get_student_group
const get_student_list = generalAction.get_student_list
const get_student_record_analyze = generalAction.get_student_record_analyze
const get_student_math = generalAction.get_student_math
import style from './style.css'

class Genaral extends Component {
    constructor(props) {
        super(props)
        this.selectedData = []
        this.state = {
            start: 1,
            end: 10,
        }
        this.sems = [
            "2009-2010_1",
            "2009-2010_2",
            "2010-2011_1",
            "2010-2011_2",
            "2011-2012_1",
            "2011-2012_2",    
        ]
    }
    componentDidMount() {
        // this.props.get_student_group('unio_exStu')
        // this.handleQuery()
        this.props.get_general_gpa_flow_record('',"2900101002")
        this.props.get_student_record_analyze()
        this.props.get_student_math()
    }
    
    onBrushSelected = (param, instance) => {
        console.log('brush event', param)
    }

    onChartClick = (param, instance) => {
        console.log('click', param)

    }

    handleStartChange = (e) => {
        this.setState({
            start: e.target.value
        })
    }

    handleEndChange = (e) => {
        this.setState({
            end:e.target.value
        })
    }

    handleQuery = ()=>{
        const params = {
            start: this.state.start,
            end: this.state.end,
            sortBy: this.sems[0]
        }
        this.props.get_student_list(params.start,params.end,params.sortBy)
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
        return { result: d.filter(filterFunc['good']), stype: t }
    }

    render() {
        const onEvents = {
            onClick: this.onChartClick,
            onBrushSelected: this.onBrushSelected
        }
        const stuTypes = ['real_exStu','real_lowStu','real_midStu','unio_exStu','unio_midStu','unio_lowStu','pre_exStu','pre_midStu','pre_lowStu']
        return (
            <div className="general-container">
                {/* <div className="row">
                    <Filter className="filter" getStudentGroup={this.props.get_student_group} stuTypes = {stuTypes}/>
                    <SankeyGraph className="sankey" data={this.props.general_gpa} />


                </div> */}
                {/* <div className="row"> */}
                    <MathHeatmap className="heatmap" data={this.props.student_math} sorted_id ={this.props.general_gpa} />
                    <BarChart className="heatmap" data={this.props.student_record_analyze} />
                    {/* <Heatmap className="heatmap" data={this.props.general_records} /> */}
                    {/* <ParallelCoordinate classNsme="parallel" data={this.props.general_gpa} /> */}
                {/* </div> */}
                <div>
                    <Input onChange={this.handleStartChange} defaultValue={1} />
                    <Input onChange={ this.handleEndChange } defaultValue={3}/>
                    <Button onClick={this.handleQuery}>查询</Button>
                </div>
                <ParallelCoordinate className="parallel" data={this.props.general_gpa} />
                
                {/* <RiverGraph records={this.props.general_records}/>
                <RecordScatterGraph records={this.props.general_records}/> */}
                {/* <BloomGragh /> */}
            </div>
        )
    }
    


}

function mapDispatchToProps(dispatch) {
    return {
        get_general_gpa_flow_record: bindActionCreators(get_general_gpa_flow_record, dispatch),
        get_student_group:bindActionCreators(get_student_group,dispatch),
        get_student_list: bindActionCreators(get_student_list,dispatch),
        get_student_record_analyze: bindActionCreators(get_student_record_analyze,dispatch),
        get_student_math: bindActionCreators(get_student_math,dispatch)
    }
}
function mapStateToProps(state) {
    return {
        general_gpa: state.general.general_gpa,
        general_ae: state.general.general_ae,
        general_records: state.general.general_records,
        student_group: state.general.student_group,
        student_type:state.general.student_type,
        student_record_analyze:state.general.student_record_analyze,
        student_math:state.general.student_math
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Genaral)