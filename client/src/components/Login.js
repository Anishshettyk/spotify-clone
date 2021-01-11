import React from 'react';

const LoginURL =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8000/login'
    : 'https://spotify-clone-rne.herokuapp.com/login';

const Login = () => (
  <div>
    <h1>Login to spotify</h1>
    <a href={LoginURL}>Login to spotify</a>
  </div>
);

export default Login;
