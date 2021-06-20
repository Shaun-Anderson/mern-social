import React from 'react';
import { useStore } from '../../common/useStore'
import { GoogleLogin } from 'react-google-login';

export default function Login() {
  const { authStore: { isAuthorized } } = useStore()

  const login = () => {
    window.open("http://localhost:4000/auth/google", "_self");
  }
  
  const responseGoogle = (response: any) => {
    console.log(response);
  }
  const GoogleClientId: string | undefined = process.env.REACT_APP_GOOGLE_CLIENTID
  console.log(process.env)
  console.log(GoogleClientId)
  return (
  //   <GoogleLogin
  //   clientId={GoogleClientId as string}
  //   buttonText="Login with Google"
  //   onSuccess={responseGoogle}
  //   onFailure={responseGoogle}
  //   cookiePolicy={'single_host_origin'}
  // />

  <a onClick={login}>Login</a>

  );
}

