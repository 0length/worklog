import React, { useState } from 'react'
import { Button, Checkbox, Input } from '../element'

const SignIn: React.FC<any> = ({setMode, auth})=>{
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    return(
    <div className="wl-login__signin">
        <div className="wl-login__head" style={{
            
            // margin: '3rem 0',
            // textAlign: 'center'
        }}>
            <h3 className="wl-login__title">Sign In To Admin</h3>
        </div>
        <div className="wl-login__form">
            <div className="form-group">
                <Input {...{styleProfile: {auth:true}}} onChange={(e:any)=>{setEmail(e.target.value)}} type="text" placeholder="Email" name="email" />
            </div>
            <div className="form-group">
                <Input {...{styleProfile: {auth:true, last: true}}} onChange={(e: any)=>{setPassword(e.target.value)}} className="form-control-last" type="password" placeholder="Password" name="password" />
            </div>
            <div className="wl-login__extra" style={{
                marginTop: '2rem',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Checkbox name="rememberMe">Remember Me</Checkbox>
                <a onClick={()=>{setMode('Forgot')}} id="kt_login_forgot" style={{
                    fontWeight: 500,
                    color:'#595d6e',
                    transition: 'color .3s ease',
                    display: 'inline-block',
                }}>Forget Password ?</a>
            </div>
            <div className="wl-login__actions" >
                <Button onClick={()=>auth(`mutation { login(email: "${email}", password: "${password}") { token, user { name, username, email} } } `)} id="kt_login_signin_submit" {...{styleProfile: {primary: true}}} className="btn btn-brand btn-pill btn-elevate">Sign In</Button>
            </div>
        </div>
    </div>
    )
}

export default SignIn