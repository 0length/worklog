import React, { JSXElementConstructor, useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from './components/header'
import { createGlobalStyle } from 'styled-components'
import { pushToast } from '../../reducer/toast/action'
import { startSubscribeWork } from '../../reducer/work/actions'
import { startSubscribePost } from '../../reducer/post/actions'
import SideBar from './components/sidebar'
import WorkDesk from './components/work-desk'
import BreadCrumbs from './components/bread-crumbs'
import { toastSuccess } from '../../lib/utils/toastModel'
import graphqlQuery from '../../lib/const/graphqlQuery'

export const App: React.FC<any> = (props)=>{
    const { user } = useSelector( (state: any) => (state) )
    const WELCOME_MESSAGE = "Welcome back Mr. "

  const GlobalStyle = createGlobalStyle`
  .wl-grid {
    display: flex;
    flex-direction: row;
  }

  .wl-icon {
    color: #b8bac3;
    transition: all .3s;
    font-weight: 100;
    -webkit-text-stroke: 0.05em white;
  }
  .wl-icon__color-white {
    color: white;
    // -webkit-text-stroke: 0.1em #b8bac3;
  }

  .tag {
    background: rgba(44, 44, 44, 0.07);
    display: inline-block;
    margin: 5px;
    border-radius: 4px;
    padding: 5px;
    color: black !important;
    font-family: Poppins,Helvetica,sans-serif;
    font-size: 13px;
    font-weight: 300;
    & > .wl-icon__close {
      margin: 0 5px;
      cursor: pointer;
    }

    & > .wl-icon__close:after {
      font-family:Flaticon2;
      font-style:normal;
      font-weight:400;
      font-variant:normal;
      line-height:1;
      text-decoration:inherit;
      text-rendering:optimizeLegibility;
      text-transform:none;
      -moz-osx-font-smoothing:grayscale;
      -webkit-font-smoothing:antialiased;
      font-smoothing:antialiased;
      content:"";
      font-size:.6rem;
      color:#a2a5b9;
     }
     & > .wl-icon__close:hover:after {
      color:#5B6079;
    }
  }

  .wl-invalid__feedback {
    display: block;
    width: 100%;
    margin-top: .25rem;
    margin-top: .15rem;
    font-size: 80%;
    color: #fd27eb;
  }



  `
  const dispatch = useDispatch()

  useEffect(()=>{
    if(user && user.userData){
      dispatch(startSubscribeWork(graphqlQuery.SUBSCRIBE_WORKS))
      dispatch(startSubscribePost(graphqlQuery.SUBSCRIBE_POSTS))
      dispatch(pushToast([toastSuccess(WELCOME_MESSAGE+user.userData.name)]))
    }
  }, [user.userData])

  return (
    <div className="App">
        <GlobalStyle />
        <Header />
        <SideBar  />
        <BreadCrumbs/>
        <WorkDesk />
    </div>
  )
}
export default App