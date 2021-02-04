const PlayerReducer = (state, action) => {
  switch (action.type) {
    case "PLAY_MUSIC":
      return {
        ...state,
        playerData: action.payload,
      };
    default:
      return state;
  }
};

export default PlayerReducer;
