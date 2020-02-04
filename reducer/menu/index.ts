import { menuTypes } from "./types";
import { initMenu } from "../init";

const menuReducer = (state = initMenu, action: any)=>{

    switch (action.type){
        case menuTypes.GET:
        return {
            ...state,
            isLoading: true,
            error: null,
        };
        case menuTypes.GET_SUCCESS:
        return {
            isLoading: false,
            error: null,
            data: [...action.payload]
        };
        case menuTypes.GET_FAILURE:
        return{
            ...state,
            isLoading: false,
            error: action.payload.error
        };
        default:
        return state;
    }
}

export default menuReducer