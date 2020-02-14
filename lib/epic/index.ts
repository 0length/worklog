import { of, from, observable, queueScheduler, interval, merge, Observable, concat, timer } from 'rxjs';
import { map, catchError, flatMap, mergeMap, switchMap, observeOn, subscribeOn, take, mapTo, tap, delay } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import client from '../api/client';
import { userTypes } from '../../reducer/user/types';
import { authSuccess, authFailure, getUserDataSuccess, getUserDataFailure } from '../../reducer/user/actions';
import { AjaxResponse } from 'rxjs/ajax';
import { menuTypes } from '../../reducer/menu/types';
import { getMenuSuccess, getMenuFailure } from '../../reducer/menu/actions';
import { toastType } from '../../reducer/toast/types';
import { pushToast, pushedToast, clearToast } from '../../reducer/toast/action';
import arrayChunks from '../utils/arrayChunks';
import sortNumber from '../utils/sortNumber';
import reducer from '../utils/reducerSum';



const auth = (action$: any, store: any)=>{ //action$ is a stream of actions
    //action$.ofType is the outer Observable
    let act : any;//for accesing action outside flat map
     return action$.pipe(
         ofType(userTypes.AUTH),
         flatMap((action: any)=>{act = action;return client({service: 'graphql', csrf: store.value.csrf.token, graphqlBody: {query: 
            // "query{  works{ name }}"
            action.query
        }})}),
         map((data: AjaxResponse) =>data.response), 
         map((payload: any) =>{
                if(payload.errors){return {error: payload.errors[0].message}}
                if(!payload.errors){return payload.data[Object.keys(payload.data)[0]]}
            }), 
         map((payload: any)=>{
                if(payload.token&&payload.user){
                localStorage.setItem("WORKLOG://User/auth_token", payload.token);
                localStorage.setItem("WORKLOG://User/data/username", btoa(payload.user.username));
                return authSuccess(payload)}else{
                return authFailure(payload.error)
                }
            }),
         catchError((error: any) =>of(authFailure(error.message)))
     )
    
 }

 const getMenu = (action$: any, store: any)=>{ //action$ is a stream of actions
    //action$.ofType is the outer Observable
    let act : any;//for accesing action outside flat map
     return action$.pipe(
         ofType(menuTypes.GET),
         flatMap((action: any)=>{act = action;return client({service: 'graphql', csrf: store.value.csrf.token, graphqlBody: {query: 
            // "query{  works{ name }}"
            action.query
            },headers:{authorization:`Bearer ${store.value.user.authToken}`}
        })}),
         map((data: AjaxResponse) =>data.response), 
         map((payload: any) =>{
             console.log(payload)
                if(payload.errors){return {error: payload.errors[0].message}}
                if(!payload.errors){return payload.data[Object.keys(payload.data)[0]]}
            }), 
         map((payload: any)=>{
             console.log(payload)
                if(!payload.error){
                return getMenuSuccess(payload)}else{
                return getMenuFailure(payload.error)
                }
            }),
         catchError((error: any) =>of(getMenuFailure(error.message)))
     )
    
 }

 const getUserData = (action$: any, store: any)=>{ //action$ is a stream of actions
    //action$.ofType is the outer Observable
    let act : any;//for accesing action outside flat map
     return action$.pipe(
         ofType(userTypes.GET_USER_DATA),
         flatMap((action: any)=>{act = action;return client({service: 'graphql', csrf: store.value.csrf.token, graphqlBody: {query: 
            // "query{  works{ name }}"
            action.query
            },headers:{authorization:`Bearer ${store.value.user.authToken}`}
        })}),
         map((data: AjaxResponse) =>data.response), 
         map((payload: any) =>{
                if(payload.errors){return {error: payload.errors[0].message}}
                if(!payload.errors){return payload.data[Object.keys(payload.data)[0]]}
            }), 
         map((payload: any)=>{
                if(payload.error){
                return getUserDataFailure(payload.error)
                }else{
                return getUserDataSuccess(payload)
                }
            }),
         catchError((error: any) =>of(getUserDataFailure(error.message)))
     )
    
 }


 const setToast = (action$: any, store: any)=>{ //action$ is a stream of actions
    //action$.ofType is the outer Observable
    let act : any;//for accesing action outside flat map
     return action$.pipe(
         ofType(toastType.SET),
         mergeMap((action: any)=>{
            //  if(!action.pending.length){
                let data = action.send
                console.log("data", data)
                let chunks: any;

                chunks = arrayChunks(data, 4)
                let allTimeout = data.map((item: any)=>item.timeOut).sort(sortNumber)
                let aveDelay = allTimeout.reduce(reducer)/data.length
                let maxDelay = allTimeout[0]
                // store.dispatch()
                // return pushedToast(chunks[0], nextdelay, chunks.splice(0, 1))
                
                 return Observable.create((observer: any)=>{
                    // chunks.map((im, ix)=>{
                        // const nextdelay = chunks[0].map((item: any)=>item.timeOut).sort(sortNumber)[chunks[0].length-1]
                        timer(0, maxDelay+100).pipe(take(chunks.length-1)).subscribe((x)=>{
                            // console.log(aveDelay, allTimeout, "WOY")
                            // observer.next(clearToast())
                            observer.next(pushedToast(chunks[x]))
                            // aveDelay = chunks[x].map((item: any)=>item.timeOut).sort(sortNumber)[chunks[x].length-1]
                    //     delay(nextdelay)
                        })
                    })
                // })
            //  }
            //  if(action.pending.length){

            //  }

        }),
         catchError((error: any) =>of(clearToast()))
     )
 }

//  const pendingToast = (action$: any, store: any)=>{
//     //  var act: any = {delay:0}
//     return action$.pipe(
//         ofType(toastType.SETED),
//         map((action: any)=>{
//            let pending = action.pending 
//            console.log(pending, pending.splice(0,1))
//            const nextdelay = pending[0].map((item: any)=>item.timeOut).sort(sortNumber)[pending[0].length-1]
//           return of(()=>pending[0]).pipe(
//           delay(action.delay),
//           map((first: any)=>pushedToast(first, nextdelay, pending.splice(0, 1))
//           ))}),
//         // catchError((error: any) =>of(clearToast()))
//     )
//  }

 const cleanerToast =  (action$: any, store: any)=>{
   return action$.pipe(
       ofType(toastType.SETED),
       delay(1000),
       map(()=>clearToast())
    )
}
   
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

 export const rootEpic = 
 (action$: any, store: any)=>
 combineEpics(
    // fetchArticle, 
    auth,
    getMenu,
    getUserData,
    setToast,
    // pendingToast,
    cleanerToast
 )
 (action$.pipe(
     subscribeOn(queueScheduler)
 ), store);

/**
 * What we did here is import the action creators that we will need to dispatch as well as the action type that we will need to watch for in the action stream, and some operators from RxJS as well as the Observable. Note that neither RxJS nor Redux Observable import the operators automatically, therefore you have to import them by yourself (another option is to import the entire 'rxjs' module in your entry index.js, however I would not recommend this as it will give you large bundle sizes). Okay, let's go through these operators that we've imported and what they do:

map - similar to Javascript's native Array.map(), map executes a function over each item in the stream and returns a new stream/Observable with the mapped items.
of - creates an Observable/stream out of a non-Observable value (it can be a primitive, an object, a function, anything).
ajax - is the provided RxJS module for doing AJAX requests; we will use this to call the API.
catch - is used for catching any errors that may have occured
switchMap - is the most complicated of these. What it does is, it takes a function which returns an Observable, and every time this inner Observable emits a value, it merges that value to the outer Observable (the one upon which switchMap is called). Here's the catch tho, every time a new inner Observable is created, the outer Observable subscribes to it (i.e listens for values and merges them to itself), and cancels all other subscriptions to the previously emitted Observables. This is useful for situations where we don't care whether the previous results have succeeded or have been cancelled. For example, when we dispatch multiple actions for fetching the whiskies we only want the latest result, switchMap does exactly that, it will subscribe to the latest result and merge it to the outer Observable and discard the previous requests if they still haven't completed. When creating POST requests you usually care about whether the previous request has completed or not, and that's when mergeMap is used. mergeMap does the same except it doesn't unsubscribe from the previous Observables.
 */