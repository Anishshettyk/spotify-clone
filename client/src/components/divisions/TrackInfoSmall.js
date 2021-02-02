import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { theme } from "../../styles";
import { convertMilli } from "../../utils";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

const { colors } = theme;

const TrackInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${colors.grey};
  border-bottom: 1px solid ${colors.grey};
  &:hover {
    background-color: ${colors.black};
  }
  .TrackInfoSmall__main {
    display: flex;
    align-items: center;

    img {
      width: 50px;
      height: 50px;
    }
    p {
      margin: 0;
      margin-left: 20px;
    }
    span {
      margin-left: 10px;
    }
  }
  .TrackInfoSmall__duration {
    margin-right: 10px;
    font-weight: 200;
  }
`;

const TrackInfoSmall = ({ TopTrack, trackNumber }) => {
  const [insideValue, setInsideValue] = useState(true);

  const mouseAction = () => {
    setInsideValue(!insideValue);
  };

  return (
    <TrackInfoContainer onMouseEnter={mouseAction} onMouseLeave={mouseAction}>
      <div className="TrackInfoSmall__main">
        <img src={TopTrack.album.images[2].url} alt={TopTrack.album.name} />
        <span>{insideValue ? trackNumber : <PlayCircleOutlineIcon />}</span>
        <p>{TopTrack.album.name}</p>
      </div>
      <p className="TrackInfoSmall__duration">
        {convertMilli(TopTrack.duration_ms)}
      </p>
    </TrackInfoContainer>
  );
};

TrackInfoSmall.prototype = {
  TopTrack: PropTypes.object.isRequired,
  trackNumber: PropTypes.number.isRequired,
};

export default TrackInfoSmall;
