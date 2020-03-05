const GOOGLEDRIVE: string = '/api/gdrive/'
const GRAPHQL: string = '/graphql'

interface EndPoint {
    [key: string]: string
}

const endPoint: EndPoint= {
    GOOGLEDRIVE,
    GRAPHQL,
}

export default endPoint