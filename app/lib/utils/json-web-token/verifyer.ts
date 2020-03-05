import { i, s, a } from "./generator"

import jwt from 'jsonwebtoken'
import fs from 'fs'
const publicKEY  = fs.readFileSync('./app/lib/common-keys/jwt/public.key', 'utf8')

const verifyOptions = {
    issuer:  i,
    subject:  s,
    audience:  a,
    expiresIn:  "12h",
    algorithm:  ["RS256"]
   }

function getUserId(context: any){
    const Authorization = context.token
     if(Authorization !==":("){
        const token = Authorization.replace('Bearer ', '')
        const { userId } = jwt.verify(token, publicKEY, verifyOptions)
        return userId
    }

    throw new Error('Not Authenticated')
}

export  {
     getUserId
}