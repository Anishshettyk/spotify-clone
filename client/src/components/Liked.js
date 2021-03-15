import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme, mixins, media } from "../styles";
import { getLikedSongs } from "../spotify/";
import { Loader } from "./index";
import { PlaylistHeader, PlaylistTrack } from "./divisions";

import SearchIcon from "@material-ui/icons/Search";

const { colors } = theme;

const LikedContainer = styled.main`
  margin: 10px 30px ${theme.visibleBottom};
  h1 {
    font-size: 45px;
    margin: 0 0 10px 0;
  }
  button {
    ${mixins.greenButton};
  }
  ${media.tablet`
    margin: 5px 10px ${theme.visibleBottom};
    h1{
      font-size:35px;
    }
  `}
`;
const FilterStyledContainer = styled.div`
  ${mixins.flexComman};
  margin-top: 25px;
  background-color: transparent;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 5px;
  &:focus-within {
    background-color: ${colors.grey};
  }
  input {
    width: 100%;
    height: 30px;
    margin-left: 10px;
    background-color: transparent;
    outline: none;
    border: none;
    color: ${colors.white};
    font-size: 16px;
    font-weight: 400;
    ::placeholder {
      color: ${colors.lightestGrey};
      opacity: 1;
      font-size: 14px;
    }

    :-ms-input-placeholder {
      color: ${colors.lightestGrey};
      font-size: 14px;
    }

    ::-ms-input-placeholder {
      color: ${colors.lightestGrey};
      font-size: 14px;
    }
  }
  svg {
    color: ${colors.lightestGrey};
  }
`;
const LikedSongsContainer = styled.section``;

const Liked = () => {
  const [likedSongs, setLikedSongs] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const getMeLikedSongs = async () => {
    const response = await getLikedSongs();
    setLikedSongs(response?.data);
  };
  useEffect(() => {
    getMeLikedSongs();
  }, []);
  return (
    <>
      {likedSongs ? (
        <LikedContainer>
          <h1>Liked songs.</h1>
          <button>Play</button>
          <FilterStyledContainer>
            <SearchIcon />
            <input
              type="text"
              placeholder="Filter"
              onChange={(event) => setFilterValue(event.target.value)}
            />
          </FilterStyledContainer>

          <LikedSongsContainer>
            <PlaylistHeader />
            {likedSongs?.items
              // eslint-disable-next-line array-callback-return
              ?.filter((track) => {
                if (filterValue === "") {
                  return track;
                } else if (
                  track?.track?.name
                    .toLowerCase()
                    .includes(filterValue.toLowerCase())
                ) {
                  return track;
                }
              })
              .map((item, i) => (
                <PlaylistTrack track={item} key={i} />
              ))}
          </LikedSongsContainer>
        </LikedContainer>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Liked;
