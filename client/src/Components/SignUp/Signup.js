import React from 'react';
import logo from "../../Assets/Main-Logo.png";
import { Link } from "react-router-dom";
import './signup.css'
import Navbar from "../Navbar/Navbar.js"
function SignUp() {
    
    return(
        <React.Fragment>   
                <Navbar>
               </Navbar>
      <div className="form">
                
        <img
                    alt="Main Logo"
                    src={logo}
                    className="main-logo"
                ></img>
          <div className="form-body">
              <div className="username">
                  <label className="form__label" for="firstName">First Name </label>
                  <input className="form__input" type="text" id="firstName" placeholder="First Name"/>
              </div>
              <div className="lastName">
                  <label className="form__label" for="lastName">Last Name </label>
                  <input  type="text" name="" id="lastName"  className="form__input"placeholder="LastName"/>
              </div>
              <div className="email">
                  <label className="form__label" for="email">Email </label>
                  <input  type="email" id="email" className="form__input" placeholder="Email"/>
              </div>
              <div className="password">
                  <label className="form__label" for="password">Password </label>
                  <input className="form__input" type="password"  id="password" placeholder="Password"/>
              </div>
              <div className="confirm-password">
                  <label className="form__label" for="confirm">Confirm </label>
                  <input className="form__input" type="password" id="confirm" placeholder="Confirm"/>
              </div>
          </div>
          <div class="footer">
              <button type="submit" class="btn">Register</button>
          </div>
          
          
      </div>      
      </React.Fragment>
    )       
}
export default SignUp;