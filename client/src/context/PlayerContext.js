import React, { createContext, useReducer, useState, useEffect } from "react";
import { getRecentlyPlayed } from "../spotify";
import PlayerReducer from "./PlayerReducer";

export const PlayerContext = createContext();

const PlayerProvider = ({ children }) => {
  const [playerData, setPlayerData] = useState([]);
  useReducer(PlayerReducer, playerData);

  useEffect(() => {
    const playerInitialDataRequest = async () => {
      const response = await getRecentlyPlayed();
      setPlayerData(response.data.items[0]);
    };
    playerInitialDataRequest();
  }, []);

  return (
    <PlayerContext.Provider value={{ playerData }}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
