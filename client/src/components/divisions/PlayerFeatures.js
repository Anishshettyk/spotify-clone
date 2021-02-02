import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { theme } from "../../styles";
import { Tooltip } from "@material-ui/core";

import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import DevicesIcon from "@material-ui/icons/Devices";

const { colors } = theme;

const PlayerFeaturesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  svg {
    cursor: pointer;
    margin-right: 15px;
  }
  .volume__control {
    display: flex;
    width: 50%;
    svg {
      margin-right: 15px;
    }
  }
`;

const PlayerFeatures = () => {
  return (
    <PlayerFeaturesContainer>
      <Tooltip title="Queue">
        <QueueMusicIcon style={{ fontSize: 20, color: colors.lightGrey }} />
      </Tooltip>
      <Tooltip title="Device Available">
        <DevicesIcon style={{ fontSize: 20, color: colors.lightGrey }} />
      </Tooltip>
    </PlayerFeaturesContainer>
  );
};
PlayerFeatures.prototype = {
  deviceID: PropTypes.string,
};

export default PlayerFeatures;
