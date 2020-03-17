import React from 'react'
import { createGlobalStyle } from "styled-components"
import DP from 'react-datepicker'
const DatePicker: React.FC<any>  = ({selected, onChange, className})=>{
return (<><LocalStyle /><DP selected={selected} onChange={(date)=>onChange(date)}/></>)
}
const LocalStyle = createGlobalStyle`

`
export default DatePicker