const toastError = (message: string, timeOut: number=5000)=>{
    return {message: message, timeOut, type: "danger", created_at: new Date+""}
}

export {
    toastError
}