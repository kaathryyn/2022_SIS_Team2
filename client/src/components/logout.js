import { GoogleLogout } from 'react-google-login';

function Login() {

    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
    
    }

    const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res);

    }

    return(
    <div id="signInButton">
        <GoogleLogin
            ClientId={clientId}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
            />
    </div>
    )
}

export default Logout; 