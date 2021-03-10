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
  Search,
  Playlist,
  Browse,
  CatagoryPlaylist,
  NotFound,
  More,
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
          <Browse path="browse" />
          <RecentlyPlayed path="recently-played" />
          <Artists path="artists" />
          <Search path="search" />
          <More path="more" />
          <Artist path="artist/:artistID" />
          <Albums path="albums/:albumID" />
          <Playlist path="playlist/:playlistID" />
          <CatagoryPlaylist path="browse/:categoryID" />
          <NotFound default />
        </ScrollToTop>
      </Router>
    </HomeStyledWrapper>
  </PlayerProvider>
);

export default Home;
