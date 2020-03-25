import React, { JSXElementConstructor, useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import  App  from './App'
import  Auth  from './components/auth'
import { authSuccess, unauth, getUserData } from '../../reducer/user/actions'
import localStorageKeys from '../../lib/const/localStorageKeys'
import LoadingBar from './components/loadingbar'
import ToastNotifier from './components/toast-notifier'



export const Main: React.FC<any> = (props)=>{
  let loadedToken: string|null
  let loadedUsername: string|null
  const {user} = useSelector( (state: any) => (state) )

  const dispatch = useDispatch()
  useEffect(()=>{
    loadedToken = window.localStorage.getItem(localStorageKeys.auth_token)
    loadedToken ? dispatch(authSuccess({token:loadedToken})) : dispatch(unauth())
  }, [])

  useEffect(()=>{
    if(typeof user.authToken==="string"){
      loadedUsername = window.localStorage.getItem(localStorageKeys.username)
      // tslint:disable-next-line: no-unused-expression
      loadedUsername && dispatch(getUserData(`{ user (username: "${atob(loadedUsername!)}") { username, name, email, password} } `))
    }
  }, [user.authToken])


  return (
    <>
    <LoadingBar />
        {user && user.userData ?<App />:<Auth />}
    <ToastNotifier />
    </>
  )
}

export default Main