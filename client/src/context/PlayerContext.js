import React, { createContext, useReducer, useState, useEffect } from "react";
import { getRecentlyPlayed } from "../spotify";
import PlayerReducer from "./PlayerReducer";

const initialState = {
  playerData: {
    musicImageUrl: null,
    musicName: null,
    musicArtistName: null,
    musicArtistId: null,
    musicPreviewUrl: null,
    musicID: null,
    audioplaying: false,
  },
};

export const PlayerContext = createContext(initialState);

const PlayerProvider = ({ children }) => {
  const [playerData, setPlayerData] = useState(null);
  const [state, dispath] = useReducer(PlayerReducer, initialState);

  useEffect(() => {
    const playerInitialDataRequest = async () => {
      const response = await getRecentlyPlayed();
      setPlayerData(response.data.items[0]);
    };
    playerInitialDataRequest();
  }, []);

  if (playerData) {
    const {
      track: {
        artists,
        album: { images, name },
        preview_url,
        id,
      },
    } = playerData;

    initialState.playerData.musicPreviewUrl = preview_url;
    initialState.playerData.musicName = name;
    initialState.playerData.musicImageUrl = images[2].url;
    initialState.playerData.musicArtistName = artists[0].name;
    initialState.playerData.musicArtistId = artists[0].id;
    initialState.playerData.musicID = id;
  }

  const playClickedMusic = (playerData) => {
    dispath({
      type: "PLAY_MUSIC",
      payload: playerData,
    });
  };

  return (
    <PlayerContext.Provider
      value={{ playerData: state.playerData, playClickedMusic }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
