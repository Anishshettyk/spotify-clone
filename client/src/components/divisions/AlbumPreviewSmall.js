import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { theme, mixins, media } from "../../styles";
import { Link } from "@reach/router";
import { Tooltip } from "@material-ui/core";
import { valueChopper } from "../../utils";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

const { colors } = theme;
const themeDivider = 1.7;

const StyledAlbumPreviewSmallContainer = styled.div`
  margin-bottom: 15px;
  margin-left: 10px;
  p {
    padding-top: 5px;
    margin: 0;
  }
  span {
    display: block;
    margin: 0;
    margin-top: 5px;
    color: ${colors.lightGrey};
    font-size: 13px;
    font-weight: 900;
  }
`;

const AlbumLink = styled(Link)`
  h4 {
    border-bottom: 1px solid transparent;
    display: block;
    margin: 10px 0px 0px;
    ${media.tablet`
    font-size:14px;
    `}
  }
  &:hover,
  &:focus {
    h4 {
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

const RecentlyPlayedLink = styled(Link)`
  display: inline-block;
  position: relative;
  width: ${(props) => props.fits + "px"};
  &:hover,
  &:focus {
    ${Mask} {
      opacity: 1;
    }
  }
  img {
    object-fit: cover;
    width: ${(props) => props.fits + "px"};

    box-shadow: ${mixins.coverShadow};
    ${media.tablet`
    width: ${(props) => props.fits / themeDivider + "px"};
  `}
  }
  ${media.tablet`
  width: ${(props) => props.fits / themeDivider + "px"};
  `}
`;

const AlbumPreviewSmall = ({
  artistAlbum,
  imageIndex = 1,
  playlist = false,
  fits,
}) => {
  const linkToGo = playlist
    ? `/playlist/${artistAlbum.id}`
    : `/albums/${artistAlbum.id}`;

  return (
    <StyledAlbumPreviewSmallContainer fits={fits}>
      <RecentlyPlayedLink to={linkToGo} fits={fits}>
        <img
          src={artistAlbum?.images[imageIndex]?.url}
          alt={artistAlbum?.name}
          fits={fits}
        />
        <Mask fits={fits}>
          <PlayCircleOutlineIcon style={{ fontSize: 80 }} />
        </Mask>
      </RecentlyPlayedLink>
      <AlbumLink to={linkToGo}>
        <Tooltip title={artistAlbum?.name}>
          <h4>{valueChopper(artistAlbum?.name, 35)}</h4>
        </Tooltip>
      </AlbumLink>

      <span>{artistAlbum?.release_date?.split("-")[0]}</span>
      <p>
        {artistAlbum?.tracks?.total
          ? `Total tracks ${artistAlbum?.tracks?.total}`
          : ""}
      </p>
    </StyledAlbumPreviewSmallContainer>
  );
};

AlbumPreviewSmall.propTypes = {
  artistAlbum: PropTypes.object.isRequired,
  imageIndex: PropTypes.number,
  playlist: PropTypes.bool,
};

export default AlbumPreviewSmall;
