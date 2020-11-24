import React from 'react'
import { createGlobalStyle } from "styled-components"
import DP, { ReactDatePickerProps } from 'react-datepicker'

const DatePicker: React.FC<ReactDatePickerProps>  = (props)=>{
return (<><LocalStyle /><DP {...props} selected={props.selected} onChange={props.onChange}/></>)
}
const LocalStyle = createGlobalStyle`

`
export default DatePicker