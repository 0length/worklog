const GOOGLEDRIVE: string = '/api/gdrive/'
const GRAPHQL: string = '/graphql'
const GRAPHQL_PUBLIC: string = '/api/graph/'
interface EndPoint {
    [key: string]: string
}

const endPoint: EndPoint= {
    GOOGLEDRIVE,
    GRAPHQL,
    GRAPHQL_PUBLIC,
}

export default endPoint