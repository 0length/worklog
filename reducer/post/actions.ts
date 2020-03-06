import { postTypes } from "./types"

export const startSubscribePost = (param: any) => ({
    type: postTypes.START_SUBSCRIBE_POSTS,
    query: param
})

export const subscribePostSuccess = (payload: any) =>({
    type: postTypes.SUBSRIBE_POST_IS_RUNNING,
    payload
})

// export const subscribeWorkFailure = (message: any) => ({
//     type: workTypes.GET_FAILURE,
// });

// export const setActiveMenu = (payload: any) => ({
//     type: workTypes.SET_MENU_ACTIVE,
//     payload: payload
// });