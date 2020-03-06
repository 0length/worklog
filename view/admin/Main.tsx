import React, { JSXElementConstructor, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  App  from './App'
import  Auth  from './components/auth'
import { authSuccess, unauth, getUserData } from '../../reducer/user/actions'
import localStorageKeys from '../../lib/const/localStorageKeys'
import LoadingBar from './components/loadingbar'




export const Main: React.FC<any> = (props)=>{
  let loadedToken: any
  let loadedUsername: any
  const {
      user
    } = props


  useEffect(()=>{
    loadedToken = window.localStorage.getItem(localStorageKeys.auth_token)
    loadedToken ? props.authSuccess({token:loadedToken}) : props.unauth()
  }, [])

  useEffect(()=>{
    if(typeof user.authToken==="string"){
      loadedUsername = window.localStorage.getItem(localStorageKeys.username)
      // tslint:disable-next-line: no-unused-expression
      loadedUsername && props.getUserData(`{ user (username: "${atob(loadedUsername!)}") { username, name, email, password} } `)
    }
  }, [user.authToken])


  return (
    <>
    <LoadingBar />
        {user && user.userData ?<App />:<Auth />}
    </>
  )
}
const mapStateToProps = (state:any) => (state)

const mapDispatchToProps = (dispatch:any) =>
    bindActionCreators({
      authSuccess,
      unauth,
      getUserData
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)