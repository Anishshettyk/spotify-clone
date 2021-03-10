import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { theme, mixins, media } from "../styles";
import { getAParticularPlaylist } from "../spotify";
import { convertMilli1, valueChopper } from "../utils";
import { Loader } from "./index";
import { PlaylistHeader, PlaylistTrack } from "./divisions";

const { colors } = theme;

const PlaylistContainer = styled.div`
  margin: 20px 10px ${theme.visibleBottom};
`;

const PlayListInfoContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 25px;
  .playlist__info {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-items: flex-start;
    p {
      margin: 0;
    }
    h1 {
      margin: 0;
      font-size: 40px;
      ${media.tabletL`
      font-size:26px;
      `}
    }
    .playlist__type {
      text-transform: uppercase;
      color: ${colors.lightestGrey};
      font-size: 14px;
      font-weight: bolder;
      margin-bottom: 10px;
      ${media.tabletL`
      margin-bottom: 5px;
      `}
    }
    .playlist__discription {
      color: ${colors.lightGrey};
      font-style: italic;
    }
    .playlist__author {
      margin: 15px 0px 20px;
      color: ${colors.lightestGrey};
      span {
        color: ${colors.white};
        border-bottom: 1px solid transparent;
        &:hover {
          border-bottom: 1px solid ${colors.white};
        }
      }
      ${media.tabletL`
      margin: 7px 0px 10px;
      `}
    }
    button {
      ${mixins.greenButton};
    }
  }
  ${media.tablet`
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
  img{
    width:70%;
    height:70%;
    border-radius:10%;
  }
  `}
`;

const PlayListContentContainer = styled.section`
  margin: 50px 0px 0px;
`;

const Playlist = ({ playlistID }) => {
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    getPlaylists(playlistID);
  }, [playlistID]);

  const getPlaylists = async (playlistID) => {
    const response = await getAParticularPlaylist(playlistID);
    setPlaylist(response?.data);
  };

  const calcTotalPlayTime = (albumsDetails) => {
    const totalTime = albumsDetails?.tracks?.items.reduce((acc, item) => {
      let total = acc + item?.track?.duration_ms;
      return total;
    }, 0);
    return convertMilli1(totalTime);
  };

  return (
    <main>
      {playlist ? (
        <PlaylistContainer>
          <PlayListInfoContainer>
            <img src={playlist?.images[0].url} alt={playlist?.name} />
            <div className="playlist__info">
              <p className="playlist__type">{playlist?.type}</p>
              <h1>{valueChopper(playlist?.name, 40)}</h1>
              <p className="playlist__discription">{playlist?.description}</p>
              <p className="playlist__author">
                Created By <span>{playlist?.owner?.display_name}</span>.{" "}
                {playlist?.tracks?.total} songs ,{calcTotalPlayTime(playlist)}
              </p>

              <button>Play</button>
            </div>
          </PlayListInfoContainer>
          <PlayListContentContainer>
            <PlaylistHeader />
            {playlist?.tracks?.items.map((track, i) => (
              <PlaylistTrack key={i} track={track} />
            ))}
          </PlayListContentContainer>
        </PlaylistContainer>
      ) : (
        <Loader />
      )}
    </main>
  );
};

Playlist.propTypes = {
  playlistID: PropTypes.string,
};

export default Playlist;
