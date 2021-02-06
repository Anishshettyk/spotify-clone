import React, { useState, useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { theme } from "../../styles";
import { convertMilli } from "../../utils";
import { PlayerContext } from "../../context/PlayerContext";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

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
    font-style: italic;
  }
`;

const TrackInfoSmall = ({ TopTrack, trackNumber }) => {
  const [insideValue, setInsideValue] = useState(true);
  const { playClickedMusic } = useContext(PlayerContext);

  const mouseAction = () => {
    setInsideValue(!insideValue);
  };

  const PlayClickedMusic = () => {
    const playerData = {
      musicImageUrl: TopTrack.album.images[2].url,
      musicName: TopTrack.name,
      musicArtistName: TopTrack.artists[0].name,
      musicArtistId: TopTrack.artists[0].id,
      musicPreviewUrl: TopTrack.preview_url,
    };
    playClickedMusic(playerData);
  };

  return (
    <TrackInfoContainer onMouseEnter={mouseAction} onMouseLeave={mouseAction}>
      <div className="TrackInfoSmall__main">
        <img
          src={TopTrack?.album?.images[2]?.url}
          alt={TopTrack?.album?.name}
        />
        <span>
          {insideValue ? (
            trackNumber
          ) : (
            <PlayCircleOutlineIcon onClick={PlayClickedMusic} />
          )}
        </span>
        <p>
          {TopTrack?.name?.length > 25
            ? `${TopTrack?.name.slice(0, 25)}...`
            : TopTrack?.name}
        </p>
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
