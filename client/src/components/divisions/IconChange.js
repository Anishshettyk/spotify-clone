import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { theme, mixins } from "../../styles";
import { getTrack } from "../../spotify";
import { PlayerContext } from "../../context/PlayerContext";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";

const { colors } = theme;

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
`;

const RecentlyPlayedInsider = styled.div`
  display: inline-block;
  position: relative;
  width: ${(props) => props.fits + "px"};
  margin: 0px ${(props) => props.marginSide + "px"};
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
  }
`;
const IconChange = ({ track, fits, marginSide }) => {
  const [iconState, SetIconState] = useState(true);
  const { playerData, playClickedMusic } = useContext(PlayerContext);

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

    SetIconState(!iconState);
  };
  return (
    <RecentlyPlayedInsider
      onClick={() => playClickedSong(track?.id)}
      fits={fits}
      marginSide={marginSide}
    >
      <img src={track?.album?.images[1]?.url} alt={track?.name} fits={fits} />
      <Mask fits={fits}>
        {iconState ? (
          <PlayCircleOutlineIcon style={{ fontSize: 50 }} />
        ) : (
          <VolumeUpIcon style={{ fontSize: 50 }} />
        )}
      </Mask>
    </RecentlyPlayedInsider>
  );
};

IconChange.prototype = {
  track: PropTypes.object.isRequired,
  fits: PropTypes.number,
  marginSide: PropTypes.number,
};

export default IconChange;
