import { combineEpics, ofType, Epic } from 'redux-observable';
import { Observable , throwError, of} from 'rxjs';
import { map, catchError, flatMap, mergeMap } from 'rxjs/operators';
import {ajax, AjaxResponse} from 'rxjs/ajax'

import {
    FETCH_ARTICLES,
    fetchArticlesFailure,
    fetchArticlesSuccess,

    // TRANSLATE_ARTICLES,
    // translateArticlesFailure,
    // translateArticlesSuccess,

    AUTH,
    authSuccess,
    authnFailure,
} from '../../reducer/actions'

const url = '/graphql' //the api for the whisky
/*
    The API returns the data in the following format:
    {
        "count": number,
        "next": "url to next page",
        "previous": "url to previous page",
        "results: array of whiskies
    }
    since we are only interested in the results array we will have to use map on our observable
 */

const auth = (action$: any, store: any)=>{ //action$ is a stream of actions
    //action$.ofType is the outer Observable
     return action$.pipe(
         ofType(AUTH),
         flatMap((action: any)=>ajax({
            "url": `${url}`,
            "method": "POST",
            'withCredentials': true,
            "headers": {
                'content-type': 'application/json',
                'CSRF-Token': store.value.csrfReducer.token,
                'Accept': 'application/json',
                "Referer":"http://localhost:3000/graphql"
            },
            "body" : {
                variables: {},
                operationName: null,
                query: `
                ${action.query}
                  `
              }
         })),
         map((data: AjaxResponse) =>data.response), 
        //  map(articles=>articles.map(article=>({
        //      id: article.id,
        //      title: article.title,
        //      text_content: article.text_content,
        //      imageUrl: 'http://bolehju.ga:4000/'+article.img_url
        //  }))),
        //  map(articles=>articles.filter(article=>article.imageUrl)),
         map((payload: any)=>authSuccess(payload.data)),
         catchError(error =>of(authnFailure(error.message)))
     )
    
 }

//  const fetchArticle = (action$: any, store: any)=>{ //action$ is a stream of actions
//     //action$.ofType is the outer Observable
//      return action$.pipe(
//          ofType(FETCH_ARTICLES),
//          flatMap((action)=>ajax({
//             "url": `${url}`,
//             "method": "POST",
//             'withCredentials': true,
//             "headers": {
//                 'content-type': 'application/json',
//                 'CSRF-Token': store.value.csrfReducer.token,
//                 'Accept': 'application/json',
//             },
//             "body" : {
//                 variables: {},
//                 operationName: null,
//                 query: `
//                 { users { name email password } } 
//                   `
//               }
//          })
//         ),
//         map((data: AjaxResponse) =>data.response), 
//         //todo: make global type for interface data based graphql
//         map((user: any)=>user.data.users.map((user: any)=>({
//              name: user.name,
//              email: user.email,
//              password: user.password,
//          }))),
//         map((users: )=>users.filter(user=>user.email)),
//         map(data=>({ type: 'FETCH_ARTICLES_SUCCESS', payload: data })),
//         catchError(error =>of(fetchArticlesFailure(error.message)))
//      )
//  }

//  const translateArticle = (action$)=>{ //action$ is a stream of actions
//     //action$.ofType is the outer Observable
//     // console.log("uye",action$);
//     // let source = "en",
//     // target = "ko";
//     // input = "Officia odit qui nisi molestiae officiis. Corrupti optio eaque sed facilis pariatur id. Laborum nostrum soluta itaque harum saepe repellendus architecto.";
//     // aticles.map((aticle, index)=>{
    
//         return action$.pipe(
//             ofType(TRANSLATE_ARTICLES),
//             flatMap(()=>{
//                 // console.log(articles.payload[0].title)
//                 // ajax.getJSON(url).pipe(
//                 //     map(userResponse => console.log('users: ', userResponse)),
//                 //     catchError(error => {
//                 //       console.log('error: ', error);
//                 //       return of(error);
//                 //     })
//                 //   );
//                 ajax({
//                 "url": `https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/translation/text/translate?source=en&target=ko&input=ffewifujiwoe`,
//                 "method": "GET",
//                 "headers": {
//                     "x-rapidapi-host": "systran-systran-platform-for-language-processing-v1.p.rapidapi.com",
//                     "x-rapidapi-key": "19acad232amsh0a11577fffe3373p1c1006jsn8ac5528d25e4"
//                     }
//                 })
                
//             }),        
//             // map(data =>console.log('uye',data)), 
//             map(whiskies=>console.log(whiskies)),
//             catchError(error =>of(translateArticlesFailure(error.message)))
//         )
//     // });

//  }

 export const rootEpic = combineEpics(
    // fetchArticle, 
    auth
 );

/**
 * What we did here is import the action creators that we will need to dispatch as well as the action type that we will need to watch for in the action stream, and some operators from RxJS as well as the Observable. Note that neither RxJS nor Redux Observable import the operators automatically, therefore you have to import them by yourself (another option is to import the entire 'rxjs' module in your entry index.js, however I would not recommend this as it will give you large bundle sizes). Okay, let's go through these operators that we've imported and what they do:

map - similar to Javascript's native Array.map(), map executes a function over each item in the stream and returns a new stream/Observable with the mapped items.
of - creates an Observable/stream out of a non-Observable value (it can be a primitive, an object, a function, anything).
ajax - is the provided RxJS module for doing AJAX requests; we will use this to call the API.
catch - is used for catching any errors that may have occured
switchMap - is the most complicated of these. What it does is, it takes a function which returns an Observable, and every time this inner Observable emits a value, it merges that value to the outer Observable (the one upon which switchMap is called). Here's the catch tho, every time a new inner Observable is created, the outer Observable subscribes to it (i.e listens for values and merges them to itself), and cancels all other subscriptions to the previously emitted Observables. This is useful for situations where we don't care whether the previous results have succeeded or have been cancelled. For example, when we dispatch multiple actions for fetching the whiskies we only want the latest result, switchMap does exactly that, it will subscribe to the latest result and merge it to the outer Observable and discard the previous requests if they still haven't completed. When creating POST requests you usually care about whether the previous request has completed or not, and that's when mergeMap is used. mergeMap does the same except it doesn't unsubscribe from the previous Observables.
 */