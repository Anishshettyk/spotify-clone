import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { theme } from "../styles";
import { getAParticularPlaylist } from "../spotify";
import { Loader } from "./index";
import { PlaylistInfo, PlaylistHeader, PlaylistTrack } from "./divisions";

const PlaylistContainer = styled.div`
  margin: 20px 10px ${theme.visibleBottom};
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

  return (
    <main>
      {playlist ? (
        <PlaylistContainer>
          <PlaylistInfo playlist={playlist} />
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
