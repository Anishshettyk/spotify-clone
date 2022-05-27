import React, { useState, useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { theme } from "../../styles";
import { convertMilli, valueChopper } from "../../utils";
import { PlayerContext } from "../../context/PlayerContext";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";

const { colors } = theme;

const TrackInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${colors.grey};
  border-bottom: 1px solid ${colors.grey};
  &:hover {
    background-color: ${colors.grey};
  }
  .TrackInfoSmall__main {
    display: flex;
    align-items: center;

    img {
      width: 50px;
      height: 50px;
    }
    p {
      margin: 0;
      margin-left: 20px;
      font-weight: 600;
    }
    span {
      margin-left: 10px;
      svg {
        &:hover {
          transform: scale(1.1);
          color: ${colors.green};
        }
      }
    }
  }
  .TrackInfoSmall__duration {
    margin-right: 10px;
    font-weight: 200;
    color: ${colors.lightGrey};
  }
`;

const TrackInfoSmall = ({ TopTrack }) => {
  const [insideIcon, setInsideIcon] = useState(true);
  const { playClickedMusic } = useContext(PlayerContext);
  const playerOriginalData = () => {
    const playerDataChanged = {
      musicImageUrl: TopTrack?.album?.images[2]?.url,
      musicName: TopTrack?.name,
      musicArtistName: TopTrack?.artists[0]?.name,
      musicArtistId: TopTrack?.artists[0]?.id,
      musicPreviewUrl: TopTrack?.preview_url,
      musicID: TopTrack?.id,
      externalURL: TopTrack?.external_urls?.spotify,
    };
    return playerDataChanged;
  };

  const PauseClickedMusic = () => {
    const response = playerOriginalData();
    const playerDataChanged = {
      ...response,
      audioPlaying: false,
    };
    playClickedMusic(playerDataChanged);
    setInsideIcon(!insideIcon);
  };

  const PlayClickedMusic = () => {
    const response = playerOriginalData();
    const playerDataChanged = {
      ...response,
      audioplaying: true,
    };
    playClickedMusic(playerDataChanged);
    setInsideIcon(!insideIcon);
  };

  return (
    <TrackInfoContainer>
      <div className="TrackInfoSmall__main">
        <img
          src={TopTrack?.album?.images[2]?.url}
          alt={TopTrack?.album?.name}
        />
        <span>
          {insideIcon ? (
            <PlayCircleOutlineIcon onClick={PlayClickedMusic} />
          ) : (
            <VolumeUpIcon onClick={PauseClickedMusic} />
          )}
        </span>
        <p>{valueChopper(TopTrack?.name, 25)}</p>
      </div>
      <p className="TrackInfoSmall__duration">
        {convertMilli(TopTrack?.duration_ms)}
      </p>
    </TrackInfoContainer>
  );
};

TrackInfoSmall.prototype = {
  TopTrack: PropTypes.object.isRequired,
  trackNumber: PropTypes.number.isRequired,
};

export default TrackInfoSmall;
