import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme, media } from "../styles";
import { Carousel, AlbumPreviewSmall, IconChange } from "./divisions";
import { homeApis } from "../spotify/";
import { Loader } from "./index";

const HomeContainer = styled.main`
  margin: 20px 30px ${theme.visibleBottom};
  ${media.tablet`
  margin-left:10px;
  margin-right: 10px;
  `}
  h1 {
    font-size: 50px;
    letter-spacing: 0.5px;
    margin-bottom: 40px;
    ${media.tablet`
    font-size: 40px;
    letter-spacing: 0px;
  `}
  }
`;

const Main = () => {
  const [recentlyReleased, setRecentlyReleased] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState(null);

  const mainApiCall = async () => {
    const response = await homeApis();
    setRecentlyReleased(response?.newReleases);
    setRecentlyPlayed(response?.recentlyPlayed);
  };

  useEffect(() => {
    mainApiCall();
  }, []);

  return (
    <div>
      {recentlyReleased && recentlyPlayed ? (
        <HomeContainer>
          <h1>Home</h1>
          <Carousel
            title="Recently Released."
            discription="These are some of the recently released albums"
          >
            {recentlyReleased?.albums?.items?.map((album, i) => (
              <AlbumPreviewSmall key={i} artistAlbum={album} fits={300} />
            ))}
          </Carousel>
          <Carousel
            title="Recently Played."
            discription="These are some of your recently played"
          >
            {recentlyPlayed?.items?.map((item, i) => (
              <IconChange
                key={i}
                track={item?.track}
                fits={300}
                context={item?.context}
                marginSide={5}
              />
            ))}
          </Carousel>
        </HomeContainer>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Main;
