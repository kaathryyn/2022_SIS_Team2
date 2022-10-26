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
                alert("Unable to sign up");
            });
    };

    return (
        <div className="register-div">
            <a href="/home">
                <img alt="Main Logo" src={logo} className="main-logo"></img>
            </a>
            <div className="register-card">
                <form className="register-form">
                    <h1 className="register-header">Sign Up</h1>
                    <TextField
                        label="Name"
                        variant="standard"
                        required
                        value={fullName}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        variant="standard"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="standard"
                        type={"password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        label="Confirm Password"
                        variant="standard"
                        type={"password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button className="signup-button" type="submit" onClick={onFinish}>Sign Up</button>
                </form>
            </div>
        </div>
    );
}
export default SignUp;
