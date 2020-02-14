/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-10 20:35:13
 * @LastEditTime : 2020-02-11 19:14:25
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

import { actions as grouplAction } from '../../reducers/group'
const get_group_counts = grouplAction.get_group_counts,
    get_group_records = grouplAction.get_group_records,
    get_group_students = grouplAction.get_group_students,
    get_features = grouplAction.get_features
    

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
            }
        }
        this.colormap = zumaColor
    }
    handleToggleClick(item) {
        console.log('item', item, this.state.riverToggle)
        let toggle = this.state.riverToggle
        toggle[item] = !toggle[item]
        this.setState({
            riverToggle: toggle
        })
    }

    render() {
        const countsGroupByCateObj = {
            "A_A": [],
            "A_B": [],
            "A_C": [],
            "B_A": [],
            "B_B": [],
            "B_C": [],
            "C_A": [],
            "C_B": [],
            "C_C": [],
        }


        // if (this.props.counts.length !== 0) {
        //     this.props.counts.forEach(element => {
        //         countsGroupByCateObj[element.cate].push(element)
        //     });
        //     //把每一类的学生的学生人数保存起来，要传给riverGraph
        //     const studentsTotalObj = {}
        //     this.props.students.forEach((item) => {
        //         studentsTotalObj[item.cate] = item.list.length

        //     })
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
        // } else {
        //     return (<div className="general-container"></div>)

        // }
        return (
            <div className="general-container">
                {/* <HeatModelGraph data={this.props.features} /> */}
                <CalenderScatterComponent records={this.props.records} stuList = {this.props.stuList}/>
            </div>

        )
    }


    componentDidMount() {
        // this.props.get_group_students()
        // this.props.get_features(1)
        this.props.get_group_records([])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_group_counts: bindActionCreators(get_group_counts, dispatch),
        get_group_records: bindActionCreators(get_group_records, dispatch),
        get_group_students: bindActionCreators(get_group_students,dispatch),
        get_features: bindActionCreators(get_features,dispatch)
    }
}
function mapStateToProps(state) {
    return {
        counts: state.group.counts,
        records: state.group.records,
        students: state.group.students,
        features: state.group.features,
        stuList: state.group.stuList
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Group)