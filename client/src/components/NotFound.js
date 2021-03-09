import React from "react";
import styled from "styled-components";
import { theme } from "../styles";
import { Link } from "@reach/router";

const { colors } = theme;
const NotFoundContainer = styled.main`
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  h1 {
    font-size: 10rem;
  }
`;
const BackToHomeButton = styled(Link)`
  background-color: ${colors.green};
  padding: 10px 20px;
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <h1>404</h1>
      <p>Something went wrong. it's us not you</p>
      <BackToHomeButton to="/">Back to home</BackToHomeButton>
    </NotFoundContainer>
  );
};

export default NotFound;
