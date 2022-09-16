import "./signup.css";

import logo from "../../Assets/Main-Logo.png";

function Signup(props){
    console.log(props.history)
    return(
        <div className="signup-div">
                <img
                    alt="Main Logo"
                    src={logo}
                    className="main-logo"
                ></img>
            <div className="SignUp-card">
                <form className="SignUp-form">
                    <h1 className="form-header"> Register</h1>
                    <div className="FirstName-div">
                        <h3 className="username-label">FirstName</h3>
                        <input className="input-field">

                        </input>
                    </div>

                    <div className="LastName-div">
                        <h3 className="username-label">LastName</h3>
                        <input className="input-field">

                        </input>
                    </div>

                    <div className="username-div">
                        <h3 className="username-label">Username</h3>
                        <input className="input-field">

                        </input>
                    </div>
                    <div className="password-div">
                        <h3 className="password-label">Password</h3>
                        <input className="input-field">
                        </input>
                        
                    </div>
                    <div className="Password-div">
                    <h3 className="forgot-password">ConformYourPassword?</h3>
                        <input className="input-field">

                        </input>
                    </div>
                    <div className="button-div">
                        <button className="login-button">Signup</button>
                        <button className="register-button" onClick={() => props.history.push("/Login")}>Login</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Signup;