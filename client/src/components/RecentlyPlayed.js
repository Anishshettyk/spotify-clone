import React, { useState, useEffect } from "react";
import { getRecentlyPlayed } from "../spotify";
import styled from "styled-components";
import { Loader } from "./index";
import { IconChange } from "./divisions";

import { theme, media } from "../styles";
import { Link } from "@reach/router";

const { colors } = theme;

const StyledRecentlyPlayedContainer = styled.main`
  margin: 5vh 20px ${theme.visibleBottom} 20px;
  h1 {
    font-size: 40px;
    font-weight: 900;
    letter-spacing: 0.5px;
    padding-bottom: 5px;
    border-bottom: 2px solid ${colors.grey};
    ${media.tablet`
     font-size:30px;
    `}
  }
`;
const RecentlyPlayedContentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  grid-gap: 20px;
  margin-top: 20px;

  ${media.tablet`
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  `};
  ${media.phablet`
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  `};
`;

const RecentlyPlayedContent = styled.div`
  h4 {
    color: ${colors.white};
    padding: 5px 0px;
    margin: 0;
  }
  span {
    color: ${colors.lightGrey};
  }
  p {
    padding-top: 5px;
    text-transform: uppercase;
    color: ${colors.lightGrey};
    font-size: 12px;
  }
`;

const ArtistLink = styled(Link)`
  border-bottom: 1px solid transparent;
  &:hover,
  &:focus {
    border-bottom: 1px solid ${colors.green};
    span {
      color: ${colors.green};
    }
  }
`;

const RecentlyPlayed = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState(null);

  useEffect(() => {
    const getRecentlyPlayedData = async () => {
      const recentlyPlayedResponse = await getRecentlyPlayed();
      setRecentlyPlayed(recentlyPlayedResponse.data);
    };
    getRecentlyPlayedData();
  }, []);

  return (
    <section>
      {recentlyPlayed ? (
        <StyledRecentlyPlayedContainer>
          <h1>Recently Played.</h1>
          <RecentlyPlayedContentContainer>
            {recentlyPlayed?.items.map(({ context, track }, i) => (
              <RecentlyPlayedContent key={i}>
                <IconChange track={track} />
                <h4>{track?.name}</h4>
                {track?.artists &&
                  track?.artists.map(({ name, id }, i) => (
                    <ArtistLink to={`/artist/${id}`} key={i}>
                      <span>
                        {name}
                        {track?.artists?.length > 0 &&
                        i === track?.artists?.length - 1
                          ? ""
                          : ","}
                        &nbsp;
                      </span>
                    </ArtistLink>
                  ))}
                <p>{context?.type}</p>
              </RecentlyPlayedContent>
            ))}
          </RecentlyPlayedContentContainer>
        </StyledRecentlyPlayedContainer>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default RecentlyPlayed;
