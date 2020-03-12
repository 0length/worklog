import { menuTypes } from "./types"
import { initMenu } from "../init"

const menuReducer = (state = initMenu, action: any)=>{

    switch (action.type){
        case menuTypes.GET:
        return {
            ...state,
            isLoading: true,
            error: null,
        }
        case menuTypes.GET_SUCCESS:
        return {
            ...state,
            isLoading: false,
            error: null,
            data: [ ...action.payload,...initMenu.data]
        }
        case menuTypes.GET_FAILURE:
        return{
            ...state,
            isLoading: false,
            error: action.payload
        }
        case menuTypes.SET_MENU_ACTIVE:
            return {
                ...state,
                active:action.payload
            }
        default:
        return state
    }
}

export default menuReducer