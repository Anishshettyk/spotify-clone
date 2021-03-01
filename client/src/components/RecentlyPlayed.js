import React, { useState, useEffect } from "react";
import { getRecentlyPlayed } from "../spotify";
import styled from "styled-components";
import { Loader } from "./index";
import { IconChange } from "./divisions";

import { theme, media } from "../styles";

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
              <IconChange track={track} context={context} key={i} />
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
