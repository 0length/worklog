const jwt = require('jsonwebtoken');
const APP_SECRET: string = 'GraphQL-is-aw3some'

function getUserId(context: any){
    const Authorization = context.request.get('Authorization')
    if(Authorization){
        const token = Authorization.replace('Bearer ', '')
        const { userId } = jwt.verify(token, APP_SECRET)
        return userId
    }

    throw new Error('Not Authenticated')
}

export  {
    APP_SECRET, getUserId
}