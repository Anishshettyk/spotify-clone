import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "@reach/router";
import { theme, mixins, media } from "../../styles";
import { getTrack } from "../../spotify";
import { PlayerContext } from "../../context/PlayerContext";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";

const { colors } = theme;

const themeDivider = 1.7;

const IconChangeContainer = styled.section`
  h4 {
    color: ${colors.white};
    padding: 5px 0px;
    margin: 0;
  }
  span {
    color: ${colors.lightGrey};
  }
  p {
    padding-top: 5px;
    text-transform: uppercase;
    color: ${colors.lightGrey};
    font-size: 12px;
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

const RecentlyPlayedInsider = styled.div`
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
    box-shadow: ${mixins.coverShadow};
    ${media.tablet`
    width: ${(props) => props.fits / themeDivider + "px"};
  `}
  }
  ${media.tablet`
  width: ${(props) => props.fits / themeDivider + "px"};
  `}
`;

const ArtistLink = styled(Link)`
  border-bottom: 1px solid transparent;
  &:hover,
  &:focus {
    border-bottom: 1px solid ${colors.green};
    span {
      color: ${colors.green};
    }
  }
`;
const IconChange = ({ track, context, fits, marginSide }) => {
  const { playerData, playClickedMusic } = useContext(PlayerContext);
  const [iconState, SetIconState] = useState(false);

  const playClickedSong = async (trackID) => {
    const response = await getTrack(trackID);
    const {
      album: { images },
      preview_url,
      artists,
      name,
    } = response?.data;

    const playerDataChanged = {
      ...playerData,
      musicImageUrl: images[2]?.url,
      musicName: name,
      musicArtistName: artists[0]?.name,
      musicArtistId: artists[0]?.id,
      musicPreviewUrl: preview_url,
      audioplaying: !playerData.audioplaying,
    };
    playClickedMusic(playerDataChanged);
    playerDataChanged.audioplaying ? SetIconState(true) : SetIconState(false);
  };

  return (
    <IconChangeContainer fits={fits}>
      <RecentlyPlayedInsider
        onClick={() => playClickedSong(track?.id)}
        fits={fits}
        marginSide={marginSide}
      >
        <img src={track?.album?.images[1]?.url} alt={track?.name} fits={fits} />
        <Mask fits={fits}>
          {iconState ? (
            <VolumeUpIcon style={{ fontSize: 50 }} />
          ) : (
            <PlayCircleOutlineIcon style={{ fontSize: 50 }} />
          )}
        </Mask>
      </RecentlyPlayedInsider>
      <h4>{track?.name}</h4>
      {track?.artists &&
        track?.artists?.slice(0, 3)?.map(({ name, id }, i) => (
          <ArtistLink to={`/artist/${id}`} key={i}>
            <span>
              {name}
              {track?.artists?.length > 0 && i === track?.artists?.length - 1
                ? ""
                : ","}
              &nbsp;
            </span>
          </ArtistLink>
        ))}
      <p>{context?.type}</p>
    </IconChangeContainer>
  );
};

IconChange.prototype = {
  track: PropTypes.object.isRequired,
  fits: PropTypes.number,
  marginSide: PropTypes.number,
};

export default IconChange;
