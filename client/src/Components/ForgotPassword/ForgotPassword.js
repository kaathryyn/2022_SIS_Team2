import "./ForgotPassword.css";

import logo from "../../Assets/Main-Logo.png";

function ForgotPassword(){
    return(
        <div className="forgot-div">
            <img
                    alt="Main Logo"
                    src={logo}
                    className="main-logo"
            ></img>
            <div className="forgot-card">
                <form className="forgot-form">
                    <h1 className="forgot-header">Forgot Password?</h1>
                    <div className="email-div">
                        <h3 className="email-label">Email</h3>
                        <input className="forgot-input-field"></input>
                    </div>
                    <div className="new-password-div">
                        <h3 className="new-password-label">New Password</h3>
                        <input className="forgot-input-field"></input>
                    </div>
                    <div className="confirm-password-div">
                        <h3 className="confirm-password-label"> Confirm Password</h3>
                        <input className="forgot-input-field"></input>
                    </div>
                    <button className="reset-button">Reset</button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword;