/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-16 20:01:19
 * @LastEditTime: 2019-09-23 20:37:26
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { InputNumber, Button} from 'antd'

import ParallelCoordinate from '../ParallelCoordinates/ParallelCoordinateComponents'
import SankeyGraph from '../sankeyGraph/SankeyGraphComponent'
import Heatmap from '../HeatmapGraph/HeatmapGraphComponent'
import Filter from './Filter'
import RiverGraph from '../graphs/RiverGraphComponent'
// import BloomGragh from '../graphs/BloomGraghComponent'
import RecordScatterGraph from '../graphs/RecordScatterGraph'

import { actions as generalAction } from '../../reducers/general'
const get_general_gpa_flow_record = generalAction.get_general_gpa_flow_record
const get_student_group   = generalAction.get_student_group
const get_student_list = generalAction.get_student_list
import style from './style.css'

class Genaral extends Component {
    constructor(props) {
        super(props)
        this.selectedData = []
        this.state = {
            start: 1,
            end: 20,
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
        this.handleQuery()
        // this.props.get_general_gpa_flow_record('',"2900101002")
    }
    
    onBrushSelected = (param, instance) => {
        console.log('brush event', param)
    }

    onChartClick = (param, instance) => {
        console.log('click', param)

    }

    handleStartChange = (value) => {
        this.setState({
            start: value
        })
    }

    handleEndChange = (value) => {
        this.setState({
            end:value
        })
    }

    handleQuery = ()=>{
        const params = {
            start: this.state.start,
            end: this.state.end,
            sortBy: this.sems[0]
        }
        console.log(params.sortBy)
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


                </div>
                <div className="row">
                    <Heatmap className="heatmap" data={this.props.general_records} />
                    <ParallelCoordinate classNsme="parallel" data={this.props.general_gpa} />
                </div> */}
                <div>
                    <span>No.<InputNumber onChange={this.handleStartChange} defaultValue={1}/>To No.</span><InputNumber onChange={ this.handleEndChange }defaultValue={3}/>
                    <Button onClick={this.handleQuery}>查询</Button>
                </div>
                <ParallelCoordinate classNsme="parallel" data={this.props.general_gpa} />
                
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
        get_student_list: bindActionCreators(get_student_list,dispatch)
    }
}
function mapStateToProps(state) {
    return {
        general_gpa: state.general.general_gpa,
        general_ae: state.general.general_ae,
        general_records: state.general.general_records,
        student_group: state.general.student_group,
        student_type:state.general.student_type,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Genaral)