import React, { JSXElementConstructor, useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchArticles } from '../../reducer/actions';
import  App  from './App';
import  Auth  from './components/auth';
import { authSuccess, unauth, getUserData } from '../../reducer/user/actions';




export const Main: React.FC<any> = (props)=>{
  let loadedToken: any, loadedUsername: any;
  const {
      user
    } = props;

  useEffect(()=>{
    loadedToken = window.localStorage.getItem('WORKLOG://User/auth_token')
    loadedToken ? props.authSuccess({token:loadedToken}) : props.unauth()
  }, [])

  useEffect(()=>{
    if(typeof user.authToken==="string"){
      loadedUsername = window.localStorage.getItem('WORKLOG://User/data/username')
      loadedUsername && props.getUserData(`{ user (username: "${atob(loadedUsername!)}") { username, email, password} } `)
    }
  }, [user.authToken])
  
  return (
    <>
        {user && user.userData ?<App />:<Auth />}
    </>
  );
}
const mapStateToProps = (state:any) => (state);

const mapDispatchToProps = (dispatch:any) =>
    bindActionCreators({
      authSuccess,
      unauth,
      getUserData
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);