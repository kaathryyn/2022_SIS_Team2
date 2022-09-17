import logo from './logo.svg';
import logo from './logo.svg';
import { useEffect } from 'react';
import './App.css';

function App() {

  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token: " + response.credential);
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "http://142949275743-6tsrqr5ktajvn1rel7dm06kktlcc1gs0.apps.googleusercontent.com/",
      callback: handleCallbackResponse
  });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }

    );
  }, []);
  
  
  return (
    <div className="App">
      <div id="signInDiv"></div>
    </div>
  );
}

export default App;
