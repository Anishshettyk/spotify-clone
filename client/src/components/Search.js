import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme, mixins, media } from "../styles";
import { totalSearch } from "../spotify";
import { Carousel, IconChange, ArtistInfo } from "./divisions";

import SearchIcon from "@material-ui/icons/Search";
import FlagIcon from "@material-ui/icons/Flag";

const { colors } = theme;

const SearchContainer = styled.section`
  margin: 20px 0px calc(${theme.navHeight} + 35px);

  .search__field {
    margin: 20px 10px 0px;
    ${mixins.flexComman};
    background-color: ${colors.grey};
    border-radius: 5px;
    margin-bottom: 15px;
    padding: 5px;
    ${mixins.coverShadowSmall};
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
      }

      :-ms-input-placeholder {
        color: ${colors.lightestGrey};
      }

      ::-ms-input-placeholder {
        color: ${colors.lightestGrey};
      }
    }
    svg {
      color: ${colors.lightestGrey};
    }
  }
`;

const SearchResultsContainer = styled.div`
  margin: 30px 30px 0px 30px;
  ${media.tablet`
  margin:30px 10px 0px 10px;
  `}
`;

const SearchInfo = styled.div`
  ${mixins.flexColumn};
  min-height: 70vh;
  svg {
    margin-bottom: 15px;
    font-size: 50px;
    color: ${colors.lightestGrey};
  }
  h1 {
    font-size: 30px;
    margin-bottom: 20px;
    span {
      font-weight: 300;
      color: ${colors.white};
    }
  }
  p {
    text-align: center;
    color: ${colors.lightestGrey};
  }
`;

const SearchedTrack = styled.div`
  h4 {
    margin: 5px 10px;
    ${media.tablet`
    font-size:13px;
    `}
  }
  .artist__container {
    margin: 0px 10px;
    span {
      font-size: 12px;
      color: ${colors.lightestGrey};
      &:hover {
        border-bottom: 1px solid ${colors.green};
      }
    }
  }
`;

const Search = () => {
  const [searchArtists, setSearchArtists] = useState(null);
  const [searchTracks, setSearchTracks] = useState(null);
  const [userSearchValue, setUserSearchValue] = useState("");

  useEffect(() => {
    fetchSearchResults(userSearchValue);
  }, [userSearchValue]);

  const fetchSearchResults = async (searchValue) => {
    if (searchValue) {
      const totalSearchResponse = await totalSearch(searchValue);
      setSearchArtists(
        totalSearchResponse?.artistSearchResults?.artists?.items
      );
      setSearchTracks(totalSearchResponse?.trackSearchResults?.tracks?.items);
    }
  };

  return (
    <SearchContainer>
      <div className="search__field">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search Artists and Tracks..."
          onChange={(event) => setUserSearchValue(event.target.value)}
        />
      </div>

      <SearchResultsContainer>
        {searchArtists && searchTracks ? (
          <div>
            <Carousel
              title="Top Results - Artists"
              discription="These are some of the top artists based on your search"
            >
              {searchArtists &&
                searchArtists.map((artist) => (
                  <ArtistInfo
                    key={artist?.id}
                    artist={artist}
                    fits={200}
                    marginSide={10}
                  />
                ))}
            </Carousel>
            <Carousel
              title="Top Results - Tracks"
              discription="These are some of the top tracks based on your search"
              style={{ marginTop: "10vh" }}
            >
              {searchTracks &&
                searchTracks?.map((track) => (
                  <SearchedTrack key={track?.id}>
                    <IconChange track={track} fits={250} marginSide={10} />
                  </SearchedTrack>
                ))}
            </Carousel>
          </div>
        ) : (
          <SearchInfo>
            <SearchIcon />
            <h1>Search Spotify</h1>
            <p>
              Find your favorite songs, artists, albums and <br /> everything in
              between.
            </p>
          </SearchInfo>
        )}
        {searchArtists && searchTracks?.length === 0 && (
          <SearchInfo>
            <FlagIcon />
            <h1>
              No results found for <span>"{userSearchValue}"</span>
            </h1>
            <p>
              please make sure your words are spelled correctly or use less
              <br /> or different words.
            </p>
          </SearchInfo>
        )}
      </SearchResultsContainer>
    </SearchContainer>
  );
};

export default Search;
