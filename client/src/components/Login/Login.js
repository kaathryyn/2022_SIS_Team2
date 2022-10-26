import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import axios from "axios";
import { TextField } from "@mui/material";
import logo from "../../Assets/Main-Logo.png";


export default function Login(){
    let history = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onFinish = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/login", {
            ...{
                email: email,
                password: password
            }
        }).then((res) => {
            localStorage.setItem("user", res.data);
            history("/home");
        })
        .catch((err) => {
            console.log(err)
            alert("Unable to login");
        });
    };

    return(
        <div className="login-div">
            
              <a href="/home">  
            <img
                alt="Main Logo"
                src={logo}
                className="main-logo"    
            ></img>
            </a>
            <div className="login-card">
                <form className="login-form">
                    <h1 className="form-header"> Login</h1>
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
                    <Link to="/forgotpassword"
                        className="forgot-password"> Forgot Password?</Link>
                    <div className="button-div">
                        <button className="login-button" type="submit" onClick={onFinish}>Login</button>
                        <Link to="/Signup">
                            <button className="register-button">Sign Up</button>
                        </Link>    
                    </div>
                </form>
            </div>
        </div>
    )
}
