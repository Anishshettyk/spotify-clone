import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme, media } from "../styles";
import { Carousel, AlbumPreviewSmall, IconChange } from "./divisions";
import { homeApis } from "../spotify/";
import { Loader } from "./index";

const { colors } = theme;

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
    span {
      color: ${colors.green};
    }
    ${media.tablet`
    font-size: 35px;
    letter-spacing: 0px;
  `};
  }
`;

const Main = () => {
  const [recentlyReleased, setRecentlyReleased] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState(null);
  const [topTracks, setTopTracks] = useState(null);

  const mainApiCall = async () => {
    const response = await homeApis();
    setRecentlyReleased(response?.newReleases);
    setRecentlyPlayed(response?.recentlyPlayed);
    setTopTracks(response?.topTracks);
  };

  useEffect(() => {
    mainApiCall();
  }, []);

  const findGreeting = () => {
    const date = new Date();
    const hours = date.getHours();
    let message = "Welcome to spotify";
    if (hours > 0 && hours < 12) {
      message = "Good morning";
    } else if (hours > 12 && hours < 16) {
      message = "Good Afternoon";
    } else {
      message = "Good evening";
    }
    return message;
  };

  return (
    <div>
      {recentlyReleased && recentlyPlayed && topTracks ? (
        <HomeContainer>
          <h1>
            {findGreeting()}
            <span>.</span>
          </h1>
          <Carousel
            title={`Top tracks.`}
            discription="Your all time favorite songs."
          >
            {topTracks?.items?.map((track, i) => (
              <IconChange
                key={i}
                track={track}
                fits={300}
                context={track}
                marginSide={5}
              />
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
          <Carousel
            title="Recently Released."
            discription="These are some of the recently released albums"
          >
            {recentlyReleased?.albums?.items?.map((album, i) => (
              <AlbumPreviewSmall key={i} artistAlbum={album} fits={300} />
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
