import React from "react";
import styled from "styled-components";
import { theme, media } from "../styles";
import { Router } from "@reach/router";
import TopBanner from "./TopBanner";
import ScrollToTop from "./ScrollToTop";
import Navbar from "./Navbar";
import User from "./User";
import Main from "./Main";
import Artist from "./Artist";

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
        <Artist path="artist/:artistID" />
      </ScrollToTop>
    </Router>
  </HomeStyledWrapper>
);

export default Home;
