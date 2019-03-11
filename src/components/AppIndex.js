import React, { Component } from 'react';
import {actions as personalAction} from '../reducers/person'
const get_personal_records = personalAction.get_personal_records

import ZumaGraph from './zumaGraph/zumaComponent'
import AxisScatter from './axisScatter/axisScatterComponent'
import RedarGraph from './RedarGraph/RedarGraphComponent'
import style from './index.css'
import Counter from './Counter/Counter'


import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


export class AppIndex extends Component {
    render() {
        return (
            <div>
                {/* <ZumaGraph/>
                <AxisScatter/> */}
                {/* <Counter/> */}
                <RedarGraph/>
            </div>
        )
    }
    componentDidMount(){
        this.props.get_personal_records(12)
    }
}

function mapStateToProps(state){
    return {
        personal_records:state.person.personal_records
    }
}
function mapDispatchToProps(dispatch){
    return {
        get_personal_records:bindActionCreators(get_personal_records,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AppIndex)