import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';

//Importing Components
import Login from "./Components/Login/Login.js";
<<<<<<< HEAD
import Signup from "./Components/Signup/Signup.js";

=======
import Navbar from "./Components/Navbar/sidebar.js";
>>>>>>> ccddadee631f2d639a6b791b82b7eb046a1f0119
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
      </Routes>
    </BrowserRouter>
  );

}
export default App;