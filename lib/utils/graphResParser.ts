
interface GraphResponse {
    data: Data
    errors?: Array<Error|any>
}

interface Data {
    [index: string]: Array<any>;
}

interface Error {
    message: string;
    locations?: any;
    path?: any;
    extentions?: any;
}

const graphResponseParser = (payload: GraphResponse)=>{
    if(payload.errors){return {error: payload.errors[0].message}}
    if(!payload.errors){return payload.data[Object.keys(payload.data)[0]]}
}

export default graphResponseParser