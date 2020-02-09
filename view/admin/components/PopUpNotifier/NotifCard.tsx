import React, { useEffect } from 'react'
import styled, { css, createGlobalStyle } from "styled-components";

const Container = styled(styled.div`
padding: 1rem 2rem;
margin: 0 0 20px 0;
border-radius: 4px;
background: #5867dd;
color: #fff;
border: 1px solid #5867dd;
${
    (props: any)=>
    props.styleProfile && props.styleProfile.type === "info" &&
        css`
        background: #2786fb;
        `
}

${
    (props: any)=>
    props.styleProfile && props.styleProfile.type === "success" &&
        css`
        background: #1dc9b7;
        `
}

${
    (props: any)=>
    props.styleProfile && props.styleProfile.type === "warning" &&
        css`
        background: #ffb822;
        `
}

${
    (props: any)=>
    props.styleProfile && props.styleProfile.type === "danger" &&
        css`
        background: #fd27eb;

        `
}
`)`
    &::after {
        position: absolute;
        left: 0;        
        content : "";
        margin-top: 2.02rem;
        border-bottom:2px solid #260026;
        border-bottom-left-radius: 4px;
        ${
            (props: any)=>
            props.styleProfile && props.styleProfile.type === "info" &&
                css`
                border-bottom:3px solid #034DA7;
                `
        }
        
        ${
            (props: any)=>
            props.styleProfile && props.styleProfile.type === "success" &&
                css`
                border-bottom:3px solid #159588;
                `
        }
        
        ${
            (props: any)=>
            props.styleProfile && props.styleProfile.type === "warning" &&
                css`
                border-bottom:3px solid #AA7300;

                `
        }
        
        ${
            (props: any)=>
            props.styleProfile && props.styleProfile.type === "danger" &&
                css`
                border-bottom:3px solid #A8029B;
        
                `
        }

${
    (props: any)=>
    props.id && props.styleProfile && props.styleProfile.timeOut &&
        css`
        width: var(--${props.id});
        transition: width ${props.styleProfile.timeOut}ms linear 0s;
        
        `
    }
}
}
`;
const Span = styled.span`
align-self: center;
flex-grow: 1;
`

const NotifCard: React.FC<any>=(props)=>{
    const {message, timeOut, type, removeMe, idx, created_at} = props
    const id = btoa((created_at+idx).replace(/ /g,"_"))
    let width = '100%'
    useEffect(()=>{
        const item = document.getElementById(id)

        setTimeout(()=>{
            item && item.setAttribute('style', `--${id}: 100%`);
            //   console.log(item)
        }, 10)
            
            setTimeout(()=>{
                item && item.setAttribute('style', `--${id}: 0%`);
                //  width = '0%'
            }, 100)

            setTimeout(()=>{
                // console.log(created_at)
            removeMe(id)
            }, timeOut)
    }, )

    // const GlobalStyle = createGlobalStyle`
    // // #${id}::before{
    //     --${id}:100%;
    // // }
    // `
    return (<span  className={"wl-popupnotifier__container-span"}>
    <Container id={id} {...{styleProfile: {type, timeOut}}}>
        {
        /* <GlobalStyle /> */
        }
    <Span>{message}</Span>  
    
    </Container></span>)
}

export default NotifCard