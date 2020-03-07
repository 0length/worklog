import React from 'react'
import { createGlobalStyle } from "styled-components"

const LocalStyle = createGlobalStyle`
.wl-workdesk__container{
    position: absolute;
    padding-top: 2vh;
    padding-left: 2%;
    padding-right: 2%;
    padding-bottom: 2rem;
    border: 1px solid #ebedf2;
    background: #fff;
    box-shadow: 0 0 40px 0 rgba(82,63,105,.1);
    border-radius: 4px;
    width: 96%;
    & > .wl-workdesk__header{
        display: flex;
        justify-content: space-between;
        margin: 2vh 0;
        & > .title {
            font-family: Poppins,Helvetica,sans-serif;
            font-size: 1.2rem;
            font-weight: 500;
            color: #212529;
            display: block;
            align-self: center;
            padding-left: 2.5vw;
        }

        & > .action {
            margin: 0 0 0 0;
        }
    }
}


.table {
    font-size: 13px;
    font-weight: 300;
    font-family: Poppins,Helvetica,sans-serif;
    border-collapse: initial !important;
    border-spacing: 0 !important;
    width: 100%;
    border: 1px solid #ebedf2;
    border-radius: 4px;
}

.table td, .table th{
    padding: 6px;
    font-weight: 500;
    border: 1px solid #ebedf2;
    border-bottom-width: 1px;
    border-left-width: 1px;
    padding: .75rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-left-width: 0;
    box-sizing: content-box;
}

.table tr:nth-child(even){background-color: #fafbfc;}

.table tr:hover {
    color: #212529;
    background: #F4F7F9;
}

.table th{
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    color: #212529;
    cursor: pointer;
    position: relative;
    vertical-align: middle;
    border-bottom: 2px solid #ebedf2;
    border-bottom-width: 2px;
    text-transform: capitalize;
}
.table tr td {
    font-weight: 300;
    color: #595d6e;
    border-top-width: 0px;
    border-bottom-width: 1px;
}

.text {
    font-size: 11px;
}

.longtext {
    font-size: 8px;
}
`

const withLayout = (Page: React.FC<any>)=>(props: any)=>{
    const {title, action, data, instanceOf}= props
    return(<div className="wl-workdesk__container">
    <LocalStyle />
    <div className={"wl-workdesk__header"}>
    <span key={"wl_lyt__work-title"} className="title">{title}</span>
    <span key={"wl_lyt__work-action"} className={"action"}>
        {action}
    </span>
    </div>
    <Page {...{data, instanceOf}}/>
    </div>)
}


export default withLayout