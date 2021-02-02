import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  getArtist,
  doesUserFollowArtist,
  followArtist,
  unfollowArtist,
  getArtistAlbumSingle,
  getRelatedArtist,
  getArtistsTopTrack,
  getArtistAlbumAppearsOn,
} from "../spotify/";
import { formatWithCommas } from "./../utils";
import { Profile, TrackInfoSmall, AlbumPreviewSmall } from "./divisions";
import { Loader } from "./index";
import { media, mixins, theme } from "../styles";
import { Avatar } from "@material-ui/core";

const { colors } = theme;

const StyledArtistContainer = styled.main`
  margin: 0 15px ${theme.visibleBottom} 15px;
`;
const ArtistTopContentContainer = styled.div`
  ${mixins.flexBetween};
  p {
    color: ${colors.lightGrey};
    padding-right: 20px;
    text-transform: uppercase;
    font-size: 13px;
    ${media.phablet`
      display:none;
    `}
  }
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
const ArtistContentContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 20px;
  margin: 10px 0px;
  ${media.tablet`
  display:block;
  `}
`;
const ArtistContent = styled.div``;

const FansAlsoLikeContainer = styled.div`
  .fansAlsoLike__container {
    margin: 10px 0px;
    padding: 2px;
    border-radius: 2px;
    &:hover {
      background-color: ${colors.black};
    }
    ${mixins.flexComman};
    h5 {
      margin: 0;
      margin-left: 10px;
    }
  }
  ${media.tablet`
  margin-top:5vh;
  `}
`;

const LatestReleaseContainer = styled.div`
  .latest__release__container {
    ${mixins.flexStart};
    &:hover {
      background-color: ${colors.black};
    }
    img {
      width: 80px;
      height: 80px;
    }
    .latest__release__content {
      padding: 0px 10px;
      p {
        color: ${colors.lightestGrey};
      }
    }
  }
`;
const CommanLink = styled(Link)`
  width: 100%;
`;

const TopTracksContainer = styled.div`
  padding: 10px 0px;
  button {
    margin-top: 20px;
    ${mixins.greenButton};
  }
`;

const ArtistMoreContentContainer = styled.div`
  margin: 10px 0px;
  h3 {
    padding-bottom: 10px;
    border-bottom: 1px solid ${colors.grey};
  }
`;
const ArtistSingleContainer = styled.div`
  margin-top: 5vh;
  .Artist__content {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    grid-gap: 20px;
    margin-top: 20px;

    ${media.tablet`
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  `};
    ${media.phablet`
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  `};
  }
`;
const ArtistAppearedContainer = styled.div`
  margin-top: 10vh;
  .Artist__content {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    grid-gap: 20px;
    margin-top: 20px;

    ${media.tablet`
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  `};
    ${media.phablet`
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  `};
  }
`;

const Artist = ({ artistID }) => {
  const [artistData, setArtistData] = useState(null);
  const [followersState, setFollowersState] = useState(false);
  const [artistAlbums, setArtistAlbums] = useState(null);
  const [artistAlbumsAppeared, setArtistAlbumsAppeared] = useState(null);
  const [relatedArtist, setRelatedArtist] = useState(null);
  const [ArtistsTopTracks, setArtistsTopTracks] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    let isActive = true;

    const getArtistData = async () => {
      const artistDataResponse = await getArtist(artistID);
      const { data } = await doesUserFollowArtist(artistID);

      if (isActive) {
        setArtistData(artistDataResponse);
        setFollowersState(data[0]);
      }
    };

    const getArtistContent = async () => {
      const AlbumResponse = await getArtistAlbumSingle(artistID);
      const relatedArtistResponse = await getRelatedArtist(artistID);
      const AlbumAppearedResponse = await getArtistAlbumAppearsOn(artistID);

      if (isActive) {
        setArtistAlbums(AlbumResponse.data);
        setArtistAlbumsAppeared(AlbumAppearedResponse.data);
        setRelatedArtist(relatedArtistResponse.data.artists);
      }
    };

    const getArtistsTopTrackRequest = async () => {
      const ArtistsTopTracksResponse = await getArtistsTopTrack(artistID);
      if (isActive) {
        setArtistsTopTracks(ArtistsTopTracksResponse.data.tracks);
      }
    };

    getArtistData();
    getArtistContent();
    getArtistsTopTrackRequest();
    return () => {
      isActive = false;
    };
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

  //Get a slice of top Tracks
  const ArtistsTopTracksSmall = ArtistsTopTracks?.slice(0, 5);
  const TopTracksToShow = showMore ? ArtistsTopTracks : ArtistsTopTracksSmall;

  return (
    <section>
      {artistData ? (
        <StyledArtistContainer>
          {artistData && (
            <div>
              <Profile profiler={artistData.data} />
              <ArtistTopContentContainer>
                <ArtistStyledButtonContainer>
                  <button>Play</button>
                  <button onClick={() => followAction(followersState)}>
                    {followersState ? "Following" : "Follow"}
                  </button>
                </ArtistStyledButtonContainer>
                <p>
                  Total Followings
                  <br />
                  <span>
                    {formatWithCommas(artistData.data.followers.total)}
                  </span>
                </p>
              </ArtistTopContentContainer>
              <ArtistContentContainer>
                <ArtistContent>
                  <LatestReleaseContainer>
                    <h3>Latest Release</h3>
                    {artistAlbums && (
                      <CommanLink to={`/albums/${artistAlbums.items[0]?.id}`}>
                        <div className="latest__release__container">
                          <img
                            src={artistAlbums?.items[0]?.images[0].url}
                            alt={artistAlbums?.items[0]?.name}
                          />
                          <div className="latest__release__content">
                            <h4>
                              {artistAlbums?.items[0]?.name ||
                                "No latest release available"}
                            </h4>
                            <p>{artistAlbums?.items[0]?.release_date}</p>
                          </div>
                        </div>
                      </CommanLink>
                    )}
                  </LatestReleaseContainer>
                  <TopTracksContainer>
                    <h3>Popular</h3>
                    {TopTracksToShow &&
                      TopTracksToShow.map((TopTrack, i) => (
                        <TrackInfoSmall
                          key={i}
                          TopTrack={TopTrack}
                          trackNumber={i + 1}
                        />
                      ))}
                    <button onClick={() => setShowMore(!showMore)}>
                      {showMore ? "Show less" : "Show more"}
                    </button>
                  </TopTracksContainer>
                </ArtistContent>
                <FansAlsoLikeContainer>
                  <h3>Fans also like</h3>
                  {relatedArtist &&
                    relatedArtist.slice(0, 7).map((artist, i) => (
                      <CommanLink to={`/artist/${artist?.id}`} key={i}>
                        <div className="fansAlsoLike__container">
                          <Avatar
                            src={artist.images[0]?.url}
                            alt={artist?.name}
                          />
                          <h5>{artist?.name}</h5>
                        </div>
                      </CommanLink>
                    ))}
                </FansAlsoLikeContainer>
              </ArtistContentContainer>
              <ArtistMoreContentContainer>
                <ArtistSingleContainer>
                  <h3>Singles and EPs</h3>
                  <div className="Artist__content">
                    {artistAlbums &&
                      artistAlbums.items.map((artistAlbum, i) => (
                        <AlbumPreviewSmall artistAlbum={artistAlbum} key={i} />
                      ))}
                  </div>
                </ArtistSingleContainer>
                <ArtistAppearedContainer>
                  <h3>Appears on</h3>
                  <div className="Artist__content">
                    {artistAlbumsAppeared &&
                      artistAlbumsAppeared.items.map(
                        (artistAppearedAlbum, i) => (
                          <AlbumPreviewSmall
                            artistAlbum={artistAppearedAlbum}
                            key={i}
                          />
                        )
                      )}
                  </div>
                </ArtistAppearedContainer>
              </ArtistMoreContentContainer>
            </div>
          )}
        </StyledArtistContainer>
      ) : (
        <Loader />
      )}
    </section>
  );
};

Artist.propTypes = {
  artistID: PropTypes.string,
};

export default Artist;
