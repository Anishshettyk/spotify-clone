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
  Player,
  Albums,
  TopTracks,
} from "./index";
import PlayerProvider from "./../context/PlayerContext";

const HomeStyledWrapper = styled.div`
  padding-left: ${theme.navWidth};
  ${media.tablet`
    padding-left: 0;
    padding-bottom: 50px;
  `};
`;

const Home = () => (
  <PlayerProvider>
    <HomeStyledWrapper>
      <Navbar />
      <TopBanner />
      <Player />
      <Router primary={false}>
        <ScrollToTop path="/">
          <Main path="/" />
          <User path="me" />
          <TopTracks path="/top-tracks" />
          <RecentlyPlayed path="recently-played" />
          <Artists path="artists" />
          <Artist path="artist/:artistID" />
          <Albums path="albums/:albumID" />
        </ScrollToTop>
      </Router>
    </HomeStyledWrapper>
  </PlayerProvider>
);

export default Home;
