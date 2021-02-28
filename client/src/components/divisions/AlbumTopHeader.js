import React from "react";
import styled from "styled-components";
import { theme } from "../../styles";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

const { colors } = theme;

const StyledAlbumHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid ${colors.grey};
  padding: 10px 10px;
  .StyledAlbumHeaderContainer__inner_1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      margin: 0;
      color: ${colors.lightGrey};
      font-size: 13px;
      &:nth-child(1) {
        margin-right: 95px;
      }
    }
  }
  .StyledAlbumHeaderContainer__inner_2 {
    svg {
      color: ${colors.lightGrey};
      font-size: 18px;
    }
  }
`;

const AlbumTopHeader = () => {
  return (
    <StyledAlbumHeaderContainer>
      <div className="StyledAlbumHeaderContainer__inner_1">
        <p>#</p>
        <p>TITLE</p>
      </div>
      <div className="StyledAlbumHeaderContainer__inner_2">
        <AccessTimeIcon />
      </div>
    </StyledAlbumHeaderContainer>
  );
};

export default AlbumTopHeader;
