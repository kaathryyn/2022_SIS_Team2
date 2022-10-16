import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import './App.css';

import Login from "./Components/Login/Login.js";
import Signup from "./Components/SignUp/Signup.js";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword.js";
import Sandbox from "./Components/Sandbox";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route
          exact path="/*"
          element={
            true
            ? (<Sandbox />)
            : (<Navigate replace to="/login" />)
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;