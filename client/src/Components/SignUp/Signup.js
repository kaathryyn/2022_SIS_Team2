import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField } from "@mui/material";
import logo from "../../Assets/Main-Logo.png";
import "./signup.css";

function SignUp() {
    let history = useNavigate();
    const [email, setEmail] = useState("");
    const [fullName, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const onFinish = (e) => {
        e.preventDefault();
        if ( (password === confirmPassword) && (fullName.length > 0) && (email.length > 0)) {
            axios
            .post("http://localhost:3001/signup", {
                ...{
                    email: email,
                    name: fullName,
                    password: password,
                },
            })
            .then((res) => {
                localStorage.setItem("user", res.data);
                history("/login");
            })
            .catch((err) => {
                console.log(err);
                alert("Unable to sign up!");
            });
        } else {
            console.log("Cannot create new user");
            alert("Unable to sign up! Please ensure all fields have been filled and that passwords match.");
        }
        
    };

    return (
        <div className="register-div">
            <img alt="Main Logo" src={logo} className="main-logo"></img>
            <div className="register-card">
                <form className="register-form">
                    <h1 className="register-header">Sign Up</h1>
                    <TextField
                        label="Name"
                        variant="standard"
                        margin = "normal"
                        autoFocus="true"
                        required
                        value={fullName}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        variant="standard"
                        margin = "normal"
                        type={"email"}
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="standard"
                        margin = "normal"
                        type={"password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        label="Confirm Password"
                        variant="standard"
                        margin = "normal"
                        type={"password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className="button-div">
                        <button className="signup2-button" type="submit" onClick={onFinish}>Sign Up</button>
                        <Link to="/">
                            <button className="login2-button">Back to Login</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default SignUp;
