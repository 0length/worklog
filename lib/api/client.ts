import { ajax } from "rxjs/ajax";

export interface GraphQlBody {
    variables?: string;
    operationName?: string|null;
    query: string;
}
export interface AgentOption {
    method?: string;
    url: string;
    csrf: string;
    service?: string;
    credential?: boolean|null|undefined 
    graphqlBody?: GraphQlBody;
    header?:any;
    body?: any;
}

const cainedOption: any = (aO: AgentOption)=>{
    
    let finalOption: any = {
        url: `${aO.url}`,
        method: 'GET',
        withCredentials : true,
        headers: {
            'CSRF-Token': `:(`,
        }
    }

    aO.method ? finalOption.method = aO.method : null
    aO.credential ? finalOption.withCredentials = aO.credential : null
    aO.csrf ? finalOption.headers['CSRF-Token'] = aO.csrf : null

    
    switch(aO.service){
        case 'graphql':
            const {graphqlBody} = aO
            finalOption.method = 'POST'
            finalOption.headers['content-type'] = 'application/json'
            finalOption.headers['Accept'] = 'application/json'
            const initBody = {variables: {},operationName: null,query: ''}
            graphqlBody ?finalOption.body = {...initBody, ...graphqlBody}:finalOption.body = initBody
        break;
    }

    
    return finalOption
}

const client = (customOption: AgentOption)=>{
    return ajax(cainedOption(customOption))
}
export default client
