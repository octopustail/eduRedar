/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-16 20:01:19
 * @LastEditTime: 2020-02-26 09:58:24
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react';
import {actions as personalAction} from '../reducers/person'
const get_personal_records = personalAction.get_personal_records

import Person from './containers/Person'
import Group from './containers/Group'
import General from  './containers/General'
import style from './index.css'



import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


export class AppIndex extends Component {
    constructor(props){
        super(props)
        // 用state保存当前选中的学生，传给Person组件
        //state应该传一个回调给General组件，由General组件来更新。子组件与父组件的交流

        this.state = {
            selectStudent:"2911102035"
        }
    }

    handleSelectedId = (id)=>{
        this.setState({
            selectStudent:id
        })
    }
    render() {
        return (
            <div className="index">
                {/* <ZumaGraph/>
                <AxisScatter/> */}
                {/* <SankeyGraph/> */}
                <Group className="general"  
                handleSelectedId = {this.handleSelectedId}
                />
                {/* <General className ="general"/> */}
                <Person sid = {this.state.selectStudent}/>
            </div>
        )
    }
    // componentDidMount(){
        
    // }
}

function mapStateToProps(state){
    return {
        // 
    }
}
function mapDispatchToProps(dispatch){
    return {
        // get_personal_info:bindActionCreators(get_personal_info,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AppIndex)