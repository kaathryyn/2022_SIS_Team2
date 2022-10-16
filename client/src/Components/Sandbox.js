import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";

import Home from "./Navbar/Homepage.js";
import Gallery from "./Navbar/Galleryexample.js";
import Camera from "./Upload/camera.js";
import AllCameras from "./Upload/AllCameras.js";

export default function Sandbox() {
  return (
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/" element= {<Navigate replace to="/home" />} />
      </Routes>
  );

}