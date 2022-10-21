import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import './App.css';
import Gallery from "./Components/Navbar/Galleryexample.js";
import Login from "./Components/Login/Login.js";
import Signup from "./Components/SignUp/Signup.js";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword.js";
import Sandbox from "./Components/Sandbox";
import Camera from "./Components/Upload/camera.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/camera" element={<Camera />} />
        
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