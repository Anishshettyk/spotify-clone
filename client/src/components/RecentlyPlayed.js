import React, { useState, useEffect, useContext } from "react";
import { getRecentlyPlayed, getTrack } from "../spotify";
import styled from "styled-components";
import { Loader } from "./index";
import { theme, media, mixins } from "../styles";
import { Link } from "@reach/router";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { PlayerContext } from "../context/PlayerContext";

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
  font-size: 20px;
  color: ${colors.white};
  opacity: 0;
  transition: ${theme.transition};
`;

const RecentlyPlayedInsider = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  &:hover,
  &:focus {
    ${Mask} {
      opacity: 1;
    }
  }
  img {
    object-fit: cover;
    width: 100%;

    box-shadow: ${mixins.coverShadow};
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
  const { playClickedMusic } = useContext(PlayerContext);

  useEffect(() => {
    const getRecentlyPlayedData = async () => {
      const recentlyPlayedResponse = await getRecentlyPlayed();
      setRecentlyPlayed(recentlyPlayedResponse.data);
    };
    getRecentlyPlayedData();
  }, []);

  const playClickedSong = async (trackID) => {
    const response = await getTrack(trackID);
    const {
      album: { images },
      preview_url,
      artists,
      name,
    } = response?.data;

    const playerData = {
      musicImageUrl: images[2]?.url,
      musicName: name,
      musicArtistName: artists[0]?.name,
      musicArtistId: artists[0]?.id,
      musicPreviewUrl: preview_url,
    };
    playClickedMusic(playerData);
  };

  return (
    <section>
      {recentlyPlayed ? (
        <StyledRecentlyPlayedContainer>
          <h1>Recently Played.</h1>
          <RecentlyPlayedContentContainer>
            {recentlyPlayed?.items.map(({ context, track }, i) => (
              <RecentlyPlayedContent key={i}>
                <RecentlyPlayedInsider
                  onClick={() => playClickedSong(track?.id)}
                >
                  <img src={track?.album?.images[1]?.url} alt={track?.name} />
                  <Mask>
                    <PlayCircleOutlineIcon style={{ fontSize: 80 }} />
                  </Mask>
                </RecentlyPlayedInsider>
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
