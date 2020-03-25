export const initUser = {
    asGuest: false,
    token: "",
    isLoading: false,
    error: null
}

export const initMenu = {
    isLoading: false,
    error: null,
    data: [
        // {name: "dashboard", parent_name: "", sequence:"0"},
        {name: "testing", parent_name: "", sequence:"99"},
    ],
    active: "dashboard"
}

export const initItem = {
    uptodate: [],
    data: [],
    isLoading: false,
    error: null
}

export const initUploader = {
    'uploader-ready': {error: null}
}

export const initGeneralGraph = {
    'general-graph-ready': {error: null}
}


export const initLang = {
    'code': 'en'
}