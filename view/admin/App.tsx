import React, { JSXElementConstructor, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from './components/header'
import { createGlobalStyle } from 'styled-components'
import { pushToast } from '../../reducer/toast/action'
import { startSubscribeWork } from '../../reducer/work/actions'
import { startSubscribePost } from '../../reducer/post/actions'
import SideBar from './components/sidebar'
import WorkDesk from './components/work-desk'
import BreadCrumbs from './components/bread-crumbs'
import ToastNotifier from './components/toast-notifier'
import { toastSuccess } from '../../lib/utils/toastModel'

export const App: React.FC<any> = (props)=>{
    const { user } = props
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
    color: #62605a !important;
}
  `

  useEffect(()=>{
    if(user && user.userData){
      props.startSubscribeWork({"id":"1","type":"start","payload":{"variables":{},"extensions":{},"operationName":null,"query":"subscription {\n  works {\n   name, website, social_links, long_desc, author_name, interisting_count, img_url, completed_at, client, simple_caption, p}\n}\n"}})
      props.startSubscribePost({"id":"1","type":"start","payload":{"variables":{},"extensions":{},"operationName":null,"query":"subscription {\n  posts {\n   title, p, author_name, img_url, text_content, published_at, view_cont, interisting_count, social_links }\n}\n"}})
      props.pushToast([toastSuccess(WELCOME_MESSAGE+user.userData.name)])
    }
  }, [user.userData])

  return (
    <div className="App">
        <GlobalStyle />
        <Header />
        <SideBar  />
        <BreadCrumbs/>
        <WorkDesk />
        <ToastNotifier />
    </div>
  )
}
const mapStateToProps = (state:any) => (state)

const mapDispatchToProps = (dispatch:any) =>
    bindActionCreators({
      startSubscribeWork,
      startSubscribePost,
      pushToast,
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)