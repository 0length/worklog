import {
  GENERAL_GRAPH,
  GENERAL_GRAPH_FAILURE,
  GENERAL_GRAPH_SUCCESS,
  UPLOAD,
  UPLOAD_FAILURE,
  UPLOAD_SUCCESS,
  UPLOAD_PROGRESS,
  UPLOAD_RESET
  } from "./types"
  import { combineReducers, Reducer as R,  CombinedState } from "redux"

import userReducer from "./user"
import menuReducer from "./menu"
import toastReducer from "./toast"
import workReducer from "./work"
import { initUploader } from "./init"
import postReducer from "./post"

  // import { combineReducers } from "redux";
  // import ui from "./UIReducer";

  // const rootReducer = combineReducers({
  //   ui
  // });

  // export default rootReducer;


  export const initialArticleState = {
       data: [],
      isLoading: false,
      error: null,
  }

  export const initialTranslateArticleState = {
      data: [],
      isLoading: false,
      error: null  ,
  }

  export const initialUserData= {
    user: {name: "", email: "", password: ""},
    acces_token: ""
  }


  const authentications = (state: any, action: any, authType: any)=>{
    switch (action.type){
      case `${authType}`:
        return {
            token: "",
            isLoading: true,
            error: null
        }
        case `${authType}_SUCCESS`:
        return {
            token: action.payload.token,
            isLoading:false,
            user: action.payload.user,
            error:null
        }
        case `${authType}_FAILURE`:
        return{
            token: "",
            isLoading: false,
            error: action.payload
        }
        default:
        return state
    }
  }

  const tokenTypeReducer = (state={
    token: "",
    isLoading: false,
    error: null
  }, action: any, tokenType: string)=>{
    switch (action.type){
        case `REQUEST_${tokenType}_TOKEN`:
        return {
            token: "",
            isLoading: true,
            error: null
        }
        case `REQUEST_${tokenType}_TOKEN_SUCCESS`:
        return {
            token: action.payload,
            isLoading:false,
            error:null
        }
        case `REQUEST_${tokenType}_TOKEN_FAILURE`:
        return{
            token: "",
            isLoading: false,
            error: action.payload
        }
        default:
        return state
    }
}


  const generalGraphReducer = (state ={}, action: any) =>{
    switch (action.type){
      case GENERAL_GRAPH:
        return {
          data:[],
          isLoading: true,
          error: null
        }
      case GENERAL_GRAPH_SUCCESS:
        return {
            data: action.payload,
            isLoading:false,
            error:null
        }
      case GENERAL_GRAPH_FAILURE:
        return{
            data: [],
            isLoading: false,
            error: action.payload
        }
      default:
        return state
    }
  }

  const uploadReducer = (state:any = initUploader, action: any) =>{
    switch (action.type){
      case UPLOAD:
        const newProcess: any = {}
        newProcess[action.pid] = {
          ...state[action.pid],
          fileID: "",
          isLoading: true,
          error: null
        }
        return {
          ...state,
          ...newProcess
        }
      case UPLOAD_SUCCESS:
        const newProcessSuccess: any = {}
        newProcessSuccess[action.pid] = {
          ...state[action.pid],
          fileid: action.payload.data.id,
          isLoading:false,
          error:null
        }
        return {
          ...state,
          ...newProcessSuccess
        }
      case UPLOAD_PROGRESS:
        const newProcessProgress: any = {}
        newProcessProgress[action.pid] = {
          ...state[action.pid],
          progress: action.payload
        }
        return {
          ...state,
          ...newProcessProgress
        }
      case UPLOAD_FAILURE:
        const newProcessFail: any = {}
        newProcessFail[action.pid] = {
          ...state[action.pid],
          fileID: "",
          isLoading: false,
          error: action.payload
        }
        return{
          ...state,
          ...newProcessFail
        }
        case UPLOAD_RESET:
          const newProcessReset: any = state
          // newProcessReset[action.pid] = {}
          delete newProcessReset[action.pid]
          return newProcessReset
      default:
        return state
    }
  }

const csrfReducer = (state: any= null, action: any) =>{
    return tokenTypeReducer(state, action, 'CSRF')
  }



   export const Reducer: R<CombinedState<any>> =combineReducers({
     // authReducer,
     csrf: csrfReducer,
     user: userReducer,
     menu: menuReducer,
     toast: toastReducer,
     work: workReducer,
     post: postReducer,
     grapher: generalGraphReducer,
     uploader: uploadReducer
    })
   export default Reducer