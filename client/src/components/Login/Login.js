import "./Login.css";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar.js"
import logo from "../../Assets/Main-Logo.png";
import React from 'react';

function Login(){
    return(
        <React.Fragment>   
        <Navbar>
       </Navbar>
        <div className="login-div">
                <img
                    alt="Main Logo"
                    src={logo}
                    className="main-logo"
                ></img>
            <div className="login-card">
                <form className="login-form">
                    <h1 className="form-header"> Login</h1>
                    <div className="username-div">
                        <h3 className="username-label">Username</h3>
                        <input className="input-field"></input>
                    </div>
                    <div className="password-div">
                        <h3 className="password-label">Password</h3>
                        <input className="input-field"></input>
                        <h3 className="forgot-password">Forgot Password?</h3>
                    </div>
                        <Link to="/forgotpassword"
                        className="forgot-password"> Forgot Password?</Link>
                    <div className="button-div">
                        <button className="login-button">Login</button>
                        <Link to="/Signup">
                            <button className="register-button">Register</button>
                        </Link>    
                    </div>
                </form>
            </div>
        </div>
        </React.Fragment>
    )
}

export default Login;