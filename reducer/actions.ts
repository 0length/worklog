
export const FETCH_ARTICLES = 'FETCH_ARTICLES';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';

export const TRANSLATE_ARTICLES = 'TRANSLATE_ARTICLES';
export const TRANSLATE_ARTICLES_SUCCESS = 'TRANSLATE_ARTICLES_SUCCESS';
export const TRANSLATE_ARTICLES_FAILURE = 'TRANSLATE_ARTICLES_FAILURE';

export const REQUEST_CSRF_TOKEN = 'REQUEST_CSRF_TOKEN';
export const REQUEST_CSRF_TOKEN_SUCCESS = 'REQUEST_CSRF_TOKEN_SUCCESS';
export const REQUEST_CSRF_TOKEN_FAILURE = 'REQUEST_CSRF_TOKEN_FAILURE';

export const AUTH = 'AUTH';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';



//Fetch Articles
export const fetchArticles = () => ({
    type: FETCH_ARTICLES
});

export const fetchArticlesSuccess = (articles: any) => ({
    type: FETCH_ARTICLES_SUCCESS,
    payload: articles
});

export const fetchArticlesFailure = (message: any) => ({
    type: FETCH_ARTICLES_FAILURE,
    payload: message
});

//Translate Curr Articles
// export const translateArticles = () => ({
//     type: TRANSLATE_ARTICLES,
// });

// export const translateArticlesSuccess = (articles) =>({
//     type: TRANSLATE_ARTICLES_SUCCESS,
//     payload: articles
// });

// export const translateArticlesFailure = (message) => ({
//     type: TRANSLATE_ARTICLES_FAILURE,
//     payload: message
// });

//Reload Token
export const requestCsrfToken = () => ({
    type: REQUEST_CSRF_TOKEN,
});

export const requestCsrfTokenSuccess = (token: any) =>({
    type: REQUEST_CSRF_TOKEN_SUCCESS,
    payload: token
});

export const requestCsrfTokenFailure = (message: any) => ({
    type: REQUEST_CSRF_TOKEN_FAILURE,
    payload: message
});
//
export const auth = (param: any) => ({
    type: AUTH,
    query: param
});

export const authSuccess = (payload: any) =>({
    type: AUTH_SUCCESS,
    payload: payload
});

export const authnFailure = (message: any) => ({
    type: AUTH_FAILURE,
    payload: message
});