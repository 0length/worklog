import React from 'react'
import { createGlobalStyle } from "styled-components";

const LocalStyle = createGlobalStyle`
.wl-workdesk__container{
    position: absolute;
    padding-top: 2vh;
    padding-left: 2%;
    padding-right: 2%;
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
            color: #48465b;
            display: block;
            align-self: center;
            padding-left: 5vw;
        }

        & > .action {
            margin: 0 0 0 0;
        }
    }
}
`

const withLayout = (Page: React.FC<any>)=>(props: any)=>{
    const {title, action, data}= props
    return(<div className="wl-workdesk__container">
    <LocalStyle />
    <div className={"wl-workdesk__header"}>
    <span className="title">{title}</span>
    <span className={"action"}>
        {action}
    </span>
    </div>
    <Page {...{data}}/>
    </div>)
}


export default withLayout