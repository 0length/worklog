import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { auth } from '../../../../reducer/user/actions'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Forgot from './Forgot'

import { createGlobalStyle } from 'styled-components'
import { AllMode } from '../../../../global-types'


const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Notable');
    body {
    font-family: 'Notable', sans-serif;
    }

    *, ::after, ::before {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }

    input:focus{
        outline: none;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
    // border: 1px solid green;
    -webkit-text-fill-color: black;
    // -webkit-box-shadow: 0 0 0px 1000px #000 inset;
    -webkit-box-shadow: none;
    transition: background-color 5000s ease-in-out 0s;
    }

    body {
        font-family: Poppins,Helvetica,sans-serif;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #212529;
        text-align: left;
    }

    body, html {
        font-size: 13px;
        font-weight: 300;
        font-family: Poppins,Helvetica,sans-serif;
    }

    body {
        color: #646c9a;
    }
    button,input{
        overflow: visible;
    }

    button, input, optgroup, select, textarea{
        margin: 0;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
    }

    .wl-login.wl-login--v6 .wl-login__aside .wl-login__wrapper .wl-login__container .wl-login__body {
        width: 100%;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }

    .wl-login__head{
        margin: 3rem 0;
        text-align: center
    }

    .wl-login__actions {
        margin: 3rem 0;
        text-align: center
    }

    .wl-login__account-link {
        cursor: pointer;
        font-weight: bold;
    }
`

const Auth: React.FC<any> = (props)=>{

    const {
        user
        } = props
    const {error} = user
    const [mode, setMode]= useState<string>('SignIn')
    const allMode: AllMode = {
        SignIn :    <SignIn setMode={setMode} auth={props.auth} error={error}/>,
        SignUp :    <SignUp setMode={setMode} auth={props.auth} error={error}/>,
        Forgot :    <Forgot setMode={setMode} auth={props.auth} error={error}/>
    }

    const setModeToDom = (modeWant: string)=>{
        return allMode[modeWant]
    }

    useEffect(()=>{
        setModeToDom(mode)
    }, [mode])

    return(
        <div
            className="wl-grid__item  wl-grid__item--order-tablet-and-mobile-2  wl-grid wl-grid--hor wl-login__aside"
            style={{
                flex: '0 0 auto',
                display: 'flex',
                flexDirection: 'column',
                padding: '2rem',
                background:'#fff',
                width: '600px',
        }}>
            <GlobalStyle />
            <div className="wl-login__wrapper" style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                padding: '2rem',
            }}>
                <div className="wl-login__container" style={{
                    flex: 1,
                    width: '400px',
                    margin: '0 auto',
                    display: 'flex',
                    WebkitBoxAlign: 'center',
                    alignItems: 'center',
                    paddingBottom: '5rem'
                }}>
                    <div className="wl-login__body" style={{
                        width: '100%',
                        flex: 1
                    }}>
                        <div className="wl-login__logo" style={{
                            margin: '3rem 0',
                            textAlign: 'center'
                        }}>
                            <a href="#">
                                logo
                            </a>
                        </div>
                        {
                            allMode[mode]
                        }
                    </div>
                </div>
                <div className="wl-login__account" style={{
                    textAlign: 'center',
                }}>
                    <span className="wl-login__account-msg">
                        Don't have an account yet ?
                    </span>&nbsp;&nbsp;
                    <a
                        onClick={()=>{mode === "SignIn"?setMode('SignUp'):setMode('SignIn')}}
                        id="kt_login_signup"
                        className="wl-login__account-link"
                    >
                        {mode === "SignUp"?"Sign In!":"Sign Up!"}
                    </a>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state: any) => (state)

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({
      auth
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Auth)