import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { theme, mixins, media } from "../../styles";
import { convertMilli1, valueChopper } from "../../utils";

const { colors } = theme;

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

const PlaylistInfo = ({ playlist }) => {
  const calcTotalPlayTime = (albumsDetails) => {
    const totalTime = albumsDetails?.tracks?.items.reduce((acc, item) => {
      let total = acc + item?.track?.duration_ms;
      return total;
    }, 0);
    return convertMilli1(totalTime);
  };
  return (
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
  );
};

PlaylistInfo.prototype = {
  playlist: PropTypes.object.isRequired,
};

export default PlaylistInfo;
