import { workTypes } from "./types"

export const startSubscribeWork = (param: any) => ({
    type: workTypes.START_SUBSCRIBE_WORKS,
    query: param
})

export const subscribeWorkSuccess = (payload: any) =>({
    type: workTypes.SUBSCRIBE_WORKS_IS_RUNNING,
    payload
})

// export const subscribeWorkFailure = (message: any) => ({
//     type: workTypes.GET_FAILURE,
// });

// export const setActiveMenu = (payload: any) => ({
//     type: workTypes.SET_MENU_ACTIVE,
//     payload: payload
// });