import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import RiverGraph from '../graphs/RiverGraphComponent'
import BloomGragh from '../graphs/BloomGraghComponent'
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

        if (this.props.counts.length !== 0) {
            this.props.counts.forEach(element => {
                countsGroupByCateObj[element.cate].push(element)
            });

            console.log(countsGroupByCateObj)
            return (
                <div className="general-container">
                    {/* <BloomGragh students = {this.props.students}/> */}
                    {Object.keys(countsGroupByCateObj).map((item, index) => (
                        <RiverGraph key={index}  cate={item} counts={countsGroupByCateObj[item]} />
                            // <div key={index}>{countsGroupByCateObj[item]}</div>
                    ))}
                    {/* <RiverGraph counts={this.props.counts} /> */}
                    <RecordScatterGraph records={this.props.records} />
                </div>
            )
        }else{
            return (<div className="general-container"></div>)

        }
    }


    componentDidMount() {


        this.props.get_group_students()
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_group_counts: bindActionCreators(get_group_counts, dispatch),
        get_group_records: bindActionCreators(get_group_records, dispatch),
        get_group_students: bindActionCreators(get_group_students, dispatch)
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