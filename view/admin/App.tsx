import React, { JSXElementConstructor, useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './components/header'
import { createGlobalStyle } from 'styled-components';
import { pushToast } from '../../reducer/toast/action';
import { startSubscribeWork } from '../../reducer/work/actions';
import SideBar from './components/sidebar';
import WorkDesk from './components/work-desk';
import BreadCrumbs from './components/bread-crumbs';
import ToastNotifier from './components/toast-notifier';
import { toastSuccess } from '../../lib/utils/toastModel';

export const App: React.FC<any> = (props)=>{
const { user } = props
    const [notification, setNotification] = useState<Array<any>>([])
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

  `;

  useEffect(()=>{
    if(user && user.userData){
      props.startSubscribeWork({"id":"1","type":"start","payload":{"variables":{},"extensions":{},"operationName":null,"query":"subscription {\n  works {\n   name, website, social_links, long_desc, author_name, interisting_count, img_url, completed_at, client, simple_caption, p}\n}\n"}})
      props.pushToast([toastSuccess(WELCOME_MESSAGE+user.userData.name)])
    }
  }, [user.userData])
  
  // useEffect(()=>{
    

    // notification.pop()
    // notification.push({message: "Ini adalah uji coba tapi jangan di coba-coba.", timeOut: 3000, type: "danger", created_at: new Date+""})
  //    useEffect(()=>{
  //   setTimeout(()=>{notification.push({message: "Ini adalah uji coba tapi jangan di coba-coba.", timeOut: 3000, type: "danger", created_at: new Date+""})}, 1000)
  // }, [notification])
    
  return (
    <div className="App">
        <GlobalStyle />
        <Header />
        <SideBar  />
        <BreadCrumbs/>
        <WorkDesk />
        <ToastNotifier />
    </div>
  );
}
const mapStateToProps = (state:any) => (state);

const mapDispatchToProps = (dispatch:any) =>
    bindActionCreators({
      startSubscribeWork,
      pushToast,
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);