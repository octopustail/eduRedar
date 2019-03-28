import React, { Component } from 'react'
import style from './style.css'
// import Button from './Button'

class Filter extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (
            <div className="filter">
                {this.props.stuTypes.map((item, index) => (
                    // <Button getStudentGroup={(stuType) => this.props.getStudentGroup.bind(this,stuType)} key={index} stuType={item} />
                    //这里的this是Filter组件。getStudentGroup方法是在Filter组件的props中。但是当onClick调用的时候的this，却是div，因此要把父组件Filter的this绑定给自组件。
                    <div className="cate-button" onClick={this.props.getStudentGroup.bind(this,item)} key={index}>{item}</div>
                ))}

            </div>
        )
    }
}

export default Filter