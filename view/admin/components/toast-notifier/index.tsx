import React, { useState, useEffect } from 'react'
import styled, { css, createGlobalStyle } from 'styled-components'
import {ToastCard} from '../element'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const Wrapper = styled.div`
    display: flex;
    position: fixed;
    right: 10px;
    bottom: 10px;
    height: auto;
    max-width: 15vw;
    z-index: 100000;
`
const Container = styled.div`
margin-top:auto;
display: flex;
align-items: flex-end;
flex-direction: column;
`


interface ToastNotificationData {
    message: string;
    timeOut: number;
    type: string;
    created_at: string;
}
interface ToastNotifDomData{
    [key: string]: JSX.Element;
}
interface ToastNotifierProps{
    notification: Array<ToastNotificationData>
}
//todo connect redux store Toast
const ToastNotifier: React.FC<any> = (props)=>{
    const notification = props.toast.data
    const [notifDom, setNotifDom] = useState<ToastNotifDomData>({})
    const removeMe = (key: string)=> {
        let temp = notifDom
        delete temp[key]
        lastLength = lastLength-1
        return setNotifDom({...temp})
    }

        let lastLength=0 

    useEffect(()=>{
        // if(lastLength<notification.length){
            notification.map((item: any, idx: any)=>{
            //    console.log(item)
                const {message, timeOut, type, created_at} = item
                const id = btoa((created_at+idx).replace(/ /g,"_"))
                // let temp: any=notifDom
                notifDom[id]=<ToastCard key={id} {...{removeMe, message, timeOut, type, idx, created_at}}/>
                // setNotifDom({...temp})
            })
        //     lastLength = notification.length
        //     // console.log('after', lastLength)
        // }
        
        // console.log(notification.length)
    }, [notification])


    return(<>{
    Object.keys(notifDom).length>0 &&
    <Wrapper className="wl-toast-notifier__wrapper">
                <Container>
                    {
                    Object.keys(notifDom).map((item)=>notifDom[item])
                    }
                </Container>
            </Wrapper>}
    </>)
}
const mapStateToProps = (state:any) => (state);

const mapDispatchToProps = (dispatch:any) =>
    bindActionCreators({
    }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ToastNotifier)

