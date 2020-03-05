import React from "react"
import { Button, Input } from '../element'

const Forgot: React.FC<any> = ({setMode}) => {
    return (
        <div className="kt-login__forgot">
            <div className="kt-login__head">
                <h3 className="kt-login__title">Forgotten Password ?</h3>
                <div className="kt-login__desc">Enter your email to reset your password:</div>
            </div>
            <div className="kt-login__form">
                <form className="kt-form" action="">
                    <div className="form-group">
                        <Input
                            {...{styleProfile: {auth:true, last: true}}}
                            type="text"
                            placeholder="Email"
                            name="email"
                            id="kt_email"
                        />
                    </div>
                    <div className="kt-login__actions">
                        <Button
                            id="kt_login_forgot_submit"
                            className="btn btn-brand btn-pill btn-elevate"
                        >
                            Request
                        </Button>
                        <Button
                            onClick={()=>{setMode('SignIn')}}
                            id="kt_login_forgot_cancel"
                            className="btn btn-outline-brand btn-pill"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Forgot