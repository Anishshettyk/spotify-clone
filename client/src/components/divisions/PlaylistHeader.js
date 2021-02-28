import React from "react";
import styled from "styled-components";
import { theme, media } from "../../styles";

import TodayIcon from "@material-ui/icons/Today";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

const { colors } = theme;

const PlaylistHeaderContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 4fr 2fr 3fr 2fr 1fr;
  border-bottom: 1px solid ${colors.grey};
  p {
    color: ${colors.lightGrey};
    font-size: 14px;
    &:nth-child(1) {
      margin-left: 10px;
    }
    ${media.tablet`
  &:nth-child(3){
      display:none;
  }
  &:nth-child(4){
      display:none;
  }
  &:nth-child(5){
      display:none;
  }
  `}
  }
  ${media.tablet`
  grid-template-columns: 1fr 4fr  1fr
  `}
`;

const PlaylistHeader = () => {
  return (
    <PlaylistHeaderContainer>
      <p>#</p>
      <p>TITLE</p>
      <p>ARTIST</p>
      <p>ALBUM</p>
      <p>
        <TodayIcon />
      </p>
      <p>
        <AccessTimeIcon />
      </p>
    </PlaylistHeaderContainer>
  );
};

export default PlaylistHeader;
