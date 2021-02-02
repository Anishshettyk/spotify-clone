import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import {
  getTopArtistsShort,
  getTopArtistsMedium,
  getTopArtistsLong,
} from "../spotify";
import { Loader } from "./index";
import styled from "styled-components";
import { theme, mixins, media } from "../styles";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SearchIcon from "@material-ui/icons/Search";

const { colors, spacing } = theme;

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 120,
    backgroundColor: colors.grey,
  },

  SelectStyles: {
    margin: "0px 10px",
  },
}));

const ArtistsStyledContainer = styled.main`
  min-height: 91vh;
  padding: 50px 20px ${theme.visibleBottom} 20px;
  h1 {
    font-size: 45px;
    font-weight: 900;
    letter-spacing: 0.5px;
    padding-bottom: 10px;
    border-bottom: 1px solid ${colors.grey};
  }
`;

const FilterStyledContainer = styled.div`
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
`;

const SortStyledContainer = styled.div`
  ${mixins.flexComman};
  padding-bottom: 10px;
  margin-top: 30px;
  border-bottom: 1px solid ${colors.grey};
  h3 {
    font-weight: 900;
    margin: 0;
    margin-right: 10px;
  }
`;

const ArtistsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
  margin-top: 50px;
  ${media.tablet`
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  `};
  ${media.phablet`
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  `};
`;
const Artist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const Mask = styled.div`
  ${mixins.flexCenter};
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 100%;
  font-size: 20px;
  color: ${colors.white};
  opacity: 0;
  transition: ${theme.transition};
`;
const ArtistArtwork = styled(Link)`
  display: inline-block;
  position: relative;
  width: 200px;
  height: 200px;
  ${media.tablet`
    width: 150px;
    height: 150px;
  `};
  ${media.phablet`
    width: 120px;
    height: 120px;
  `};
  &:hover,
  &:focus {
    ${Mask} {
      opacity: 1;
    }
  }
  img {
    border-radius: 100%;
    object-fit: cover;
    width: 200px;
    height: 200px;
    ${media.tablet`
      width: 150px;
      height: 150px;
    `};
    ${media.phablet`
      width: 120px;
      height: 120px;
    `};
  }
`;
const ArtistName = styled(Link)`
  margin: ${spacing.base} 0;
  border-bottom: 1px solid transparent;
  &:hover,
  &:focus {
    border-bottom: 1px solid ${colors.green};
    color: ${colors.green};
  }
`;

const StyledFormControl = styled(FormControl)`
  div {
    &:before,
    &:after {
      border: none;
    }
  }
`;

const Artists = () => {
  const [topArtists, setTopArtists] = useState(null);
  const [filterValue, setFilterValue] = useState("");

  const getTopArtists = async () => {
    const { data } = await getTopArtistsLong();
    setTopArtists(data);
  };

  useEffect(() => {
    getTopArtists();
  }, []);

  const apiCalls = {
    long: getTopArtistsLong(),
    medium: getTopArtistsMedium(),
    short: getTopArtistsShort(),
  };

  const changeRange = async (range) => {
    const { data } = await apiCalls[range];
    setTopArtists(data);
  };

  const setActiveRange = (range) => changeRange(range);

  const classes = useStyles();

  return (
    <section>
      {topArtists ? (
        <ArtistsStyledContainer>
          <h1>Artists</h1>
          <FilterStyledContainer>
            <SearchIcon />
            <input
              type="text"
              placeholder="Filter Artists by Name"
              onChange={(event) => setFilterValue(event.target.value)}
            />
          </FilterStyledContainer>
          <SortStyledContainer>
            <h3>Sorted by</h3>
            <StyledFormControl className={classes.formControl}>
              <Select
                inputProps={{ "aria-label": "sort latest artists" }}
                defaultValue="All time"
                className={classes.SelectStyles}
              >
                <MenuItem
                  value="All time"
                  onClick={() => setActiveRange("long")}
                >
                  All time
                </MenuItem>
                <MenuItem
                  value="last 6 months"
                  onClick={() => setActiveRange("medium")}
                >
                  Last 6 months
                </MenuItem>
                <MenuItem
                  value="last 4 weeks"
                  onClick={() => setActiveRange("short")}
                >
                  Last 4 weeks
                </MenuItem>
              </Select>
            </StyledFormControl>
          </SortStyledContainer>
          <ArtistsContainer>
            {topArtists &&
              topArtists.items
                // eslint-disable-next-line array-callback-return
                .filter((artist) => {
                  if (filterValue === "") {
                    return artist;
                  } else if (
                    artist.name
                      .toLowerCase()
                      .includes(filterValue.toLowerCase())
                  ) {
                    return artist;
                  }
                })
                .map((artist, i) => (
                  <Artist key={i}>
                    <ArtistArtwork to={`/artist/${artist.id}`}>
                      {artist.images.length && (
                        <img src={artist.images[1].url} alt="Artist" />
                      )}
                      <Mask>
                        <PlayCircleOutlineIcon style={{ fontSize: 50 }} />
                      </Mask>
                    </ArtistArtwork>
                    <ArtistName to={`/artist/${artist.id}`}>
                      {artist.name}
                    </ArtistName>
                  </Artist>
                ))}
          </ArtistsContainer>
        </ArtistsStyledContainer>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default Artists;
