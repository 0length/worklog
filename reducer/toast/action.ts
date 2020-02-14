import { toastType } from "./types";


export const pushToast = (payload: any) => ({
    type: toastType.SET,
    send: payload,
});

export const pushedToast = (payload: any) => ({
    type: toastType.SETED,
    recieve: payload,
});


export const clearToast = () =>({
    type: toastType.CLEAR,
});

