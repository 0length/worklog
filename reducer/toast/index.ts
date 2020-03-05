import { toastType } from "./types"
import { initMenu } from "../init"

const toastReducer = (state = {data:[]}, action: any)=>{

    switch (action.type){
        case toastType.SET:
        return {...state}
        case toastType.SETED:
        return {data : [...state.data, ...action.recieve]}
        case toastType.CLEAR:
        return {data:[]}
        default:
        return state
    }
}

export default toastReducer