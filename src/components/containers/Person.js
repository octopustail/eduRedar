import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RedarGraph from '../RedarGraph/RedarGraphComponent'
import { actions as personalAction } from '../../reducers/person'
const get_personal_records = personalAction.get_personal_records
import style from './style.css'

class Person extends Component {
    constructor(props) {
        super(props)
       this.sems = ['sems1', 'sems2', 'sems3', 'sem4', 'sem5', 'sem6']

    }

    render() {
        return (
            //画出六个学期的图
            <div className="person">
            <div className="redar-container">
                {/* {
                    this.props.personal_records.map((sems, index) => {
                        <RedarGraph key={index} data={sems} />
                    })
                } */}
                {
                    this.sems.map((sem, index) => (
                        <RedarGraph className="redar" key={index} data={this.props.personalRecord[index]} sems ={sem} />
                    ))}
                </div>
            </div>
        )
    }
    componentDidMount() {
        //拿着学号去请求学生的record等信息
        // this.props.get_personal_records(this.props.info)
        this.props.get_personal_records("2904302008")
    }
    componentDidUpdate() {
    }
}

function mapStateToProps(state) {
    return {
        personalRecord: state.person.personal_records
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_personal_records: bindActionCreators(get_personal_records, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Person)