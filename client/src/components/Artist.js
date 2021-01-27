import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  getArtist,
  doesUserFollowArtist,
  followArtist,
  unfollowArtist,
} from "../spotify/";
import { Profile } from "./divisions";
import { mixins } from "../styles";

const StyledArtistContainer = styled.main`
  margin: 0px 15px;
`;
const ArtistStyledButtonContainer = styled.div`
  margin: 15px 0px 15px 15px;
  button {
    &:nth-child(1) {
      ${mixins.greenButton};
      margin-right: 15px;
    }
    &:nth-child(2) {
      ${mixins.greenOutlineButton};
    }
  }
`;

const Artist = ({ artistID }) => {
  const [artistData, setArtistData] = useState(null);
  const [followersState, setFollowersState] = useState(false);

  useEffect(() => {
    const getArtistData = async () => {
      const artistDataResponse = await getArtist(artistID);
      const { data } = await doesUserFollowArtist(artistID);
      setArtistData(artistDataResponse);
      setFollowersState(data[0]);
    };
    getArtistData();
  }, [artistID]);

  const isFollowing = async () => {
    const { data } = await doesUserFollowArtist(artistID);
    setFollowersState(data[0]);
  };

  const followAction = async (followersState) => {
    if (followersState) {
      await unfollowArtist(artistID);
      isFollowing();
    }
    if (!followersState) {
      await followArtist(artistID);
      isFollowing();
    }
  };

  return (
    <StyledArtistContainer>
      {artistData ? (
        <div>
          <Profile profiler={artistData.data} />
          <ArtistStyledButtonContainer>
            <button>Play</button>
            <button onClick={() => followAction(followersState)}>
              {followersState ? "Following" : "Follow"}
            </button>
          </ArtistStyledButtonContainer>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </StyledArtistContainer>
  );
};

Artist.propTypes = {
  artistID: PropTypes.string,
};

export default Artist;
