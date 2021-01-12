import React from 'react';
import spotify_logo from './../assets/spotify-logo.png';
import styled from 'styled-components/macro';
import { theme, mixins, Main } from './../styles';

const { colors } = theme;

const StyledLoginContainer = styled(Main)`
  ${mixins.flexColumn};
  min-height: 100vh;
  img {
    width: 200px;
    height: 200px;
    object-fit: contain;
  }
  .loginButton {
    display: inline-block;
    background-color: ${colors.green};
    color: ${colors.white};
    border-radius: 30px;
    padding: 17px 35px;
    margin: 70px 0 70px;
    min-width: 160px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-align: center;
    &:hover,
    &:focus {
      background-color: ${colors.offGreen};
    }
  }
  a {
    color: ${colors.blue};
    padding: 10px;
  }
  p {
    text-align: center;
  }
`;

const LoginURL =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8000/login'
    : 'https://spotify-clone-rne.herokuapp.com/login';

const Login = () => (
  <StyledLoginContainer>
    <img src={spotify_logo} alt="spotify logo" />
    <a href={LoginURL} className="loginButton">
      Login to spotify
    </a>
    <p>
      Don't have a account?
      <br /> <a href="https://www.spotify.com/in/signup/">Sign up</a>
    </p>
  </StyledLoginContainer>
);

export default Login;
