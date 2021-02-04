import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getAlbumDetails } from "../spotify";
import styled from "styled-components";
import { theme, mixins } from "../styles";
import { Link } from "@reach/router";
import { convertMilli1 } from "../utils";
import { Loader } from "./index";
import { AlbumTopHeader, AlbumPreviewLarge } from "./divisions";

const { colors } = theme;

const AlbumContainer = styled.main`
  margin: 20px 20px calc(${theme.navHeight} + 19px);
`;

const AlbumInfoContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 5fr;
  .AlbumInfoContainer__image {
    img {
      width: 100%;
      height: 100%;
    }
  }

  .AlbumInfoContainer__info {
    padding: 0px 0px 0px 20px;
    .AlbumInfoContainer__info__album__type {
      font-size: 14px;
    }
    h1 {
      font-size: 50px;
      margin-bottom: 20px;
    }
    .AlbumInfoContainer__info__para__artist {
      color: ${colors.lightGrey};
    }
    .AlbumInfoContainer__info__last {
      color: ${colors.lightGrey};
      font-size: 16px;
      font-weight: 600;
    }
    .AlbumInfoContainer__info__button {
      margin-top: 10px;
      padding: 10px 50px;
      ${mixins.greenButton};
    }
  }
`;

const ArtistLink = styled(Link)`
  span {
    font-weight: 700;
    color: ${colors.white};
  }
  &:hover,
  &:focus {
    span {
      border-bottom: 1px solid ${colors.green};
      color: ${colors.green};
    }
  }
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

  const calcTotalPlayTime = (albumsDetails) => {
    const totalTime = albumsDetails?.tracks?.items.reduce((acc, item) => {
      let total = acc + item.duration_ms;
      return total;
    }, 0);
    return convertMilli1(totalTime);
  };

  return (
    <AlbumContainer>
      {AlbumsDetails ? (
        <section>
          <AlbumInfoContainer>
            <div className="AlbumInfoContainer__image">
              <img src={AlbumsDetails.images[0].url} alt={AlbumsDetails.name} />
            </div>
            <div className="AlbumInfoContainer__info">
              <p className="AlbumInfoContainer__info__album__type">
                {AlbumsDetails.album_type.toUpperCase()}
              </p>
              <h1>{AlbumsDetails.name}</h1>
              <p className="AlbumInfoContainer__info__para__artist">
                By{" "}
                {AlbumsDetails.artists.map((artist, i) => (
                  <ArtistLink key={i} to={`/artist/${artist.id}`}>
                    <span>
                      {artist.name}
                      {AlbumsDetails.artists.length > 1 ? "," : ""}
                    </span>
                  </ArtistLink>
                ))}
              </p>
              <p className="AlbumInfoContainer__info__last">
                {AlbumsDetails.release_date.split("-")[0]} .{" "}
                {AlbumsDetails.tracks.total} song,{" "}
                {calcTotalPlayTime(AlbumsDetails)}
              </p>
              <button className="AlbumInfoContainer__info__button">Play</button>
            </div>
          </AlbumInfoContainer>
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
