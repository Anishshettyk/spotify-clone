import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme, mixins } from "../styles";
import { getSearchResults } from "../spotify";

import SearchIcon from "@material-ui/icons/Search";

const { colors } = theme;

const SearchContainer = styled.section`
  margin: 20px 30px calc(${theme.navHeight} + 20px);
  .search__field {
    margin-top: 20px;
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
  margin-top: 20px;
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
  }
  p {
    text-align: center;
    color: ${colors.lightestGrey};
  }
`;

const Search = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [userSearchValue, setUserSearchValue] = useState("");

  useEffect(() => {
    fetchSearchResults(userSearchValue);
  }, [userSearchValue]);

  const fetchSearchResults = async (searchValue) => {
    if (searchValue) {
      const response = await getSearchResults(searchValue);
      setSearchResults(response);
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
        {userSearchValue ? (
          "hello search"
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
      </SearchResultsContainer>
    </SearchContainer>
  );
};

export default Search;
