import {BrowserRouter, Routes, Route} from "react-router-dom";

import './App.css';

//Importing Components
import Login from "./Components/Login/Login.js";
import Signup from "./Components/SignUp/Signup.js";
import Home from "./Components/Navbar/Homepage.js";
import Gallery from "./Components/Navbar/Galleryexample.js";
function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <div className="App">
              <Login/>
            </div>
              
          }  
        />
         <Route
          path="/gallery"
          element={
            <div className="App">
              <Gallery/>
            </div>
              
          }  
        />
         <Route
          path="/signup"
          element={
            <div className="App">
            
            <Signup/>
            </div>
          }
        />
          <Route
          path="/home"
          element={
            <div className="App">
            
            <Home/>
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );

}


export default App;