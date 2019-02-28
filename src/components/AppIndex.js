import React, { Component } from 'react';
import ZumaGraph from './zumaGraph/zumaComponent'
import AxisScatter from './axisScatter/axisScatterComponent'
import style from './index.css'

export class AppIndex extends Component {
    render() {
        return (
            <div>
                <ZumaGraph/>
                <AxisScatter/>
            </div>
        )
    }
}
