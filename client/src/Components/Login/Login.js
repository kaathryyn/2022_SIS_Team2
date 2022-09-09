import "./Login.css";

function Login(){
    return(
        <div className="login-div">
            <div className="login-card">
                <form className="login-form">
                    <h1 className="form-header"> login</h1>
                    <div className="username-div">
                        <h3 className="username-label">username</h3>
                        <input className="input-field">

                        </input>
                    </div>
                    <div className="password-div">
                        <h3 className="password-label">password</h3>
                        <input className="input-field">
                        
                        </input>
                        <h3 className="forgot-password">forgot password</h3>
                    </div>
                    <div className="button-div">
                        <button className="login-button">login</button>
                        <button className="register-button">register</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Login;