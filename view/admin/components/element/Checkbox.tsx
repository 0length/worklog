import React, { useState } from 'react'
import styled, { css } from 'styled-components'

const Label = styled.label`
    display: inline-block;
    position: relative;
    padding-left: 30px;
    margin-bottom: 10px;
    text-align: left;
    cursor: pointer;
    font-size: 1rem;
    transition: all .3s ease'
`

const Input = styled.input`
    position: absolute;
    z-index: -1;
    opacity: 0;
    box-sizing: border-box;
    padding: 0
`

const Span = styled.span`
        border-radius: 3px;
        background: 0 0;
        position: absolute;
        top: 1px;
        left: 0;
        height: 18px;
        width: 18px;
        border: 1px solid #d1d7e2;
        text-align: left;
        cursor: pointer;
        font-size: 1rem;
        box-sizing: border-box;
    ${(props: any)=>
        props.active && css`
        &:after {
            display: block;
            border: solid #bfc7d7;
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -3px;
            margin-top: -8px;
            width: 5px;
            height: 10px;
            border-width: 0 2px 2px 0 !important;
            -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
        }
        `
    }
`

const Checkbox: React.FC<any> = (props)=>{
    const [activate, setActivate] = useState<boolean>(false)

   return (
    <Label>
        <Input name={props.name} type="checkbox" {...{value: activate.toString()}}/><span onClick={()=>{setActivate(!activate)}}>{props.children}</span>
        <Span {...{active: activate}} onClick={()=>{setActivate(!activate)}}></Span>
    </Label>
    )
}
 
     
export default Checkbox