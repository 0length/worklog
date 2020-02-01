import React, { JSXElementConstructor, useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchArticles } from '../../reducer/actions';
import  App  from './App';
import  Auth  from './components/auth';
import { authSuccess, unauth } from '../../reducer/user/actions';




export const Main: React.FC<any> = (props)=>{
  
  const {
      user
    } = props;

  useEffect(()=>{
    let loadedToken
    loadedToken = window.localStorage.getItem('WORKLOG://User/auth_token')
    loadedToken ? props.authSuccess(loadedToken) : unauth
  }, [])
  
  return (
    <>
        {user && user.asGuest ?<Auth />:<App />}
    </>
  );
}
const mapStateToProps = (state:any) => (state);

const mapDispatchToProps = (dispatch:any) =>
    bindActionCreators({
      authSuccess
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);