import {
userTypes
} from './types'

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