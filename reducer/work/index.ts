import { workTypes } from "./types"
import { initWork } from "../init"

const workReducer = (state = initWork, action: any)=>{

    switch (action.type){
        case workTypes.GET:
        return {
            ...state,
            isLoading: true,
            error: null,
        }
        case workTypes.GET_SUCCESS:
        return {
            ...state,
            isLoading: false,
            error: null,
            data: [...new Set([ ...action.payload,...state.data])]
        }
        case workTypes.GET_FAILURE:
        return{
            ...state,
            isLoading: false,
            error: action.payload
        }
        case workTypes.SET_WORK_ACTIVE:
            return {
                ...state,
                active:action.payload
            }
        case workTypes.SUBSRIBE_WORK_IS_RUNNING:
            return {
                ...state,
                uptodate: [...new Set([ ...state.uptodate, ...action.payload])]
            }
            case workTypes.START_SUBSCRIBE_WORKS:
            return {
                ...state,
            }
            case workTypes.STOP_SUBSCRIBE_WORKS:
            return{
                ...state,
                uptodate: []
            }
        default:
        return state
    }
}

export default workReducer