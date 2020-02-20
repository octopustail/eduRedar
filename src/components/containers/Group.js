/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-10 20:35:13
 * @LastEditTime : 2020-02-20 19:56:59
 * @LastEditors  : Please set LastEditors
 */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import RiverGraph from '../graphs/RiverGraphComponent'
import BloomGraph from '../graphs/BloomGraghComponent'
import RecordScatterGraph from '../graphs/RecordScatterGraph'
import General from '../containers/General'
import HeatModelGraph from '../HeatmapGraph/HeatmapModel'
import CalenderScatterComponent from '../calendarScatterGraph/calenderScatterComponent'
import { ToggleButton } from '../graphs/widgets/RiverToggleButton'
import { Radio } from 'antd'
import { actions as grouplAction } from '../../reducers/group'
import { actions as generalAction } from '../../reducers/general'

const get_group_counts = grouplAction.get_group_counts,
    get_group_records = grouplAction.get_group_records,
    get_group_students = grouplAction.get_group_students,
    get_features = grouplAction.get_features,
    get_student_gpa = generalAction.get_student_gpa,
    get_general_ae = generalAction.get_general_ae



import style from './style.css'
import { zumaColor } from '../../config/config'

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
            grade: "29",
            flag: 3
        }
        this.colormap = zumaColor
    }

    componentDidMount() {
        const { grade, sems, flag } = this.state
        this.props.get_group_counts(grade, flag)
        this.props.get_features(grade, flag)
        this.props.get_group_records(grade, sems, flag)
        this.props.get_student_gpa(grade, flag)
        this.props.get_general_ae(grade, flag)
        // this.props.get_group_students(grade, flag)
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

    handleSubmit = () => {
        const { grade, sems, flag } = this.state
        this.props.get_group_records(grade, sems, flag)
        this.props.get_features(grade, flag)
        this.props.get_student_gpa(grade, flag)
        this.props.get_general_ae(grade, flag)
    }


    render() {
        // const countsGroupByCateObj = {
        //     "A_A": [],
        //     "A_B": [],
        //     "A_C": [],
        //     "B_A": [],
        //     "B_B": [],
        //     "B_C": [],
        //     "C_A": [],
        //     "C_B": [],
        //     "C_C": [],
        // }


        // if (this.props.counts.length !== 0) {
        //     this.props.counts.forEach(element => {
        //         countsGroupByCateObj[element.cate].push(element)
        //     });
        //     //把每一类的学生的学生人数保存起来，要传给riverGraph
        //     const studentsTotalObj = {}
        //     this.props.students.forEach((item) => {
        //         studentsTotalObj[item.cate] = item.list.length

        //     })
        return (
            <div className="general-container">
                <div>
                    <div>
                        <Radio.Group name="grade" defaultValue="29" onChange={this.handleRadioGroupChange}>
                            <Radio value="29">Grade 2009</Radio>
                            <Radio value="2010">Grade 2010</Radio>
                        </Radio.Group>
                        <Radio.Group name="sems" defaultValue="sems1" onChange={this.handleRadioGroupChange}>
                            <Radio value="sems1">sems1</Radio>
                            <Radio value="sems2">sems2</Radio>
                        </Radio.Group>
                        <Radio.Group name="flag" defaultValue={0} onChange={this.handleRadioGroupChange}>
                            <Radio value={0}>00</Radio>
                            <Radio value={1}>01</Radio>
                            <Radio value={2}>10</Radio>
                            <Radio value={3}>11</Radio>
                        </Radio.Group>
                        <button onClick={this.handleSubmit}>submit</button>
                    </div>
                </div>
                {/* <div>
                        <div className="riverToggle">
                            {Object.keys(this.state.riverToggle).map((item, index) => (
                                <ToggleButton key={index} item={item} isToggle={this.state.riverToggle[item]} toggle={this.handleToggleClick.bind(this)} color={this.colormap[item]} />
                            ))}
                        </div>
                        {Object.keys(countsGroupByCateObj).map((item, index) => (
                            <RiverGraph key={index} isToggles={this.state.riverToggle} cate={item} counts={countsGroupByCateObj[item]} totalStu={studentsTotalObj[item]} />
                        ))}
                    </div> */}
                <div>
                    <div className="riverToggle">
                        {Object.keys(this.state.riverToggle).map((item, index) => (
                            <ToggleButton key={index} item={item} isToggle={this.state.riverToggle[item]} toggle={this.handleToggleClick.bind(this)} color={this.colormap[item]} />
                        ))}
                    </div>
                    {(JSON.stringify(this.props.dayCount) !== '{}') ?
                        <RiverGraph
                            isToggles={this.state.riverToggle}
                            stuList={this.props.stuList}
                            counts={this.props.dayCount}
                            startDate={this.props.startDate}
                            endDate={this.props.endDate}
                        />
                        : null}

                </div>
                <HeatModelGraph data={this.props.features} />
                <CalenderScatterComponent records={this.props.records} stuList={this.props.stuList} />
                <General
                    className="general"
                    handleParallelSelectedId={this.props.handleParallelSelectedId}
                    student_gpa={this.props.student_gpa}
                    general_ae={this.props.general_ae}
                />}
            </div>

        )
        //     return (
        //         <div className="group-container">
        //             {/* <BloomGraph students={this.props.students} />
        //             <div>
        //                 <div className="riverToggle">
        //                 {Object.keys(this.state.riverToggle).map((item, index) => (
        //                     <ToggleButton key={index} item={item} isToggle={this.state.riverToggle[item]} toggle={this.handleToggleClick.bind(this)} color={this.colormap[item]} />
        //                 ))}
        //                 </div>
        //                 {Object.keys(countsGroupByCateObj).map((item, index) => (
        //                     <RiverGraph key={index} isToggles={this.state.riverToggle} cate={item} counts={countsGroupByCateObj[item]} totalStu={studentsTotalObj[item]} />
        //                 ))}
        //             </div>
        //             <General className ="general"  handleParallelSelectedId = {this.props.handleParallelSelectedId}/> */}


        //             {/* <RecordScatterGraph records={this.props.records} /> */}

        //         </div>
        //     )
        // } 
        // else {
        // return (<div className="general-container"></div>)

        // }

        // return (
        //     <div className="general-container">
        //         <div>
        //             <div>
        //                 <Radio.Group name="grade" defaultValue="29" onChange={this.handleRadioGroupChange}>
        //                     <Radio value="29">Grade 2009</Radio>
        //                     <Radio value="2010">Grade 2010</Radio>
        //                 </Radio.Group>
        //                 <Radio.Group name="sems" defaultValue="sems1" onChange={this.handleRadioGroupChange}>
        //                     <Radio value="sems1">sems1</Radio>
        //                     <Radio value="sems2">sems2</Radio>
        //                 </Radio.Group>
        //                 <Radio.Group name="flag" defaultValue={0} onChange={this.handleRadioGroupChange}>
        //                     <Radio value={0}>00</Radio>
        //                     <Radio value={1}>01</Radio>
        //                     <Radio value={2}>10</Radio>
        //                     <Radio value={3}>11</Radio>
        //                 </Radio.Group>
        //                 <button onClick={this.handleSubmit}>submit</button>
        //             </div>
        //         </div>
        //         {/* <div>
        //             <div className="riverToggle">
        //                 {Object.keys(this.state.riverToggle).map((item, index) => (
        //                     <ToggleButton key={index} item={item} isToggle={this.state.riverToggle[item]} toggle={this.handleToggleClick.bind(this)} color={this.colormap[item]} />
        //                 ))}
        //             </div>
        //             {Object.keys(countsGroupByCateObj).map((item, index) => (
        //                 <RiverGraph key={index} isToggles={this.state.riverToggle} cate={item} counts={countsGroupByCateObj[item]} totalStu={studentsTotalObj[item]} />
        //             ))}
        //         </div> */}
        //         <HeatModelGraph data={this.props.features} />
        //         <CalenderScatterComponent records={this.props.records} stuList={this.props.stuList} />
        //         <General
        //             className="general"
        //             handleParallelSelectedId={this.props.handleParallelSelectedId}
        //             student_gpa={this.props.student_gpa}
        //         />}
        //     </div>

        // )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        //获取学生刷卡次数统计
        get_group_counts: bindActionCreators(get_group_counts, dispatch),
        get_group_records: bindActionCreators(get_group_records, dispatch),
        get_group_students: bindActionCreators(get_group_students, dispatch),
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
        students: state.group.students,
        features: state.group.features,
        stuList: state.group.stuList,
        dayCount: state.group.dayCount,
        startDate: state.group.startDate,
        endDate: state.group.endDate
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Group)