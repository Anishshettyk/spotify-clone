import React from "react";
import SpotifyLogo from "./../assets/spotify-logo.png";
import { Link } from "@reach/router";
import styled from "styled-components";
import { theme, mixins, media } from "../styles";

import PersonIcon from "@material-ui/icons/Person";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import UpdateIcon from "@material-ui/icons/Update";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import GitHubIcon from "@material-ui/icons/GitHub";

const { colors } = theme;

const StyledNavContainer = styled.nav`
  ${mixins.coverShadow};
  ${mixins.flexBetween};
  flex-direction: column;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: ${theme.navWidth};
  background-color: ${colors.navBlack};
  text-align: center;
  z-index: 99;
  ${media.tablet`
    top: auto;
    bottom: 0;
    right: 0;
    width: 100%;
    min-height: ${theme.navHeight};
    height: ${theme.navHeight};
    flex-direction: row;
  `};
  & > * {
    width: 100%;
    ${media.tablet`
      height: 100%;
    `};
  }
`;

const LogoContainer = styled.div`
  margin-top: 30px;
  transition: ${theme.transition};
  ${media.tablet`
    display: none;
  `};
  img {
    width: 70px;
    height: 70px;
  }
`;
const NavMenu = styled.ul`
  display: flex;
  flex-direction: column;
  ${media.tablet`
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
  `};
`;
const MenuItem = styled.li`
  color: ${colors.lightGrey};
  font-size: 11px;
  ${media.tablet`
    flex-grow: 1;
    flex-basis: 100%;
    height: 100%;
  `};
  a {
    display: block;
    padding: 15px 0;
    border-left: 5px solid transparent;
    width: 100%;
    height: 100%;
    ${media.tablet`
      ${mixins.flexCenter};
      flex-direction: column;
      padding: 0;
      border-left: 0;
      border-top: 3px solid transparent;
    `};
    &:hover,
    &:focus,
    &.active {
      color: ${colors.white};
      background-color: ${colors.black};
      border-left: 5px solid ${colors.offGreen};
      ${media.tablet`
        border-left: 0;
        border-top: 3px solid ${colors.offGreen};
      `};
    }
  }
  div {
    padding-top: 5px;
    color: ${colors.white};
    font-weight: bold;
  }
`;
const Github = styled.div`
  color: ${colors.lightGrey};
  width: 45px;
  height: 45px;
  margin-bottom: 30px;
  ${media.tablet`
    display: none;
  `};
  a {
    &:hover,
    &:focus,
    &.active {
      color: ${colors.blue};
    }
    svg {
      width: 30px;
    }
  }
`;

const isActive = ({ currentLink }) =>
  currentLink ? { className: "active" } : null;

const NavLink = (props) => <Link getProps={isActive} {...props} />;

const Navbar = () => {
  return (
    <StyledNavContainer>
      <LogoContainer>
        <Link to="/">
          <img src={SpotifyLogo} alt="spotify logo" />
        </Link>
      </LogoContainer>
      <NavMenu>
        <MenuItem>
          <NavLink to="/">
            <PersonIcon />
            <div>Profile</div>
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/artists">
            <HeadsetMicIcon />
            <div>Artists</div>
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/tracks">
            <MusicNoteIcon />
            <div>Tracks</div>
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/recent">
            <UpdateIcon />
            <div>Recent</div>
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/playlists">
            <QueueMusicIcon />
            <div>Playlists</div>
          </NavLink>
        </MenuItem>
      </NavMenu>
      <Github>
        <a
          href="https://github.com/Anishshettyk/sportify-clone"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon />
        </a>
      </Github>
    </StyledNavContainer>
  );
};

export default Navbar;
