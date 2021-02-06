import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { convertMilli } from "../../utils";
import { Link } from "@reach/router";
import { theme } from "../../styles";

const { colors } = theme;

const TrackInfoLargeContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 2vw;
  border-top: 1px solid ${colors.grey};
  border-bottom: 1px solid ${colors.grey};
`;
const TrackInfoContentContainer = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 64px;
  }
  .topTrack__content {
    margin-left: 20px;
    p {
      color: ${colors.white};
    }
    .topTrack__info {
      color: ${colors.lightGrey};
    }
  }
`;

const TrackInfoDurationContainer = styled.div`
  p {
    font-weight: 100;
    color: ${colors.lightestGrey};
    font-style: italic;
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

const TrackInfoLarge = ({ topTrack }) => {
  return (
    <TrackInfoLargeContainer>
      <TrackInfoContentContainer>
        <img src={topTrack?.album?.images[2]?.url} alt={topTrack?.name} />
        <div className="topTrack__content">
          <p>
            {topTrack?.name.length > 30
              ? `${topTrack?.name?.slice(0, 30)}...`
              : topTrack?.name}
          </p>
          <div className="topTrack__info">
            {topTrack?.artists &&
              topTrack?.artists.map(({ name, id }, i) => (
                <ArtistLink to={`/artist/${id}`} key={i}>
                  <span>
                    {name}
                    {topTrack?.artists?.length > 0 &&
                    i === topTrack?.artists?.length - 1
                      ? ""
                      : ","}
                    &nbsp;
                  </span>
                </ArtistLink>
              ))}
          </div>
        </div>
      </TrackInfoContentContainer>
      <TrackInfoDurationContainer>
        <p>{convertMilli(topTrack?.duration_ms)}</p>
      </TrackInfoDurationContainer>
    </TrackInfoLargeContainer>
  );
};

TrackInfoLarge.prototype = {
  topTrack: PropTypes.object.isRequired,
};

export default TrackInfoLarge;
