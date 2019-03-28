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
                    <div className="cate-button" onClick={this.props.getStudentGroup.bind(this,item)} key={index}>{item}</div>
                ))}

            </div>
        )
    }
}

export default Filter