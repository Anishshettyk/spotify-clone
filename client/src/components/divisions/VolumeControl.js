import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles";
import { Slider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";

const { colors } = theme;

const PlayerFeaturesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  svg {
    cursor: pointer;
    margin-right: 15px;
  }
`;
const PrettoSlider = withStyles({
  root: {
    color: colors.green,
  },
  thumb: {
    height: 12,
    width: 12,
    backgroundColor: colors.white,
  },
  rail: {
    color: colors.lightGrey,
  },
})(Slider);

const VolumeControl = ({ audioRef }) => {
  const [volume, setVolume] = useState(50);

  const changeVolume = (event, newValue) => {
    setVolume(newValue);
  };
  const audio = audioRef.current;
  if (audio) {
    audio.volume = volume / 100;
  }

  return (
    <PlayerFeaturesContainer>
      {volume === 0 ? (
        <VolumeOffIcon onClick={() => setVolume(50)} />
      ) : (
        <VolumeUpIcon onClick={() => setVolume(0)} />
      )}
      <PrettoSlider
        style={{ width: "40%" }}
        value={volume}
        onChange={changeVolume}
      />
    </PlayerFeaturesContainer>
  );
};

export default VolumeControl;
