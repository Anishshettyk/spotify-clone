import React from "react";
import styled from "styled-components";
import { theme, media } from "../styles";
import { Router } from "@reach/router";
import {
  Artist,
  Main,
  User,
  Navbar,
  ScrollToTop,
  TopBanner,
  Artists,
  RecentlyPlayed,
} from "./../components";

const HomeStyledWrapper = styled.div`
  padding-left: ${theme.navWidth};
  ${media.tablet`
    padding-left: 0;
    padding-bottom: 50px;
  `};
`;

const Home = () => (
  <HomeStyledWrapper>
    <Navbar />
    <TopBanner />
    <Router primary={false}>
      <ScrollToTop path="/">
        <Main path="/" />
        <User path="me" />
        <RecentlyPlayed path="recently-played" />
        <Artists path="artists" />
        <Artist path="artist/:artistID" />
      </ScrollToTop>
    </Router>
  </HomeStyledWrapper>
);

export default Home;
