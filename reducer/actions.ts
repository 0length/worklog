import { GENERAL_GRAPH, GENERAL_GRAPH_SUCCESS, GENERAL_GRAPH_FAILURE } from "./types";


export const REQUEST_CSRF_TOKEN = 'REQUEST_CSRF_TOKEN';
export const REQUEST_CSRF_TOKEN_SUCCESS = 'REQUEST_CSRF_TOKEN_SUCCESS';
export const REQUEST_CSRF_TOKEN_FAILURE = 'REQUEST_CSRF_TOKEN_FAILURE';



export const generalGraph = () => ({
    type: GENERAL_GRAPH
});

export const generalGraphSuccess = (articles: any) => ({
    type: GENERAL_GRAPH_SUCCESS,
    payload: articles
});

export const generalGraphFailure = (message: any) => ({
    type: GENERAL_GRAPH_FAILURE,
    payload: message
});

//Reload Token
export const requestCsrfToken = () => ({
    type: REQUEST_CSRF_TOKEN,
});

export const requestCsrfTokenSuccess = (token: any) =>({
    type: REQUEST_CSRF_TOKEN_SUCCESS,
    payload: token
});

export const requestCsrfTokenFailure = (message: any) => ({
    type: REQUEST_CSRF_TOKEN_FAILURE,
    payload: message
});
//
