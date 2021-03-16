import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getAlbumDetails } from "../spotify";
import styled from "styled-components";
import { theme } from "../styles";
import { Loader } from "./index";
import { AlbumInfo, AlbumTopHeader, AlbumPreviewLarge } from "./divisions";

const AlbumContainer = styled.main`
  margin: 20px 20px calc(${theme.navHeight} + 19px);
`;

const AlbumTrackContainer = styled.div`
  margin-top: 20px;
`;

const Albums = ({ albumID }) => {
  const [AlbumsDetails, setArtistDetails] = useState(null);

  const getAlbumDetailsRequest = async (albumID) => {
    const response = await getAlbumDetails(albumID);
    setArtistDetails(response.data);
  };

  useEffect(() => {
    getAlbumDetailsRequest(albumID);
  }, [albumID]);

  return (
    <AlbumContainer>
      {AlbumsDetails ? (
        <section>
          <AlbumInfo album={AlbumsDetails} />
          <AlbumTrackContainer>
            <AlbumTopHeader />
            {AlbumsDetails &&
              AlbumsDetails.tracks.items.map((track, i) => (
                <AlbumPreviewLarge track={track} AlbumID={i} key={i} />
              ))}
          </AlbumTrackContainer>
        </section>
      ) : (
        <Loader />
      )}
    </AlbumContainer>
  );
};

Albums.prototype = {
  albumID: PropTypes.object.isRequired,
};

export default Albums;
