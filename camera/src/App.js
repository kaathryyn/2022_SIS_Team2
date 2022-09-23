import React from "react";
import "./App.css";
 
import AllCameras from "./AllCameras";
import Camera from "./camera";
 
export default function App() {
  return (
    <div className="App">
     <AllCameras/>
     <Camera/>
    </div>
  );
}