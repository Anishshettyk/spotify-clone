import React from "react";
import styled from "styled-components";
import { theme } from "../styles";

const { colors } = theme;
const NotFoundContainer = styled.main`
  margin-bottom: ${theme.visibleBottom};
  position: relative;
  min-height: 100vh;
  width: 100%;
  color: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  .container-inside {
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .container-inside h1 {
    margin: 0;
    font-size: clamp(160px, 50vw, 320px);
    background: linear-gradient(
      to top,
      ${colors.green},
      ${colors.lightestGrey}
    );
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -ms-background-clip: text;
    -o-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
    -o-text-fill-color: transparent;
    -ms-text-fill-color: transparent;
  }
  .container-inside h4 {
    font-size: 30px;
    letter-spacing: 3px;
  }
  a {
    text-decoration: none;
    margin-top: 50px;
    border: 3px solid transparent;
    border-image: linear-gradient(
      to right,
      ${colors.green} 0%,
      ${colors.lightestGrey} 100%
    );
    border-image-slice: 1;
    background-color: #000;
    color: ${colors.white};
    line-height: 1;
    box-shadow: 2px 2px 10px 5px rgba(26, 26, 26, 0.6);
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    padding: 0.7rem 1.3rem;
    transition: none;
  }
  a:hover {
    border-image: linear-gradient(
      to right,
      ${colors.lightestGrey} 0%,
      ${colors.green} 100%
    );
    border-image-slice: 1;
    color: ${colors.white};
    outline: none;
    box-shadow: 0px 0px 5px 5px rgba(26, 26, 26, 0.6);
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer className="container">
      <div className="container-inside">
        <h1>404</h1>
        <h4>Page not found!!</h4>
        <a href="/">back to home</a>
      </div>
    </NotFoundContainer>
  );
};

export default NotFound;
