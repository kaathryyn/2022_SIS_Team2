import './App.css';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import app from './firebase';

function App() {

  const auth = getAuth(app);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (app) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        alert("Successfully created an account");
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMsg = err.message;
        console.log("Error - New account cannot be created")
        alert(errorCode);
      })
  }

  return (
    <div className="App">
      <input type={"email"} placeholder="Please enter your email address" onChange={(e) => setEmail(e.target.value)}/>
      <input type={"password"} placeholder="Please enter your password" onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={signUp}>Register</button>
    </div>
  );
}

export default App;
