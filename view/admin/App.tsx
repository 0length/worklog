import React, { JSXElementConstructor, useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchArticles } from '../../reducer/actions';
import Header from './components/header'
import { createGlobalStyle } from 'styled-components';
import SideBar from './components/sidebar';
import WorkDesk from './components/work-desk';
import BreadCrumbs from './components/bread-crumbs';
import ToastNotifier from './components/toast-notifier';

export const App: React.FC<any> = (props)=>{

    const [notification, setNotification] = useState<Array<any>>([])

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
      fetchArticles,
      
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);