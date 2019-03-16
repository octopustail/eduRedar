import React, { Component } from 'react';
import {actions as personalAction} from '../reducers/person'
const get_personal_records = personalAction.get_personal_records

import Person from './containers/Person'
import SankeyGraph from  './sankeyGraph/SankeyGraphComponent'
import style from './index.css'
import Counter from './Counter/Counter'


import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


export class AppIndex extends Component {
    constructor(props){
        super(props)
        // 用state保存当前选中的学生，传给Person组件
        //state应该传一个回调给General组件，由General组件来更新。子组件与父组件的交流

        this.state = {
            selectStudent:""
        }
    }
    render() {
        return (
            <div>
                {/* <ZumaGraph/>
                <AxisScatter/> */}
                {/* <Counter/> */}
                <SankeyGraph/>
                
                <Person info = {this.state.selectStudent}/>
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