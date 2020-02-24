/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-03-16 16:41:07
 * @LastEditTime : 2020-02-24 20:25:49
 * @LastEditors  : Please set LastEditors
 */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RedarGraph from '../RedarGraph/RedarGraphComponent'
import { actions as personalAction } from '../../reducers/person'
const get_personal_records = personalAction.get_personal_records
import style from './style.css'
import MathLineChart from '../graphs/MathLineChart';

class Person extends Component {
    constructor(props) {
        super(props)
        //    this.sems = ['sems1', 'sems2', 'sems3', 'sems4', 'sems5', 'sems6']
        this.sems = ['sems1', 'sems2']
    }

    render() {
        const {stu_school,wtype} = this.props.work_info
        return (
            //画出六个学期的图
            <div className="person">
                <div>
                    <MathLineChart data={this.props.math}/>
                </div>
                <div className="info">>
                    <span>studentID:{this.props.sid?this.props.sid:'unknown' }</span>
                    <span>School:{stu_school?stu_school:'unknown'}</span>
                    <span>Type:{wtype?wtype:'unknown'}</span>
                </div>
                <div className="redar-container">
                    {/* {
                    this.props.personal_records.map((sems, index) => {
                        <RedarGraph key={index} data={sems} />
                    })
                } */}
                    {
                        this.sems.map((sem, index) => (
                            <RedarGraph className="redar" key={index} data={this.props.personalRecord[index]} sems={sem} feature={this.props.personalFeatures} />
                        ))}
                </div>
            </div>
        )
    }
    componentDidMount() {
        //拿着学号去请求学生的record等信息
        // this.props.get_personal_records(this.props.info)
        this.props.get_personal_records(this.props.sid)
    }

    // shouldComponentUpdate(nextProps){
    // if(nextProps.info == this.props.info){
    //   return false
    // }
    // return true
    // }


    // componentDidUpdate() {
    // this.props.info && this.props.get_personal_records(this.props.info)
    // }
}

function mapStateToProps(state) {
    return {
        personalRecord: state.person.personal_records,
        personalFeatures: state.person.personal_features,
        math: state.person.math,
        work_info: state.person.work_info
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_personal_records: bindActionCreators(get_personal_records, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Person)