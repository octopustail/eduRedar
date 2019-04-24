import React from 'react'

export const ToggleButton = (props)=>(
    <div style={{color:props.color}} onClick={()=>{props.toggle(props.item)}}>
    {props.isToggle? props.item:"hide"}
    </div>
)