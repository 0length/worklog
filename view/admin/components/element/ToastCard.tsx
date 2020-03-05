import React, { useEffect } from 'react'
import styled, { css, createGlobalStyle } from "styled-components"

let removeMeTimeout: any

const Container = styled(styled.div`
padding: 1rem 2rem 1rem 3rem ;
margin: 5px 0 0 0;
border-radius: 4px;
background: #5867dd;
color: #fff;
// border: 1px solid #5867dd;
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
        background: #FD397A;
        // #fd27eb;
        `
}
${
    (props: any)=>
    props.styleProfile && props.styleProfile.timeout === 0 &&
        css`
        padding: 0.5rem 1rem;
        `
}

`)`


    &::after {
        position: absolute;
        left: 0;
        content : "";
        margin-top: 2.03rem;
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
                border-bottom:3px solid #A80238;
                `
        }

        ${
            (props: any)=>
            props.id && props.styleProfile && props.styleProfile.timeOut &&
                css`
                width: var(--${props.id});
                opacity: var(--${props.id}opacity);
                transition: width ${props.styleProfile.timeOut}ms linear 0s;
                // transition: opacity 1000ms ease-out 3s;
                `
        }

    }
}
`
const Span = styled.span`
align-self: center;
flex-grow: 1;
position: relative;
`

const LocalStyle = createGlobalStyle`
.btn-close{
    position: absolute;
   display: flex;
   flex-direction: row;
   cursor: pointer;
   left: -2.75rem;
   top: -1rem;
   height: 100%;
   span {
    margin: 0;
   }
}
`
interface NotificationData {
    message: string
    timeOut: number
    type: string
    created_at: string
    removeMe?:  (id: string) => void
    idx: number
}
const ToastCard: React.FC<NotificationData>=(props)=>{
    let {message, timeOut, type, removeMe, idx, created_at} = props
    !created_at?created_at=new Date().toString():
    !idx.toString()?idx=Math.floor((Math.random() * 10)):
    !type?type="info":!message?message="Hi. I'm a Toast.":null
    const id = btoa((created_at+idx).replace(/ /g,"_"))

    const timer = ()=>{
        const item = document.getElementById(id)
        if(item){
            setTimeout(()=>{
                item.setAttribute('style', `--${id}: 100%`)
            }, 10)
            setTimeout(()=>{
                item.setAttribute('style', `--${id}: 0%`)
            }, 100)
        }

    }

    const close = ()=>{
        removeMe && removeMe(id)
    }
    useEffect(()=>{
        if(timeOut)
        {
            timer()
            removeMeTimeout = setTimeout(()=>{
                removeMe && removeMe(id)
            }, timeOut+500)
        }
    }, [])

    const cancelTimeOut = ()=>{
        clearTimeout(removeMeTimeout)
        const item = document.getElementById(id)
        item && item.setAttribute('style', `transition: none;`)
    }

    return (<span>
        <LocalStyle />
        {/* <i className="flaticon-warning"></i> &nbsp; */}

    <Container id={id} {...{styleProfile: {type, timeOut}}} onMouseEnter={()=>cancelTimeOut()}>
         <Span>
             {message}
             { removeMe && <div className="btn-close" onClick={()=>close()}><span>&times;</span></div>}
         </Span>
    </Container>

    </span>)
}

export default ToastCard