import { postTypes } from "./types"
import { initItem } from "../init"

const postReducer = (state = initItem, action: any)=>{

    switch (action.type){
        case postTypes.GET:
        return {
            ...state,
            isLoading: true,
            error: null,
        }
        case postTypes.GET_SUCCESS:
        return {
            ...state,
            isLoading: false,
            error: null,
            data: [...new Set([ ...action.payload,...state.data])]
        }
        case postTypes.GET_FAILURE:
        return{
            ...state,
            isLoading: false,
            error: action.payload
        }
        case postTypes.SET_POST_ACTIVE:
            return {
                ...state,
                active:action.payload
            }
        case postTypes.SUBSRIBE_POST_IS_RUNNING:
            return {
                ...state,
                uptodate: [...new Set([ ...state.uptodate, ...action.payload])]
            }
            case postTypes.START_SUBSCRIBE_POSTS:
            return {
                ...state,
            }
            case postTypes.STOP_SUBSCRIBE_POSTS:
            return{
                ...state,
                uptodate: []
            }
        default:
        return state
    }
}

export default postReducer