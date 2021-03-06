import React, { useState, useRef, useContext, useEffect } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { Link } from "@reach/router";
import styled from "styled-components";
import { theme, media } from "../styles";
import { PlayerFeatures } from "./divisions";
import { Slider, Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { convertTime, valueChopper } from "../utils";
import {
  checkUserLikedTrack,
  dislikeThisTrack,
  likeThisTrack,
} from "../spotify";

import ShuffleIcon from "@material-ui/icons/Shuffle";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

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
  },
})(Slider);

const PlayerStyledContainer = styled.section`
  position: fixed;
  bottom: 0;
  background-color: ${colors.darkGrey};
  z-index: 100;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
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
    svg {
      color: ${colors.green};
      font-size: 20px;
      cursor: pointer;
      margin-left: 5px;
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
      color: ${colors.green};
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
      cursor: pointer;
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

const MobilePLayerContainer = styled.section`
  display: none;
  position: fixed;
  bottom: ${theme.navHeight};
  background-color: ${colors.black};
  z-index: 100;
  overflow: hidden;
  width: 100%;
  max-height: 100px;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${colors.grey};
  .mobile_info__container {
    display: flex;
    justify-content: space-between;
    img {
      width: 64px;
    }
    .info__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 10px;
      p {
        margin: 0;
        font-size: 14px;
      }
      span {
        color: ${colors.lightGrey};
        font-size: 12px;
      }
    }
  }
  .mobile_control__container {
    margin-right: 15px;
    svg {
      &:nth-child(1) {
        color: ${colors.green};
        margin-right: 20px;
        font-size: 30px;
        cursor: pointer;
      }
    }
  }

  ${media.tablet`
    display:flex;
  `}
`;

const Player = () => {
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState("0:00");
  const [currentTime, setCurrentTime] = useState("0:00");
  const [percentage, setPercentage] = useState(0);
  const [playerDataObtained, setPlayerDataObtained] = useState(null);
  const [likedSong, setLikedSong] = useState(false);

  const { playerData } = useContext(PlayerContext);

  const audioRef = useRef();

  useEffect(() => {
    setPlayerDataObtained(playerData);
    const musicPlayOutside = async () => {
      const audio = await audioRef.current;
      if (playerData.audioplaying) {
        audio?.play();
        setPlaying(true);
      } else {
        audio?.pause();
        setPlaying(false);
      }
    };
    musicPlayOutside();
    if (playerData.musicID) {
      isUserLikedSong(playerData?.musicID);
    }
  }, [playerData]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (playing && audio.play) {
      setPlaying(false);
      audio.pause();
    } else {
      setPlaying(true);
      audio.play();
    }
  };

  const isUserLikedSong = async (trackID) => {
    const response = await checkUserLikedTrack(trackID);
    setLikedSong(response?.data[0]);
  };

  const MusicSliderpercentage = () => {
    const audio = audioRef.current;
    const percentageobtained = Math.floor(
      audio.currentTime * (100 / audio.duration)
    );
    setPercentage(percentageobtained);
  };

  const likeClickedSong = async (trackid) => {
    await likeThisTrack(trackid);
    isUserLikedSong(trackid);
  };
  const dislikeClickedSong = async (trackID) => {
    await dislikeThisTrack(trackID);
    isUserLikedSong(trackID);
  };

  return (
    <div>
      <PlayerStyledContainer>
        <ArtistContent>
          {playerDataObtained && (
            <div className="artistData__container">
              <img
                src={playerDataObtained?.musicImageUrl}
                alt={playerDataObtained?.musicName}
              />
              <div className="artistData_content_container">
                <PLayerAlbumLink
                  to={`/albums/${playerDataObtained?.musicArtistId}`}
                >
                  <p>{valueChopper(playerDataObtained?.musicName, 15)}</p>
                </PLayerAlbumLink>
                <div>
                  <PlayerArtistLink
                    to={`/artist/${playerDataObtained?.musicArtistId}`}
                  >
                    <span>{playerDataObtained?.musicArtistName}</span>
                  </PlayerArtistLink>
                  {likedSong ? (
                    <Tooltip title="Remove this from liked songs">
                      <FavoriteIcon
                        onClick={() =>
                          dislikeClickedSong(playerDataObtained?.musicID)
                        }
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Add this to liked songs">
                      <FavoriteBorderIcon
                        onClick={() =>
                          likeClickedSong(playerDataObtained?.musicID)
                        }
                      />
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>
          )}
        </ArtistContent>
        <PlayerActionsContainer>
          <div className="playerActions__button__container">
            <Tooltip title="Shuffle">
              <ShuffleIcon style={{ fontSize: 20, color: colors.lightGrey }} />
            </Tooltip>
            <Tooltip title="Prev">
              <SkipPreviousIcon
                style={{ fontSize: 20, color: colors.lightestGrey }}
              />
            </Tooltip>
            {playing ? (
              <Tooltip title="pause">
                <PauseCircleOutlineIcon
                  style={{ fontSize: 35 }}
                  onClick={handlePlayPause}
                />
              </Tooltip>
            ) : (
              <Tooltip title="Play">
                <PlayCircleOutlineIcon
                  style={{ fontSize: 35 }}
                  onClick={handlePlayPause}
                />
              </Tooltip>
            )}

            <Tooltip title="Next">
              <SkipNextIcon
                style={{ fontSize: 20, color: colors.lightestGrey }}
              />
            </Tooltip>
            <Tooltip title="Repeat">
              <RepeatIcon style={{ fontSize: 20, color: colors.lightGrey }} />
            </Tooltip>
          </div>
          {playerDataObtained && (
            <div className="playerActions__slider__container">
              <span className="timer__start">{`${currentTime}`}</span>
              <MusicSlider
                aria-label="player slider"
                aria-labelledby="continuous-slider"
                defaultValue={0}
                value={percentage}
                onChange={MusicSliderpercentage}
              />
              <audio
                src={playerDataObtained?.musicPreviewUrl}
                ref={audioRef}
                onLoadedData={(e) => {
                  setDuration(
                    convertTime(Math.floor(e.currentTarget.duration.toFixed(2)))
                  );
                }}
                onTimeUpdate={(e) => {
                  setCurrentTime(
                    convertTime(e.currentTarget.currentTime.toFixed(2))
                  );
                }}
              ></audio>
              <span className="timer__end">{duration}</span>
            </div>
          )}
        </PlayerActionsContainer>
        <PlayerFeatures />
      </PlayerStyledContainer>
      <MobilePLayerContainer>
        <div className="mobile_info__container">
          <img
            src={playerDataObtained?.musicImageUrl}
            alt={playerDataObtained?.musicName}
          />
          <div className="info__content">
            <PLayerAlbumLink
              to={`/albums/${playerDataObtained?.musicArtistId}`}
            >
              <p>{valueChopper(playerDataObtained?.musicName, 15)}</p>
            </PLayerAlbumLink>
            <PlayerArtistLink
              to={`/artist/${playerDataObtained?.musicArtistId}`}
            >
              <span>{playerDataObtained?.musicArtistName}</span>
            </PlayerArtistLink>
          </div>
        </div>
        <div className="mobile_control__container">
          {likedSong ? (
            <Tooltip title="Remove this from liked songs">
              <FavoriteIcon
                onClick={() => dislikeClickedSong(playerDataObtained?.musicID)}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Add this to liked songs">
              <FavoriteBorderIcon
                onClick={() => likeClickedSong(playerDataObtained?.musicID)}
              />
            </Tooltip>
          )}

          {playing ? (
            <Tooltip title="pause">
              <PauseCircleOutlineIcon
                style={{ fontSize: 35 }}
                onClick={handlePlayPause}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Play">
              <PlayCircleOutlineIcon
                style={{ fontSize: 35 }}
                onClick={handlePlayPause}
              />
            </Tooltip>
          )}
        </div>
      </MobilePLayerContainer>
    </div>
  );
};

export default Player;
