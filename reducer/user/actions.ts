import {
userTypes
} from './types'

export const unauth = (param: any) => ({
    type: userTypes.UNAUTHENTICATED,
});

export const auth = (param: any) => ({
    type: userTypes.AUTH,
    query: param
});

export const authSuccess = (payload: any) =>({
    type: userTypes.AUTH_SUCCESS,
    payload: payload
});

export const authFailure = (message: any) => ({
    type: userTypes.AUTH_FAILURE,
    payload: message
});

export const getUserData = (param: any) => ({
    type: userTypes.GET_USER_DATA,
    query: param
});

export const getUserDataSuccess = (payload: any) => ({
    type: userTypes.GET_USER_DATA_SUCCESS,
    payload: payload
});

export const getUserDataFailure = (message: any) => ({
    type: userTypes.GET_USER_DATA_FAILURE,
    payload: message
});