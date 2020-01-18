import { userTypes } from "./types";
import { initialTokenType } from "../init";

const userReducer = (state = initialTokenType, action: any)=>{

    switch (action.type){
        case userTypes.AUTH:
        return {
            authToken: "",
            isLoading: true,
            error: null,
            asGuest: true
        };
        case userTypes.AUTH_SUCCESS:
        return {
            authToken: action.payload.token,
            isLoading:false,
            userData: action.payload.user,
            asGuest: false,
            error:null
        };
        case userTypes.AUTH_FAILURE:
        return{
            asGuest: true,
            authToken: "",
            isLoading: false,
            error: action.payload
        };
        default:
        return state;
    }
}

export default userReducer