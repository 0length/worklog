import React, { useState, useEffect, useCallback } from 'react'
import styled, { css, createGlobalStyle } from 'styled-components'
import NotifCard from './NotifCard'

const Wrapper = styled.div`
    display: flex;
    position: fixed;
    left: 10px;
    bottom: 10px;
    height: 40vh;
    width: 30vw;
    z-index: 100000;
`
const Container = styled.div`
margin-top:auto;
display: flex;
align-items: flex-end;
flex-direction: column;
`

const GlobalStyle = createGlobalStyle`
wl-popupnotifier__container-span{
}
`;

interface PopUpNotificationData {
    message: string;
    timeOut: number;
    type: string;
    created_at: string;
}
interface PopUpNotifDomData{
    [key: string]: JSX.Element;
}

const PopUpNotifier: React.FC<any> = ({notification})=>{
    const [notifDom, setNotifDom] = useState<PopUpNotifDomData>({})
    
    const removeMe = (key: string)=> {
        let temp = notifDom
        delete temp[key]
        return setNotifDom({...temp})
    }


        let lastLength=0 

    useEffect(()=>{
        if(lastLength<notification.length){
            notification.map((item: any, idx: any)=>{
               console.log(item)
                const {message, timeOut, type, created_at} = item
                let temp: any=notifDom
                temp[btoa((created_at+idx).replace(/ /g,"_"))]=<NotifCard key={created_at+idx} {...{removeMe, message, timeOut, type, idx, created_at}}/>
                setNotifDom({...temp})
            })
            lastLength=notification.length
        }

    }, [notification])


    return(<Wrapper className="wl-popupnotifier__wrapper" >
        <GlobalStyle />
        <Container>
            {
            Object.keys(notifDom).map((item)=>notifDom[item])
            }
        </Container>
    </Wrapper>)
}

export default PopUpNotifier
