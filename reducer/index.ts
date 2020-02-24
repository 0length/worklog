import {
  GENERAL_GRAPH,
  GENERAL_GRAPH_FAILURE,
  GENERAL_GRAPH_SUCCESS,
  UPLOAD,
  UPLOAD_FAILURE,
  UPLOAD_SUCCESS,
  UPLOAD_PROGRESS
   } from "./types";
  import { combineReducers, Reducer as R,  CombinedState } from "redux";

import userReducer from "./user";
import menuReducer from "./menu";
import toastReducer from "./toast";
import workReducer from "./work";
  
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
  };
  
  export const initialTranslateArticleState = {
      data: [],
      isLoading: false,
      error: null  ,
  };

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
        };
        case `${authType}_SUCCESS`:
        return {
            token: action.payload.token,
            isLoading:false,
            user: action.payload.user,
            error:null
        };
        case `${authType}_FAILURE`:
        return{
            token: "",
            isLoading: false,
            error: action.payload
        };
        default:
        return state;
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
        };
        case `REQUEST_${tokenType}_TOKEN_SUCCESS`:
        return {
            token: action.payload,
            isLoading:false,
            error:null
        };
        case `REQUEST_${tokenType}_TOKEN_FAILURE`:
        return{
            token: "",
            isLoading: false,
            error: action.payload
        };
        default:
        return state;
    }
}

  
  const generalGraphReducer = (state ={}, action: any) =>{
    switch (action.type){
      case GENERAL_GRAPH:
        return {
          data:[],
          isLoading: true,
          error: null
        };
      case GENERAL_GRAPH_SUCCESS:
        return {
            data: action.payload,
            isLoading:false,
            error:null
        };
      case GENERAL_GRAPH_FAILURE:
        return{
            data: [],
            isLoading: false,
            error: action.payload
        };
      default:
        return state;
    }
  }

  const uploadReducer = (state ={}, action: any) =>{
    switch (action.type){
      case UPLOAD:
        return {
          fileID: "",
          isLoading: true,
          error: null
        };
      case UPLOAD_SUCCESS:
        return {
            fileID: action.payload,
            isLoading:false,
            error:null
        };
      case UPLOAD_PROGRESS:
        return {
          ...state,
          progress: action.payload
        };
      case UPLOAD_FAILURE:
        return{
            fileID: "",
            isLoading: false,
            error: action.payload
        };
      default:
        return state;
    }
  }

const csrfReducer = (state: any= null, action: any) =>{
    return tokenTypeReducer(state, action, 'CSRF')
  }
  


   export const Reducer: R<CombinedState<any>> =combineReducers({
     //authReducer, 
     csrf: csrfReducer,
     user: userReducer,
     menu: menuReducer,
     toast: toastReducer,
     work: workReducer,
     general_graph: generalGraphReducer,
     upload: uploadReducer
    });
   export default Reducer;
  