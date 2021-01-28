import React from "react";
import styled from "styled-components/macro";
import spotify_logo from "./../assets/spotify-logo.png";

import { mixins } from "../styles";

const Container = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
  width: 100%;
  height: 90vh;
  img {
    width: 100px;
    height: 100px;
  }
  p {
    margin-top: 20px;
  }
`;

const Loader = () => (
  <Container>
    <img src={spotify_logo} alt="spotify logo" />
    <p>Spotify is thinking...</p>
  </Container>
);

export default Loader;
