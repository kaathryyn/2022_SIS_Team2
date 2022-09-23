import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';

//Importing Components
import Login from "./Components/Login/Login.js";
import Signup from "./Components/SignUp/Signup.js";
import Navbar from "./Components/Navbar/sidebar.js";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword.js";

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
          path="/navbar"
          element={
            <div className="App">
              <Navbar/>
            </div>
              
          }  
        />
         <Route
          path="/Signup"
          element={
            <div className="App">
            
            <Signup/>

            </div>
          }
        />
          <Route
          path="/forgotpassword"
          element={
            <div className="App">
            
            <ForgotPassword/>

            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );

}
export default App;