import React from "react";
import styled from "styled-components/macro";
import spotifyGIF from "./../assets/spotifyGIF.gif";
import { mixins } from "../styles";

const Container = styled.div`
  ${mixins.flexCenter};
  width: 100%;
  height: 90vh;
`;

const Loader = () => (
  <Container>
    <img src={spotifyGIF} alt="spotify logo gif" />
  </Container>
);

export default Loader;
