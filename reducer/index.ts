import {

    FETCH_ARTICLES,
    FETCH_ARTICLES_SUCCESS,
    FETCH_ARTICLES_FAILURE,

    TRANSLATE_ARTICLES,
    TRANSLATE_ARTICLES_SUCCESS,
    TRANSLATE_ARTICLES_FAILURE,
    AUTH,
    AUTH_SUCCESS,
    AUTH_FAILURE,
    
   } from "./actions";
  import { combineReducers, Reducer as R,  CombinedState } from "redux";
  
  // import { combineReducers } from "redux";
  // import ui from "./UIReducer";
  
  // const rootReducer = combineReducers({
  //   ui
  // });
  
  // export default rootReducer;
export const initialTokenType = {
    token: "",
    isLoading:false,
    error:null
 }

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

  const tokenTypeReducer = (state=initialTokenType, action: any, tokenType: string)=>{
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

  const fetchArticleReducer = (state = initialArticleState, action: any) =>{
    switch (action.type){
      case FETCH_ARTICLES:
        return {
            data:[],
            isLoading: true,
            error: null
        };
      case FETCH_ARTICLES_SUCCESS:
        return {
            data: action.payload,
            isLoading:false,
            error:null
        };
      case FETCH_ARTICLES_FAILURE:
        return{
            data: [],
            isLoading: false,
            error: action.payload
        };
      default:
        return state;
    }
  }
  
  // const translateArticleReducer = (state = initialTranslateArticleState, action) =>{
  //   switch (action.type){
  //     case TRANSLATE_ARTICLES:
  //       return {
  //         data:[],
  //         isLoading: true,
  //         error: null
  //       };
  //     case TRANSLATE_ARTICLES_SUCCESS:
  //       return {
  //           data: action.payload,
  //           isLoading:false,
  //           error:null
  //       };
  //     case TRANSLATE_ARTICLES_FAILURE:
  //       return{
  //           data: [],
  //           isLoading: false,
  //           error: action.payload
  //       };
  //     default:
  //       return state;
  //   }
  // }

const csrfReducer = (state: any= null, action: any) =>{
    return tokenTypeReducer(state, action, 'CSRF')
  }
  
const authReducer = (state = initialTokenType, action: any)=>{
  // return authentications(state, action, 'AUTH')
  switch (action.type){
    case AUTH:
      return {
          token: "",
          isLoading: true,
          error: null
      };
      case AUTH_SUCCESS:
      return {
          token: action.payload.token,
          isLoading:false,
          user: action.payload.user,
          error:null
      };
      case AUTH_FAILURE:
      return{
          token: "",
          isLoading: false,
          error: action.payload
      };
      default:
      return state;
  }
}

   export const Reducer: R<CombinedState<any>> =combineReducers({authReducer,csrfReducer, fetchArticleReducer});
   export default Reducer;
  