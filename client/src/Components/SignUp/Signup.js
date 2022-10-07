import React from 'react';
import logo from "../../Assets/Main-Logo.png";
import { Link } from "react-router-dom";
import './signup.css'
function SignUp() {
    
    return(
      <div className="register-div">
        <div className="register-card">
            <form className="register-form">
                <h1 className="register-header">Register</h1>
                <div className="first-name-div">
                    <h3 className="first-name-label">First Name</h3>
                    <input className="register-input-field"></input>
                </div>
                <div className="last-name-div">
                    <h3 className="last-name-label">Last Name</h3>
                    <input className="register-input-field"></input>
                </div>
                <div className="register-email-div">
                    <h3 className="register-email-label">Email</h3>
                    <input className="register-input-field"></input>
                </div>
                <div className="register-password-div">
                    <h3 className="register-password-label">Password</h3>
                    <input className="register-input-field"></input>
                </div>
                <div className="confirm-password-div">
                    <h3 className="confirm-password-label">Confirm Password</h3>
                    <input className="register-input-field"></input>
                </div>
                <Link to="/login">
                    <button className="signup-button">Sign Up</button>
                </Link>
                
            </form>
        </div>
      </div>      
    )       
}
export default SignUp;