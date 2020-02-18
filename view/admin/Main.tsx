import React, { JSXElementConstructor, useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchArticles } from '../../reducer/actions';
import  App  from './App';
import  Auth  from './components/auth';
import { authSuccess, unauth, getUserData } from '../../reducer/user/actions';
import { startSubscribeWork } from '../../reducer/work/actions';
import ToastNotifier from './components/toast-notifier';
import localStorageKeys from '../../lib/const/localStorageKeys';
import LoadingBar from './components/loadingbar';




export const Main: React.FC<any> = (props)=>{
  let loadedToken: any, loadedUsername: any;
  const {
      user
    } = props;

  useEffect(()=>{
    loadedToken = window.localStorage.getItem(localStorageKeys.auth_token)
    loadedToken ? props.authSuccess({token:loadedToken}) : props.unauth()
  }, [])

  useEffect(()=>{
    if(typeof user.authToken==="string"){
      loadedUsername = window.localStorage.getItem(localStorageKeys.username)
      loadedUsername && props.getUserData(`{ user (username: "${atob(loadedUsername!)}") { username, email, password} } `)
    }
  }, [user.authToken])
  useEffect(()=>{
    user && user.userData?props.startSubscribeWork():null
  }, [user.userData])

  return (
    <>
    <LoadingBar />
        {user && user.userData ?<App />:<Auth />}
    </>
  );
}
const mapStateToProps = (state:any) => (state);

const mapDispatchToProps = (dispatch:any) =>
    bindActionCreators({
      authSuccess,
      unauth,
      getUserData,
      startSubscribeWork
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);