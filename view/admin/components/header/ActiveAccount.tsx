import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled, { createGlobalStyle } from 'styled-components';
import { logout } from './../../../../reducer/user/actions'

const Wrapper = styled.div`
    display: flex;
    position: fixed;
    right: 3vw;
    top: 8vh;
    height: auto;
    max-width: 15vw;
    z-index: 97;
`
const Container = styled.div`
    margin-top:auto;
    display: flex;
    align-items: flex-end;
    flex-direction: column;

`
const LocalStyle = createGlobalStyle`
.wl-header__right-top-bg-liquid{
    position: fixed;
    z-index: 98;
    top: 5vh;
    right: 18.55px;
    transition: opacity 500ms linear 0s;
    opacity:0;
    stroke: 1px black
}

.slide-up {
    transition: opacity 500ms linear 0s;
    opacity: 100%;
  }

  .wl-header__right-active__account{
    background: #fff;
    position: fixed;
    top: 8vh;
    right: 25px;
    width: 335px;
    border: 1px solid #22B9FF;
    border-radius: 3px;
    ul {
        list-style: none;
        padding:0;
        margin:0;
        margin-top:30px;

        li{
            font-family: Poppins,Helvetica,sans-serif;
            // padding-left: 20px;
            min-height: 30px;
            text-align: center;
            border-bottom: 1px solid #80D6FF;
            
        }
        li:hover {

        
        }
        li:active{
            
        }
        li[static^="bottom"] {
            div{
                display: inline-block
                width: 40%;
            }
            div:hover{
                background: #80D6FF;
                cursor: pointer;
            }
        }
    }
  }
`
const ActiveAccount: React.FC<any> = (props)=>{
    
    // useEffect(()=>{
    //     let bgLiquid = document.getElementsByClassName('wl-header__right-top-bg-liquid')[0]
    //     bgLiquid.classList.toggle('slide-up', true)
    // }, [props.togggle])
    return (
        <Wrapper>
            <LocalStyle />
            <Container>
                {/*
                 <img className={"wl-header__right-top-bg-liquid "} src="/static/img/aa-curve.svg" alt=""/> 
                */}
                <div className={"wl-header__right-active__account"}>
                    <ul>
                        <li {...{static: "bottom"}}><div>about</div>|<div onClick={()=>{props.logout()}}><i className={"flaticon-logout"}/>&nbsp;&nbsp;&nbsp;logout</div></li>
                    </ul>
                </div>
            </Container>
        </Wrapper>
    )
}

const mapStateToProps = (state:any) => (state);

const mapDispatchToProps = (dispatch:any) =>
    bindActionCreators({
        logout
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ActiveAccount);