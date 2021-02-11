import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  getTopTracksShort,
  getTopTracksMedium,
  getTopTracksLong,
} from "../spotify";
import { Loader } from "./index";
import { TrackInfoLarge } from "./divisions";
import { theme, mixins } from "../styles";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const { colors } = theme;

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 120,
    backgroundColor: colors.grey,
  },

  SelectStyles: {
    margin: "0px 10px",
  },
}));

const TopTracksContainer = styled.main`
  margin: 10px 20px calc(${theme.navHeight} + 18px) 20px;
  h1 {
    font-size: 40px;
  }
`;

const SortStyledContainer = styled.div`
  ${mixins.flexComman};
  margin-top: 30px;
  padding-bottom: 10px;
  border-bottom: 2px solid ${colors.grey};
  h3 {
    font-weight: 900;
    margin: 0;
    margin-right: 10px;
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
const TopTrackContainer = styled.div`
  margin-top: 5vh;
`;

const TopTracks = () => {
  const [topTracks, setTopTracks] = useState(null);

  const getInitialTopTracks = async () => {
    const response = await getTopTracksLong();
    setTopTracks(response?.data?.items);
  };

  useEffect(() => {
    getInitialTopTracks();
  }, []);

  const apiCalls = {
    long: getTopTracksLong(),
    medium: getTopTracksMedium(),
    short: getTopTracksShort(),
  };

  const changeRange = async (range) => {
    const { data } = await apiCalls[range];
    setTopTracks(data?.items);
  };

  const setActiveRange = (range) => changeRange(range);

  const classes = useStyles();

  return (
    <TopTracksContainer>
      {topTracks ? (
        <section>
          <h1>Top Tracks</h1>
          <SortStyledContainer>
            <h3>Sorted by</h3>
            <StyledFormControl className={classes.formControl}>
              <Select
                inputProps={{ "aria-label": "Sort latest tracks" }}
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
          <TopTrackContainer>
            {topTracks &&
              topTracks.map((topTrack, i) => (
                <TrackInfoLarge key={i} topTrack={topTrack} />
              ))}
          </TopTrackContainer>
        </section>
      ) : (
        <Loader />
      )}
    </TopTracksContainer>
  );
};

export default TopTracks;
