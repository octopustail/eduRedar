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
    }

    render() {
        return (
            //画出六个学期的图
            <div className="person">
                {/* {
                    this.props.personal_records.map((sems, index) => {
                        <RedarGraph key={index} data={sems} />
                    })
                } */}
                <div className="row">
                    <RedarGraph className="redar" data={this.props.personalRecord} sems = "sems1"/>
                    <RedarGraph className="redar" data={this.props.personalRecord} sems = "sems2"/>
                    <RedarGraph className="redar" data={this.props.personalRecord} sems = "sems3"/>
                </div>
                <div className="row">
                    <RedarGraph className="redar" data={this.props.personalRecord} sems = "sems4"/>
                    <RedarGraph className="redar" data={this.props.personalRecord} sems = "sems5"/>
                    <RedarGraph className="redar" data={this.props.personalRecord} sems = "sems6"/>
                </div>
            </div>
        )
    }
    componentDidMount() {
        //拿着学号去请求学生的record等信息
        // this.props.get_personal_records(this.props.info)
        this.props.get_personal_records("2904201011")
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