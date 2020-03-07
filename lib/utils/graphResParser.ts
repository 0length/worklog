import { User, Work, Menu, Group, Post, Comment } from "../../global-types"

interface GraphResponse {
    data: Data
    errors?: Error[]|any[]
}

interface Data {
    [index: string]: User[]|Work[]|Menu[]|Group[]|Post[]|Comment[]|any
}

interface Error {
    message: string
    locations?: any
    path?: any
    extentions?: any
}

export interface HaveError {
    error: Error
}

const graphResponseParser = (payload: GraphResponse)=>{
    if(payload.errors){return {error: payload.errors[0].message}}
    if(!payload.errors){return payload.data[Object.keys(payload.data)[0]]}
}

export default graphResponseParser