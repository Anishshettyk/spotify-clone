import React, { useState, useContext } from "react";
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
  width: 100%;
  height: 100%;
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
  width: 100%;
  &:hover,
  &:focus {
    ${Mask} {
      opacity: 1;
    }
  }
  img {
    object-fit: cover;
    width: 100%;
    box-shadow: ${mixins.coverShadow};
  }
`;
const IconChange = ({ track }) => {
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
    <RecentlyPlayedInsider onClick={() => playClickedSong(track?.id)}>
      <img src={track?.album?.images[1]?.url} alt={track?.name} />
      <Mask>
        {iconState ? (
          <PlayCircleOutlineIcon style={{ fontSize: 50 }} />
        ) : (
          <VolumeUpIcon style={{ fontSize: 50 }} />
        )}
      </Mask>
    </RecentlyPlayedInsider>
  );
};

export default IconChange;
