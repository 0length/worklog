const fs = require('fs');
const jwt = require('jsonwebtoken');
let privateKEY  = fs.readFileSync('./app/lib/jwt-key/private.key', 'utf8');


export const i  = 'Mysoft corp';   
export const s  = 'some@user.com';   
export const a  = 'http://mysoftcorp.in';
const signOptions = {
 issuer:  i,
 subject:  s,
 audience:  a,
 expiresIn:  "12h",
 algorithm:  "RS256"   // RSASSA [ "RS256", "RS384", "RS512" ]
};

const jwtGen = (payload: any)=>{
    let token = jwt.sign(payload, privateKEY, signOptions)
    console.log("TOKEN:"+token)
    return token
}

export  {
    jwtGen
}