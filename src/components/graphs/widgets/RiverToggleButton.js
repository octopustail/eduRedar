import React from 'react'

export const ToggleButton = (props)=>(
    <div style={{color:"white"}} onClick={()=>{props.toggle(props.item)}}>
    {props.isToggle? "show":"hide"}
    </div>
)