import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { theme, mixins, media } from "../../styles";
import { convertMilli1, valueChopper } from "../../utils";
import { Link } from "@reach/router";

const { colors } = theme;

const AlbumInfoContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 25px;
  .album__info {
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
    .album__type {
      color: ${colors.lightestGrey};
      font-size: 14px;
      font-weight: bolder;
      margin-bottom: 10px;
      ${media.tabletL`
      margin-bottom: 5px;
      `}
    }
    .album__info__artist {
      margin-top: 10px;
      color: ${colors.lightGrey};
    }
    .album_des {
      margin: 15px 0px 20px;
      color: ${colors.lightestGrey};

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

const AlbumInfo = ({ album }) => {
  const calcTotalPlayTime = (albumsDetails) => {
    const totalTime = albumsDetails?.tracks?.items.reduce((acc, item) => {
      let total = acc + item.duration_ms;
      return total;
    }, 0);
    return convertMilli1(totalTime);
  };

  return (
    <AlbumInfoContainer>
      <img src={album?.images[0].url} alt={album?.name} />
      <div className="album__info">
        <p className="album__type">{album.album_type.toUpperCase()}</p>
        <h1>{valueChopper(album?.name, 40)}</h1>
        <p className="album__info__artist">
          By{" "}
          {album.artists.map((artist, i) => (
            <ArtistLink key={i} to={`/artist/${artist.id}`}>
              <span>
                {artist.name}
                {album.artists.length > 0 && i === album.artists.length - 1
                  ? " "
                  : ","}
                &nbsp;
              </span>
            </ArtistLink>
          ))}
        </p>
        <p className="album_des">
          {album.release_date.split("-")[0]} . {album.tracks.total} song,{" "}
          {calcTotalPlayTime(album)}
        </p>

        <button>Play</button>
      </div>
    </AlbumInfoContainer>
  );
};
AlbumInfo.prototype = {
  album: PropTypes.object.isRequired,
};

export default AlbumInfo;
