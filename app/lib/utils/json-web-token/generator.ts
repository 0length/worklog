import fs from 'fs'
import jwt from 'jsonwebtoken'
const  privateKEY  = fs.readFileSync('./app/lib/common-keys/jwt/private.key', 'utf8')


export const i  = 'Mysoft corp'
export const s  = 'some@user.com'
export const a  = 'http://mysoftcorp.in'
const signOptions: any = {
 issuer:  i,
 subject:  s,
 audience:  a,
 expiresIn:  "12h",
 algorithm:  "RS256"   // RSASSA [ "RS256", "RS384", "RS512" ]
}

const tokenGenerator = (payload: any)=>{
    const token = jwt.sign(payload, privateKEY, signOptions)
    console.log("TOKEN:"+token)
    return token
}

export  {
    tokenGenerator
}