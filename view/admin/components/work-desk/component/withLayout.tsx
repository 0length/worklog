import React, { useState } from 'react'
import { createGlobalStyle } from "styled-components"
import { ActivityModeProps, ActivityPageProps } from '../../../../../global-types'

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
            font-size: 2rem;
            font-weight: 500;
            color: #212529;
            display: block;
            align-self: center;
            padding-left: 0.5vw;
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

.activity-controls {
    margin: 0;
    position: relative;
    // top: 14px;
    // margin-left: -2px;/
    z-index: 2;
}
`

const withLayout = (Page: React.FC<ActivityPageProps>)=>(props: ActivityModeProps)=>{
    const {title, action: defaultAction, mode, instanceOf, generic }= props
    const [action, setAction] = useState(defaultAction)

    return(<div className="wl-workdesk__container">
        <div className="activity-controls">
            <svg xmlns="http://www.w3.org/2000/svg"
                width="54"
                height="14"
                viewBox="0 0 54 14"
            >
                <g
                    fill="none"
                    fillRule="evenodd"
                    transform="translate(1 1)"
                >
                    <circle
                        cx="6"
                        cy="6"
                        r="6"
                        fill="#FF5F56"
                        stroke="#E0443E"
                        strokeWidth=".5"
                    />
                    <circle
                        cx="26"
                        cy="6"
                        r="6"
                        fill="#FFBD2E"
                        stroke="#DEA123"
                        strokeWidth=".5"
                    />
                    <circle
                        cx="46"
                        cy="6"
                        r="6"
                        fill="#27C93F"
                        stroke="#1AAB29"
                        strokeWidth=".5"
                    />
                </g>
            </svg>
        </div>
        <LocalStyle />
        <div className={"wl-workdesk__header"}>
            <span key={"wl_lyt__work-title"} className="title">{title}</span>
            <span key={"wl_lyt__work-action"} className={"action"}>
                {action}
            </span>
        </div>
        <Page {...{mode, instanceOf, generic, setAction}}/>
    </div>)
}


export default withLayout