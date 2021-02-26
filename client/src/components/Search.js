import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "@reach/router";
import { theme, mixins, media } from "../styles";
import { getSearchResults } from "../spotify";
import { Carousel, IconChange } from "./divisions";

import SearchIcon from "@material-ui/icons/Search";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import FlagIcon from "@material-ui/icons/Flag";
import noUserImage from "../assets/no-user.png";

const { colors } = theme;

const SearchContainer = styled.section`
  margin: 20px 30px calc(${theme.navHeight} + 35px);
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
  padding: 0px 10px;
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
const ArtistSearchContent = styled.div`
  ${mixins.flexColumn}
  h4 {
    margin-top: 20px;
    border: 1px solid transparent;
    &:hover {
      border-bottom: 1px solid ${colors.white};
    }
    ${media.tablet`
    font-size:13px;
  `}
  }
`;
const Item = styled.div`
  margin: 0 10px;
  text-align: center;
  padding: 100px;
  background-image: ${(props) => `url(${props.img})`};
  background-size: cover;
  border-radius: 50%;
  ${media.tablet`
  padding:50px;
  `}
`;

const Mask = styled.div`
  ${mixins.flexCenter};
  position: absolute;
  padding: 100px;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  left: 10px;
  right: 10px;
  border-radius: 50%;
  font-size: 20px;
  color: ${colors.white};
  opacity: 0;
  transition: ${theme.transition};
  ${media.tablet`
  padding:50px;
  `}
`;
const ArtistArtwork = styled(Link)`
  display: inline-block;
  position: relative;

  &:hover,
  &:focus {
    ${Mask} {
      opacity: 1;
    }
  }
  ${Item} {
    border-radius: 100%;
    object-fit: cover;
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
      const response = await getSearchResults(searchValue);
      setSearchArtists(response?.artists?.artists?.items);
      setSearchTracks(response?.tracks?.tracks?.items);
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
            <Carousel title="Top Results (Artists)">
              {searchArtists &&
                searchArtists.map((artist, i) => (
                  <ArtistSearchContent key={i}>
                    <ArtistArtwork to={`/artist/${artist.id}`}>
                      <Item
                        img={
                          artist?.images.length === 0
                            ? noUserImage
                            : artist?.images[0]?.url
                        }
                        alt={artist?.name}
                      />
                      <Mask>
                        <PlayCircleOutlineIcon style={{ fontSize: 50 }} />
                      </Mask>
                    </ArtistArtwork>

                    <Link to={`/artist/${artist?.id}`}>
                      <h4>
                        {artist?.name?.length > 15
                          ? `${artist?.name?.slice(0, 15)}...`
                          : artist?.name}
                      </h4>
                    </Link>
                  </ArtistSearchContent>
                ))}
            </Carousel>
            <Carousel
              title="Top Results (Tracks)"
              style={{ marginTop: "10vh" }}
            >
              {searchTracks &&
                searchTracks?.map((track, i) => (
                  <SearchedTrack key={i}>
                    <IconChange track={track} fits={250} marginSide={10} />
                    <h4>
                      {track?.name.length > 30
                        ? `${track?.name?.slice(0, 30)}...`
                        : track?.name}
                    </h4>
                    <div className="artist__container">
                      {track?.artists &&
                        track?.artists.slice(0, 3).map(({ name, id }, i) => (
                          <ArtistArtwork to={`/artist/${id}`} key={i}>
                            <span>
                              {name}
                              {track?.artists?.length > 0 &&
                              i === track?.artists?.length - 1
                                ? ""
                                : ","}
                              &nbsp;
                            </span>
                          </ArtistArtwork>
                        ))}
                    </div>
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
