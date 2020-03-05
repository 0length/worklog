import { of, queueScheduler, Observable, timer, merge } from 'rxjs'
import { map, catchError, flatMap, mergeMap, subscribeOn, take, delay, takeUntil, switchMap } from 'rxjs/operators'
import { webSocket } from "rxjs/webSocket"
import { combineEpics, ofType } from 'redux-observable'
import client, { AjaxUpdate } from '../api/client'
import { userTypes } from '../../reducer/user/types'
import { authSuccess, authFailure, getUserDataSuccess, getUserDataFailure } from '../../reducer/user/actions'
import { AjaxResponse, AjaxRequest } from 'rxjs/ajax'
import { menuTypes } from '../../reducer/menu/types'
import { getMenuSuccess, getMenuFailure } from '../../reducer/menu/actions'
import { toastType } from '../../reducer/toast/types'
import { pushToast, pushedToast, clearToast } from '../../reducer/toast/action'
import arrayChunks from '../utils/arrayChunks'
import sortNumber from '../utils/sortNumber'
import reducer from '../utils/reducerSum'
import { toastError, toastSuccess } from '../utils/toastModel'
import localStorageKeys from '../const/localStorageKeys'
import { workTypes } from '../../reducer/work/types'
import graphResponseParser from '../utils/graphResParser'
import { GENERAL_GRAPH, UPLOAD } from '../../reducer/types'
import { generalGraphFailure, generalGraphSuccess, uploadFailure, uploadSuccess, setUploadPercentage } from '../../reducer/actions'
import endPoint from '../const/endpoint'


const socket$ = webSocket(
    {
        url:"ws://localhost:3000/graphql",
        protocol: "graphql-ws",
    }
  );

const auth = (action$: any, store: any)=>{
     return action$.pipe(
         ofType(userTypes.AUTH),
         flatMap((action: any)=>{
            return client({
                service: 'graphql',
                csrf: store.value.csrf.token,
                graphqlBody: {
                    query: action.query
                }
            })
        }),
         map((data: AjaxResponse) =>data.response),
         map((payload: any) =>graphResponseParser(payload)),
         mergeMap((payload: any)=>{
             return Observable.create((observer: any)=>{
                if(payload.token&&payload.user){
                    localStorage.setItem(localStorageKeys.auth_token, payload.token);
                    localStorage.setItem(localStorageKeys.username, btoa(payload.user.username));
                    observer.next(authSuccess(payload))
                }else{
                    observer.next(authFailure(payload.error==="Not Found" || payload.error==="Invalid Password"?"Invalid Username or Password":payload.error))
                    observer.next(pushToast([toastError(payload.error==="Not Found" || payload.error==="Invalid Password"?"Invalid Username or Password":payload.error, 0)]))
                }
             })
            }),
         catchError((error: any) =>of(authFailure(error.message)))
     )
 }

 const getMenu = (action$: any, store: any)=>{
     return action$.pipe(
         ofType(menuTypes.GET),
         flatMap((action: any)=>{
            return client({
                service: 'graphql',
                csrf: store.value.csrf.token,
                graphqlBody: {
                    query: action.query
                },headers:{
                    authorization:`Bearer ${store.value.user.authToken}`
                }
            })
        }),
         map((data: any) =>data.response),
         map((payload: any) =>graphResponseParser(payload)),
         mergeMap((payload: any)=>{
            return Observable.create((observer: any)=>{
                if(payload.error){
                    observer.next(getMenuFailure(payload.error))
                    observer.next(pushToast([toastError(payload.error==="jwt expired"?
                    "Your Session has Expired":payload.error)]))
                }
                if(!payload.error){
                    observer.next(getMenuSuccess(payload))
                }
            })
        }),
         catchError((error: any) =>of(getMenuFailure(error.message)))
     )
 }

 const getUserData = (action$: any, store: any)=>{
     return action$.pipe(
         ofType(userTypes.GET_USER_DATA),
         flatMap((action: any)=>{
            return client({
                service: 'graphql',
                csrf: store.value.csrf.token,
                graphqlBody: {
                    query: action.query
                },headers:{
                    authorization:`Bearer ${store.value.user.authToken}`
                }
            })
        }),
         map((data: AjaxResponse) =>data.response),
         map((payload: any) =>graphResponseParser(payload)),
         mergeMap((payload: any)=>{
            return Observable.create((observer: any)=>{
                if(payload.error){
                    observer.next(getUserDataFailure(payload.error))
                    observer.next(pushToast([toastError(payload.error==="jwt expired"?
                    "Your Session has Expired":payload.error)]))
                    localStorage.removeItem(localStorageKeys.auth_token)
                    localStorage.removeItem(localStorageKeys.username)
                }else{
                    observer.next(getUserDataSuccess(payload))
                }
             })
        }),
         catchError((error: any) =>of(getUserDataFailure(error.message)))
     )
 }


 const setToast = (action$: any, store: any)=>{
     return action$.pipe(
         ofType(toastType.SET),
         mergeMap((action: any)=>{
                const data = action.send
                let chunks: any
                data.length>4?chunks = arrayChunks(data, 4):chunks = [data]
                const allTimeout = data.map((item: any)=>item.timeOut).sort(sortNumber)
                const aveDelay = allTimeout.reduce(reducer)/data.length
                const maxDelay = allTimeout[0]
                 return Observable.create((observer: any)=>{
                        // tslint:disable-next-line: no-unused-expression
                        chunks.length<2&&observer.next(pushedToast(chunks[0]))
                        timer(0, maxDelay+100).pipe(take(chunks.length-1)).subscribe((x)=>{
                            const delay = chunks[x].map((item: any)=>item.timeOut).sort(sortNumber)[0]
                            setTimeout(observer.next(pushedToast(chunks[x])), delay+3000)
                        })
                    })
        }),
         catchError((error: any) =>of(clearToast()))
     )
 }


 const workSubsriber = (action$: any, store: any)=>{
     return action$.pipe(
         ofType(workTypes.START_SUBSCRIBE_WORKS),
         mergeMap((action: any) =>{
            return Observable.create((observer: any)=>{
                socket$.subscribe(({payload}: any)=>{
                    observer.next({type: workTypes.SUBSRIBE_WORK_IS_RUNNING, payload: graphResponseParser(payload)})
                })
                socket$.next(action.query)
                console.log(action.query)
            }).pipe(
                takeUntil(action$.pipe(ofType(workTypes.STOP_SUBSCRIBE_WORKS)))
            )
        }),
         catchError((error: any) =>of(getMenuFailure(error.message)))
     )
 }

 const cleanerToast =  (action$: any, store: any)=>{
   return action$.pipe(
       ofType(toastType.SETED),
       delay(3000),
       map(()=>clearToast())
    )
}
const logout =  (action$: any, store: any)=>{
    return action$.pipe(
        ofType(userTypes.LOGOUT),
        map(()=>{
            localStorage.removeItem(localStorageKeys.auth_token)
            localStorage.removeItem(localStorageKeys.username)
        })
     )
 }

 const generalGraph =  (action$: any, store: any)=>{
    return action$.pipe(
        ofType(GENERAL_GRAPH),
        flatMap((action: any)=>{
            return client({
                service: 'graphql',
                csrf: store.value.csrf.token,
                graphqlBody: {query: action.query},
                headers:{
                    authorization:`Bearer ${store.value.user.authToken}`
                }
            })
        }),
         map((data: AjaxResponse) =>data.response),
         map((payload: any) =>graphResponseParser(payload)),
         mergeMap((payload: any)=>{
            return Observable.create((observer: any)=>{
                if(payload.error){
                    observer.next(generalGraphFailure(payload.error))
                    observer.next(pushToast([toastError(payload.error==="jwt expired"?
                    "Your Session has Expired":payload.error)]))
                }
                if(!payload.error){
                    observer.next(generalGraphSuccess(payload))
                }
            })
        }),
     )
 }

 const upload = (action$: any, store: any)=>{
    return action$.pipe(
        ofType(UPLOAD),
        map(action=>action),
        mergeMap((action: any)=>{
           return Observable.create((observer: any)=>{
               const progressSubscriber = (a: number)=>observer.next(setUploadPercentage(a, action.pid))
               const responseSubscriber = (a: AjaxResponse)=>observer.next(uploadSuccess(a, action.pid))
               const ctype: any = {}
               ctype['Content-Type'] = action.file[0].type
               client({
                   service: 'Upload-Image',
                   csrf: store.value.csrf.token,
                   body: action.file[0],
                   headers:{
                       authorization:`Bearer ${store.value.user.authToken}`,
                       ...ctype
                    }
                }, {subscriberProgress: progressSubscriber, subscriberResponse: responseSubscriber})
            //    if(payload.error){
            //        observer.next(pushToast([toastError(payload.error==="jwt expired"?
            // "Your Session has Expired":payload.error)]))
            //        localStorage.removeItem(localStorageKeys.auth_token);
            //        localStorage.removeItem(localStorageKeys.username);
            //    }else{
            //        observer.next(uploadSuccess(payload))
            //        observer.next(pushToast([toastSuccess("Upload Success")]))
            })
       })
    )
}

 export const rootEpic =
 (action$: any, store: any)=>
 combineEpics(
    auth,
    getMenu,
    getUserData,
    setToast,
    cleanerToast,
    workSubsriber,
    logout,
    generalGraph,
    upload
 )
 (action$.pipe(
     subscribeOn(queueScheduler)
 ), store)

/**
 *  What we did here is import the action creators that we will need to dispatch as well as the action type that we will need to watch for in the action stream, 
 * and some operators from RxJS as well as the Observable. Note that neither RxJS nor Redux Observable import the operators automatically, 
 * therefore you have to import them by yourself (another option is to import the entire 'rxjs' module in your entry index.js, however I would not recommend this as it will give you large bundle sizes). 
 * Okay, let's go through these operators that we've imported and what they do:
    map - similar to Javascript's native Array.map(), map executes a function over each item in the stream and returns a new stream/Observable with the mapped items.
    of - creates an Observable/stream out of a non-Observable value (it can be a primitive, an object, a function, anything).
    ajax - is the provided RxJS module for doing AJAX requests; we will use this to call the API.
    catch - is used for catching any errors that may have occured
    switchMap - is the most complicated of these. What it does is, it takes a function which returns an Observable, and every time this inner Observable emits a value, 
    it merges that value to the outer Observable (the one upon which switchMap is called). Here's the catch tho, every time a new inner Observable is created, the outer Observable subscribes to it (i.e listens for values and merges them to itself), and cancels all other subscriptions to the previously emitted Observables. This is useful for situations where we don't care whether the previous results have succeeded or have been cancelled. For example, when we dispatch multiple actions for fetching the whiskies we only want the latest result, switchMap does exactly that, it will subscribe to the latest result and merge it to the outer Observable and discard the previous requests if they still haven't completed. When creating POST requests you usually care about whether the previous request has completed or not, and that's when mergeMap is used. mergeMap does the same except it doesn't unsubscribe from the previous Observables.
 */