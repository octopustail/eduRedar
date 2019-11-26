/*
 * @Author: your name
 * @Date: 2019-04-16 17:30:59
 * @LastEditTime: 2019-11-26 16:59:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /eduRedar/src/components/graphs/widgets/RiverToggleButton.js
 */
import React from 'react'
const btnStyle = {
    
}

export const ToggleButton = (props)=>(
    <div style={{color:props.color,width:150,cursor:"pointer", marginLeft:20, marginTop:20}} onClick={()=>{props.toggle(props.item)}}>
    <div style={{width:30, height:20, marginRight:15, float:"left", borderRadius:4, background:props.color }}></div> {props.isToggle? props.item:"hide"}
    </div>
)