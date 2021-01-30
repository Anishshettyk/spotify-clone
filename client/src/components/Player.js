import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
import { theme, media } from "../styles";
import { getRecentlyPlayed } from "../spotify";
import { Slider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import ShuffleIcon from "@material-ui/icons/Shuffle";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
// import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import RepeatIcon from "@material-ui/icons/Repeat";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import DevicesIcon from "@material-ui/icons/Devices";
import VolumeUp from "@material-ui/icons/VolumeUp";

const { colors } = theme;

const MusicSlider = withStyles({
  root: {
    color: colors.green,
  },
  track: {
    height: 4,
    borderRadius: 4,
  },
  rail: {
    height: 4,
    borderRadius: 4,
  },
  thumb: {
    height: 12,
    width: 12,
    backgroundColor: "#fff",
    marginTop: -4,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
})(Slider);

const VolumeSlider = withStyles({
  root: {
    color: colors.green,
  },
})(Slider);

const PlayerStyledContainer = styled.section`
  position: fixed;
  bottom: 0;
  background-color: ${colors.darkGrey};
  z-index: 100;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-gap: 5px;
  width: calc(100% - 100px);
  padding: 10px;
  ${media.tablet`
  display: none;
    /* bottom:${theme.navHeight}; */
  `}
`;
const ArtistContent = styled.div`
  overflow: hidden;
  .artistData__container {
    display: flex;
    img {
      width: 64px;
    }
  }
  .artistData_content_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 10px;
    p {
      font-weight: 200;
      font-size: 15px;
      margin: 0;
    }
    span {
      font-size: 10px;
      color: ${colors.lightGrey};
    }
  }
`;
const PlayerArtistLink = styled(Link)`
  &:hover,
  &:focus {
    span {
      border-bottom: 1px solid ${colors.green};
      color: ${colors.green};
    }
  }
`;
const PLayerAlbumLink = styled(Link)`
  &:hover,
  &:focus {
    p {
      color: ${colors.blue};
      transform: scale(1.01);
    }
  }
`;
const PlayerActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .playerActions__button__container {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      margin: 0px 15px;
    }
  }
  .playerActions__slider__container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    .timer__start {
      margin-right: 10px;
      font-size: 12px;
    }
    .timer__end {
      margin-left: 10px;
      font-size: 12px;
    }
  }
`;
const PlayerFeaturesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  svg {
    margin-right: 15px;
  }
  .volume__control {
    display: flex;
    width: 50%;
    svg {
      margin-right: 15px;
    }
  }
`;

const Player = () => {
  const [playerData, setPlayerData] = useState(null);

  const getPlayersPresentData = async () => {
    const usersCurrentPLaybackResponse = await getRecentlyPlayed();
    setPlayerData(usersCurrentPLaybackResponse.data.items);
  };

  useEffect(() => {
    getPlayersPresentData();
  }, []);

  return (
    <PlayerStyledContainer>
      <ArtistContent>
        {playerData && (
          <div className="artistData__container">
            <img
              src={playerData[0]?.track?.album?.images[2]?.url}
              alt={playerData[0]?.track?.album?.name}
            />
            <div className="artistData_content_container">
              <PLayerAlbumLink
                to={`/albums/${playerData[0]?.track?.album?.id}`}
              >
                <p>{playerData[0]?.track?.album?.name}</p>
              </PLayerAlbumLink>
              <PlayerArtistLink
                to={`/artist/${playerData[0]?.track?.album?.artists[0]?.id}`}
              >
                <span>{playerData[0]?.track?.album?.artists[0]?.name}</span>
              </PlayerArtistLink>
            </div>
          </div>
        )}
      </ArtistContent>
      <PlayerActionsContainer>
        <div className="playerActions__button__container">
          <ShuffleIcon style={{ fontSize: 20 }} />
          <SkipPreviousIcon style={{ fontSize: 20 }} />
          <PlayCircleOutlineIcon style={{ fontSize: 35 }} />
          <SkipNextIcon style={{ fontSize: 20 }} />
          <RepeatIcon style={{ fontSize: 20 }} />
        </div>
        <div className="playerActions__slider__container">
          <span className="timer__start">0.00</span>
          <MusicSlider
            aria-label="player slider"
            aria-labelledby="continuous-slider"
          />
          <span className="timer__end">4.20</span>
        </div>
      </PlayerActionsContainer>
      <PlayerFeaturesContainer>
        <QueueMusicIcon style={{ fontSize: 20 }} />
        <DevicesIcon style={{ fontSize: 20 }} />
        <div className="volume__control">
          <VolumeUp />
          <VolumeSlider aria-labelledby="continuous-slider" />
        </div>
      </PlayerFeaturesContainer>
    </PlayerStyledContainer>
  );
};

export default Player;
