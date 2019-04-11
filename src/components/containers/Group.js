import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import RiverGraph from '../graphs/RiverGraphComponent'
// import BloomGragh from '../graphs/BloomGraghComponent'
import RecordScatterGraph from '../graphs/RecordScatterGraph'

import { actions as grouplAction } from '../../reducers/group'
const get_group_counts = grouplAction.get_group_counts,
    get_group_records = grouplAction.get_group_records,
    get_group_students = grouplAction.get_group_students

import style from './style.css'

class Group extends Component {
    constructor(props) {
        super(props)
        this.selectedData = []
    }

    render() {
        return (
            <div className="general-container">

                <RiverGraph get_counts={this.props.get_group_counts} />
                <RecordScatterGraph records={this.props.general_records} />
            </div>
        )
    }


    componentDidMount() {


        this.props.get_group_students()
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_group_counts: bindActionCreators(get_group_counts, dispatch),
        get_group_records: bindActionCreators(get_group_records, dispatch),
        get_group_students: bindActionCreators(get_group_students,dispatch)
    }
}
function mapStateToProps(state) {
    return {
        counts: state.group.counts,
        records: state.group.records,
        students: state.group.students
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Group)