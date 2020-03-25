import {
    GENERAL_GRAPH,
    GENERAL_GRAPH_SUCCESS,
    GENERAL_GRAPH_FAILURE,
    GENERAL_GRAPH_RESET,
    UPLOAD, UPLOAD_FAILURE,
    UPLOAD_SUCCESS, UPLOAD_PROGRESS,
    UPLOAD_RESET,
    STOP_ALL_SUBSCRIBE
} from "./types"


export const REQUEST_CSRF_TOKEN = 'REQUEST_CSRF_TOKEN'
export const REQUEST_CSRF_TOKEN_SUCCESS = 'REQUEST_CSRF_TOKEN_SUCCESS'
export const REQUEST_CSRF_TOKEN_FAILURE = 'REQUEST_CSRF_TOKEN_FAILURE'

export interface GeneralGrap{
    type: string
    query: any
    pid: string
}

export const generalGraph = (param: any, pid: string) => ({
    type: GENERAL_GRAPH,
    query: param,
    pid

})

export const generalGraphSuccess = (payload: any, pid: string) => ({
    type: GENERAL_GRAPH_SUCCESS,
    payload,
    pid
})

export const generalGraphFailure = (message: any, pid: string) => ({
    type: GENERAL_GRAPH_FAILURE,
    payload: message,
    pid
})

export const killGrapher = (pid: string) => ({
    type: GENERAL_GRAPH_RESET,
    pid
})

// Reload Token
export const requestCsrfToken = () => ({
    type: REQUEST_CSRF_TOKEN,
})

export const requestCsrfTokenSuccess = (token: any) =>({
    type: REQUEST_CSRF_TOKEN_SUCCESS,
    payload: token
})

export const requestCsrfTokenFailure = (message: any) => ({
    type: REQUEST_CSRF_TOKEN_FAILURE,
    payload: message
})
//


export const upload = (param: any, pid: string) => ({
    type: UPLOAD,
    file: param,
    pid
})

export const setUploadPercentage = (payload: any, pid: string) => ({
    type: UPLOAD_PROGRESS,
    payload,
    pid
})

export const uploadSuccess = (payload: any, pid: string) => ({
    type: UPLOAD_SUCCESS,
    payload,
    pid
})

export const uploadFailure = (message: any, pid: string) => ({
    type: UPLOAD_FAILURE,
    payload: message,
    pid
})
export const killUploader = (pid: string) => ({
    type: UPLOAD_RESET,
    pid
})

export const unsubscribe = () => ({
    type: STOP_ALL_SUBSCRIBE,
})