import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";

import Home from "./Navbar/Homepage.js";
import PhotoGallery from "./Gallery/gallery.js";



export default function Sandbox() {
  return (
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/gallery" element={<PhotoGallery />} />
        <Route path="/" element= {<Navigate replace to="/home" />} />
      </Routes>
  );

}