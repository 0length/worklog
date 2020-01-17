import { i, s, a } from "./jwtGen";

const jwt = require('jsonwebtoken');
const fs = require('fs');
let publicKEY  = fs.readFileSync('./app/lib/jwt-key/public.key', 'utf8');

var verifyOptions = {
    issuer:  i,
    subject:  s,
    audience:  a,
    expiresIn:  "12h",
    algorithm:  ["RS256"]
   };

function getUserId(context: any){
    const Authorization = context.token
 
    if(Authorization){
        const token = Authorization.replace('Bearer ', '')
    //     console.log(token)
        const { userId } = jwt.verify(token, publicKEY, verifyOptions)
            console.log(userId)
        return userId
    }

    throw new Error('Not Authenticated')
}

export  {
     getUserId
}