import React from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";
import styled from "styled-components";
import { mixins, theme, media } from "../../styles";
import NoUser from "../../assets/no-user.png";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

const { colors } = theme;
const themeDivider = 1.7;

const ArtistInfoContainer = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  outline: none;
  h5 {
    font-size: 17px;
    border-bottom: 1px solid transparent;
    ${media.tablet`
    font-size:13px;
    `}
  }
  &:hover,
  &:focus {
    h5 {
      border-bottom: 1px solid ${colors.white};
    }
  }
`;

const Mask = styled.div`
  ${mixins.flexCenter};
  position: absolute;
  width: ${(props) => props.fits + "px"};
  height: ${(props) => props.fits + "px"};
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 20px;
  color: ${colors.white};
  opacity: 0;
  transition: ${theme.transition};
  ${media.tablet`
  width: ${(props) => props.fits / themeDivider + "px"};
  height: ${(props) => props.fits / themeDivider + "px"};
  `}
`;

const ArtistImageContainer = styled.div`
  display: inline-block;
  position: relative;
  width: ${(props) => props.fits + "px"};
  margin: 0px ${(props) => props.marginSide + "px" || "0px"};

  &:hover,
  &:focus {
    ${Mask} {
      opacity: 1;
    }
  }
  img {
    object-fit: cover;
    width: ${(props) => props.fits + "px"};
    height: ${(props) => props.fits + "px"};
    box-shadow: ${mixins.coverShadow};
    border-radius: 50%;
    overflow: hidden;
    ${media.tablet`
    width: ${(props) => props.fits / themeDivider + "px"};
    height: ${(props) => props.fits / themeDivider + "px"};
  `}
  }
  ${media.tablet`
  width: ${(props) => props.fits / themeDivider + "px"};
  `}
`;

const ArtistInfo = ({ artist, fits, marginSide }) => {
  return (
    <ArtistInfoContainer to={`/artist/${artist?.id}`}>
      <ArtistImageContainer fits={fits} marginSide={marginSide}>
        <img
          src={artist?.images?.length > 0 ? artist?.images[0]?.url : NoUser}
          alt=""
          fits={fits}
        />
        <Mask fits={fits}>
          <PlayCircleOutlineIcon style={{ fontSize: 50 }} />
        </Mask>
      </ArtistImageContainer>
      <h5>{artist?.name}</h5>
    </ArtistInfoContainer>
  );
};

ArtistInfo.prototype = {
  artist: PropTypes.object.isRequired,
};

export default ArtistInfo;
