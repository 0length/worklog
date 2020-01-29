import { i, s, a } from "./generator";

const jwt = require('jsonwebtoken');
const fs = require('fs');
let publicKEY  = fs.readFileSync('./app/lib/common-keys/jwt/public.key', 'utf8');

var verifyOptions = {
    issuer:  i,
    subject:  s,
    audience:  a,
    expiresIn:  "12h",
    algorithm:  ["RS256"]
   };

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