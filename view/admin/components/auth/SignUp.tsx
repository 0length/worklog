import React, {useState} from 'react'
import { Button, Checkbox, Input, ToastCard } from '../element'

const SignUp: React.FC<any> = ({setMode, auth, error}) => {
    const [name, setName] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    return (
        <div className="wl-login__signup">
            <div className="wl-login__head">
                <h3 className="wl-login__title">Sign Up</h3>
                <div className="wl-login__desc">Enter your details to create your account:</div>
            </div>
            {error && <ToastCard message={error} timeOut={0}  idx={0} created_at={new Date()+""} type="danger"/>}
            <div className="wl-login__form">
                {/* <form className="wl-form" action=""> */}
                    <div className="form-group">
                        <Input
                            {...{styleProfile: {auth:true}}}
                            onChange={(e: any)=>{setName(e.target.value)}}
                            value={name}
                            type="text"
                            placeholder="Fullname"
                            name="fullname"
                        />
                    </div>
                    <div className="form-group">
                        <Input
                            {...{styleProfile: {auth:true}}}
                            onChange={(e: any)=>{setUsername(e.target.value)}}
                            value={username}
                            type="text"
                            placeholder="Username"
                            name="username"
                        />
                    </div>
                    <div className="form-group">
                        <Input
                            {...{styleProfile: {auth:true}}}
                            onChange={(e: any)=>{setEmail(e.target.value)}}
                            value={email}
                            type="text"
                            placeholder="Email"
                            name="email"
                        />
                    </div>
                    <div className="form-group">
                        <Input
                            {...{styleProfile: {auth:true}}}
                            onChange={(e: any)=>{setPassword(e.target.value)}}
                            value={password}
                            type="password"
                            placeholder="Password"
                            name="password"
                        />
                    </div>
                    <div className="form-group">
                        <Input {...{styleProfile: {auth:true, last: true}}} value={password} className="form-control-last" type="password" placeholder="Confirm Password" name="rpassword" />
                    </div>
                    <div className="wl-login__extra">
                        <Checkbox name="agreement">I Agree the terms and conditions.</Checkbox>
                    </div>
                    <div className="wl-login__actions">
                        <Button onClick={(e: any)=>auth(`mutation { signup(name: "${name}", username: "${username}", email: "${email}", password: "${password}") { token, user {name, username, email} } } `)} id="kt_login_signup_submit" className="btn btn-brand btn-pill btn-elevate">Sign Up</Button>
                        <Button onClick={(e: any)=>{setMode('SignIn')}} id="kt_login_signup_cancel" className="btn btn-outline-brand btn-pill">Cancel</Button>
                    </div>
                {/* </form> */}
            </div>
        </div>
    )
}

export default SignUp