import endPoint from "../const/endpoint"
import { Observable, Subscriber } from 'rxjs'
import { ajax, AjaxRequest, AjaxResponse } from 'rxjs/ajax'
import { map } from 'rxjs/operators'
import { ofType, unionize } from 'unionize'
import fixDecimal from "../utils/fixDecimal"

interface PE extends Event {
    readonly lengthComputable: boolean
    readonly loaded: number
    readonly total: number
}

export const AjaxUpdate = unionize(
    {
        ProgressEvent: ofType<PE>(),
        Response: ofType<AjaxResponse>(),
    },
    `tag`,
    `value`
)
export type AjaxUpdateType = typeof AjaxUpdate._Union

export const ajaxWithUpdates = (request: AjaxRequest): Observable<AjaxUpdateType> =>
    new Observable<AjaxUpdateType>(subscriber => {
        const progressSubscriber = new Subscriber<PE>(
            progressEvent => subscriber.next(AjaxUpdate.ProgressEvent(progressEvent)),
            error => subscriber.error(error),
            // Forward next and error but not complete
            // When progress is complete, we send the response *then* complete.
            // tslint:disable-next-line: no-empty
            () => {},
        )
        const ajax$ = ajax({
            ...request,
            progressSubscriber,
        })
        const subscription = ajax$
            .pipe(map(ajaxResponse => AjaxUpdate.Response(ajaxResponse)))
            .subscribe(subscriber)
        return () => subscription.unsubscribe()
    })


export interface GraphQlBody {
    variables?: string
    operationName?: string|null
    query: string
}
export interface AgentOption {
    method?: string
    url?: string
    csrf: string
    service?: string
    credential?: boolean|null|undefined
    graphqlBody?: GraphQlBody
    headers?:any
    body?: any
}

const cainedOption: any = (aO: AgentOption)=>{

    const finalOption: any = {
        url: '',
        method: 'GET',
        withCredentials : true,
        headers: {
            'CSRF-Token': `:(`,
        }
    }

    // tslint:disable-next-line: no-unused-expression
    aO.method ? finalOption.method = aO.method : null
    // tslint:disable-next-line: no-unused-expression
    aO.url ? finalOption.url = aO.url : null
    // tslint:disable-next-line: no-unused-expression
    aO.credential ? finalOption.withCredentials = aO.credential : null
    // tslint:disable-next-line: no-unused-expression
    aO.headers && aO.headers.authorization ? finalOption.headers.Authorization = aO.headers.authorization : null
    // tslint:disable-next-line: no-unused-expression
    aO.headers && aO.headers['Content-Type'] ? finalOption.headers['Content-Type'] = aO.headers['Content-Type'] : null
    // tslint:disable-next-line: no-unused-expression
    aO.csrf ? finalOption.headers['CSRF-Token'] = aO.csrf : null
    // tslint:disable-next-line: no-unused-expression
    aO.body ? finalOption.body = aO.body : null


    switch(aO.service){
        case 'graphql':
            const {graphqlBody} = aO
            finalOption.method = 'POST'
            finalOption.url = endPoint.GRAPHQL
            finalOption.headers['content-type'] = 'application/json'
            finalOption.headers.Accept = 'application/json'
            const initBody = {variables: {},operationName: null,query: ''}
            graphqlBody ?finalOption.body = {...initBody, ...graphqlBody}:finalOption.body = initBody
        break;
        case 'Upload-Image':
            finalOption.method = 'POST'
            finalOption.url = endPoint.GOOGLEDRIVE
            finalOption.headers.Accept = 'application/json'
        break
    }

    return finalOption
}

interface ClientSubscriber{
    subscriberProgress?: (percentage: any)=>void
    subscriberResponse?: (response: any)=>void
}

const client = (customOption: AgentOption, s: any = {})=>{

    if(s && s.subscriberProgress && s.subscriberResponse){
        console.log("withUpdate", cainedOption(customOption), customOption)
        return ajaxWithUpdates(cainedOption(customOption)).subscribe(
            AjaxUpdate.match({
                ProgressEvent: progressEvent => {
                    const percentage = fixDecimal((progressEvent.loaded / progressEvent.total) * 100);
                    // tslint:disable-next-line: no-unused-expression
                    s && s.subscriberProgress&& s.subscriberProgress(percentage)
                },
                Response: _ajaxResponse => {
                    // tslint:disable-next-line: no-unused-expression
                    s && s.subscriberResponse && s.subscriberResponse(_ajaxResponse.response)
                },
            })
        )
    }else{
        return ajax(cainedOption(customOption))
    }
}
export default client
