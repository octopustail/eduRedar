/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-10 20:35:13
 * @LastEditTime: 2020-03-04 21:29:46
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import RiverGraph from '../graphs/RiverGraphComponent'
import BloomGraph from '../graphs/BloomGraghComponent'
import RecordScatterGraph from '../graphs/RecordScatterGraph'
import General from '../containers/General'
import Person from '../containers/Person'
import CateSunburstGraph from '../graphs/CateSunburstComponent'
import RiverWithEchartsComponent from '../graphs/RiverWithEchartsComponent'
import HeatModelGraph from '../HeatmapGraph/HeatmapModel'
import CalenderScatterComponent from '../calendarScatterGraph/calenderScatterComponent'
import FeatureParallelCoordinate from '../ParallelCoordinates/FeatureParallelCoordinateComponents'
import { ToggleButton } from '../graphs/widgets/RiverToggleButton'
import { Radio, Button } from 'antd'
import { actions as grouplAction } from '../../reducers/group'
import { actions as generalAction } from '../../reducers/general'

const
    // get_group_counts = grouplAction.get_group_counts,
    get_group_records = grouplAction.get_group_records,
    get_group_students = grouplAction.get_group_students,
    get_features = grouplAction.get_features,
    get_student_gpa = generalAction.get_student_gpa,
    get_general_ae = generalAction.get_general_ae



import style from './style.css'
import { zumaColor } from '../../config/config'
import { tupleNum } from 'antd/lib/_util/type';

class Group extends Component {
    constructor(props) {
        super(props)
        this.selectedData = []
        this.state = {
            riverToggle: {
                food: true,
                shower: true,
                hotwater: true,
                library: true
            },
            sems: "sems1",
            grade: 29,
            flag: 3,
        }
        this.colormap = zumaColor
    }

    componentDidMount() {
        const { grade, sems, flag } = this.state
        // this.props.get_group_counts(grade, flag)
        // this.props.get_group_students()
        this.props.get_features(grade, flag)
        this.props.get_group_records(grade, sems, flag)
        // this.props.get_student_gpa(grade, flag)
        // this.props.get_general_ae(grade, flag)
    }

    handleToggleClick(item) {
        let toggle = this.state.riverToggle
        toggle[item] = !toggle[item]
        this.setState({
            riverToggle: toggle
        })
    }

    handleRadioGroupChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSunburstChange = (grade, flag) => {
        this.setState({
            grade: grade,
            flag: flag
        })
    }


    handleSubmit = () => {
        const { grade, sems, flag } = this.state
        this.props.get_group_records(grade, sems, flag)
        this.props.get_features(grade, flag)
        this.props.get_student_gpa(grade, flag)
        this.props.get_general_ae(grade, flag)
    }


    render() {
        let flag
        if (JSON.stringify(this.state.flag) === "0") flag = "TN"
        if (JSON.stringify(this.state.flag) === "1") flag = "FN"
        if (JSON.stringify(this.state.flag) === "2") flag = "FP"
        if (JSON.stringify(this.state.flag) === "3") flag = "TP"
        return (
            <div className="general-container">

                <div className="sunbrust">
                    <div className="item-wrapper sems-contral">
                        <Radio.Group name="sems" defaultValue="sems1" onChange={this.handleRadioGroupChange}>
                            <div className="sunbrust-span"> SelecteGroup: {this.state.grade == 2010 ? 2010 : 2009}</div>
                            <div className="sunbrust-span"> Type: {flag}</div>
                            <Radio value="sems1">sems1</Radio>
                            <Radio value="sems2">sems2</Radio>
                        </Radio.Group>

                        <Button className="control-item" onClick={this.handleSubmit}>submit</Button>
                    </div>
                    <CateSunburstGraph handleEvent={this.handleSunburstChange} />
                    <HeatModelGraph handleSelectedId={this.props.handleSelectedId} data={this.props.features} />

                </div>
                <div className="two-rows">
                    <div className="grow-row">
                        <FeatureParallelCoordinate handleSelectedId={this.props.handleSelectedId} data={this.props.features} />
                        <RiverWithEchartsComponent counts={this.props.dayCount} startDate={this.props.startDate} endDate={this.props.endDate} />
                        <CalenderScatterComponent records={this.props.records} stuList={this.props.stuList} />
                    </div>
                    <Person sid={this.props.sid} />
                </div>

                {/* <General
                    className="general"
                    handleParallelSelectedId={this.props.handleParallelSelectedId}
                    student_gpa={this.props.student_gpa}
                    general_ae={this.props.general_ae}
                /> */}

            </div>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        //获取学生刷卡次数统计
        // get_group_counts: bindActionCreators(get_group_counts, dispatch),
        get_group_records: bindActionCreators(get_group_records, dispatch),
        // get_group_students: bindActionCreators(get_group_students, dispatch),
        get_features: bindActionCreators(get_features, dispatch),
        get_student_gpa: bindActionCreators(get_student_gpa, dispatch),
        get_general_ae: bindActionCreators(get_general_ae, dispatch),
    }
}
function mapStateToProps(state) {
    return {
        general_ae: state.general.general_ae,
        student_gpa: state.general.student_gpa,
        counts: state.group.counts,
        records: state.group.records,
        features: state.group.features,
        stuList: state.group.stuList,
        dayCount: state.group.dayCount,
        startDate: state.group.startDate,
        endDate: state.group.endDate,
        // math_grades: state.group.math_grades,
        // all_students: state.group.all_students,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Group)