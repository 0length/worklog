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
        {name: "testing", parent_name: "work", sequence:"0"},
        {name: "apa_ge", parent_name: "work", sequence:"1"},
        {name: "kos", parent_name: "work", sequence:"3"},
        {name: "jos", parent_name: "work", sequence:"2"}


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

export const initLang = {
    'code': 'en'
}