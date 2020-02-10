import React, { JSXElementConstructor, useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchArticles } from '../../reducer/actions';
import Header from './components/header'
import { createGlobalStyle } from 'styled-components';
import SideBar from './components/sidebar';
import  ToasNotifier from './components/toast-notifier';

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
        <ToasNotifier notification={notification}/> 
        <button style={{zIndex: 10, color: 'blue', position: 'absolute', left: '500px', top: '500px'}} onClick={async ()=>{
          const newData={message: "Ini adalah uji coba tapi jangan di coba-coba.", timeOut: 10000, type: "info", created_at: new Date+""};
          const newData2={message: "Ini adalah uji coba tapi jangan di coba-coba.", timeOut: 12000, type: "success", created_at: new Date+""};
          const newData3={message: "Ini adalah uji coba tapi jangan di coba-coba.", timeOut: 14000, type: "warning", created_at: new Date+""};
          const newData4={message: "Ini adalah uji coba tapi jangan di coba-coba.", timeOut: 15000, type: "danger", created_at: new Date+""};

          await setNotification([...notification, newData, newData2, newData3, newData4]);
          await setNotification([]);
        setTimeout(() => {
          console.log(notification.indexOf(newData),notification.indexOf(newData2))
          // setNotification(notification.splice(notification.indexOf(newData), 1))
          // setNotification(notification.splice(notification.indexOf(newData2), 1))
          // setNotification(notification.splice(notification.indexOf(newData3), 1))
          // setNotification([]);
        }, 1);
        }}>Yoa</button>
    </div>
  );
}
const mapStateToProps = (state:any) => (state);

const mapDispatchToProps = (dispatch:any) =>
    bindActionCreators({
      fetchArticles,
      
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);