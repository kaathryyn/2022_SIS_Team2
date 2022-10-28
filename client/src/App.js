import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import './App.css';
import PhotoGallery from "./Components/Gallery/gallery.js";
import Login from "./Components/Login/Login.js";
import Signup from "./Components/SignUp/Signup.js";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword.js";
import Sandbox from "./Components/Sandbox";
import WebcamSample from "./Components/Upload/webcam";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/gallery" element={<PhotoGallery/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/camera" element={<WebcamSample />} />
        
        <Route
          exact path="/*"
          element={
            localStorage.getItem("user")
            ? (<Sandbox />)
            : (<Navigate replace to="/login" />)
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
