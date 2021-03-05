import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "@reach/router";
import { theme, media } from "../../styles";
import { convertMilli, valueChopper } from "../../utils";
import { PlayerContext } from "../../context/PlayerContext";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";

const { colors } = theme;

const PlaylistTrackContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 2fr 3fr 2fr 1fr;
  align-items: center;
  border-bottom: 1px solid ${colors.grey};
  &:hover {
    background-color: ${colors.grey};
  }
  .play__pause__button__container {
    margin-left: 10px;
  }
  P {
    color: ${colors.lightGrey};
  }
  ${media.tablet`
  grid-template-columns: 1fr 4fr  1fr;
  .artist__link,.album__name,.added__date{
      display:none;
  }
  `}
`;

const ArtistArtWork = styled(Link)`
  &:hover {
    color: ${colors.green};
  }
`;

const PlaylistTrack = ({ track }) => {
  const [insideIcon, setInsideIcon] = useState(true);
  const { playClickedMusic } = useContext(PlayerContext);

  const getTrackData = (track) => {
    const {
      album: { images },
      preview_url,
      artists,
      name,
      id,
    } = track;
    const playerData = {
      musicImageUrl: images[2]?.url,
      musicName: name,
      musicArtistName: artists[0]?.name,
      musicArtistId: artists[0]?.id,
      musicPreviewUrl: preview_url,
      musicID: id,
    };
    return playerData;
  };

  const playMusicClicked = (track) => {
    const response = getTrackData(track);
    const playerChangedData = {
      ...response,
      audioplaying: true,
    };
    playClickedMusic(playerChangedData);
    setInsideIcon(!insideIcon);
  };

  const pauseClickedMusic = (track) => {
    const response = getTrackData(track);
    const playerChangedData = {
      ...response,
      audioplaying: false,
    };
    playClickedMusic(playerChangedData);
    setInsideIcon(!insideIcon);
  };

  return (
    <PlaylistTrackContainer>
      <div className="play__pause__button__container">
        {insideIcon ? (
          <PlayCircleOutlineIcon
            onClick={() => playMusicClicked(track?.track)}
            fontSize="large"
          />
        ) : (
          <VolumeUpIcon
            onClick={() => pauseClickedMusic(track?.track)}
            fontSize="large"
          />
        )}
      </div>
      <h5>{valueChopper(track?.track?.name, 25)}</h5>
      <ArtistArtWork
        to={`/artist/${track?.track?.artists[0]?.id}`}
        className="artist__link"
      >
        <h5>{valueChopper(track?.track?.artists[0]?.name, 15)}</h5>
      </ArtistArtWork>
      <h5 className="album__name">{track?.track?.album?.name}</h5>
      <p className="added__date">{track?.added_at?.split("T")[0]}</p>
      <p>{convertMilli(track?.track?.duration_ms)}</p>
    </PlaylistTrackContainer>
  );
};

export default PlaylistTrack;
