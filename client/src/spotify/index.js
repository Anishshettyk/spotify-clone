import axios from "axios";
import { getHashParams } from "../utils";

// TOKENS ******************************************************************************************
const EXPIRATION_TIME = 3600 * 1000 * 24 * 365; // 3600 seconds * 1000 = 1 year in milliseconds

const setTokenTimestamp = () =>
  window.localStorage.setItem("SPOTIFY_TOKEN_TIMESTAMP", Date.now());
const setLocalAccessToken = (token) => {
  setTokenTimestamp();
  window.localStorage.setItem("SPOTIFY_ACCESS_TOKEN", token);
};
const setLocalRefreshToken = (token) =>
  window.localStorage.setItem("SPOTIFY_REFRESH_TOKEN", token);
const getTokenTimestamp = () =>
  window.localStorage.getItem("SPOTIFY_TOKEN_TIMESTAMP");
const getLocalAccessToken = () =>
  window.localStorage.getItem("SPOTIFY_ACCESS_TOKEN");
const getLocalRefreshToken = () =>
  window.localStorage.getItem("SPOTIFY_REFRESH_TOKEN");

// Refresh the token
const refreshAccessToken = async () => {
  try {
    const { data } = await axios
      .get(`/refresh_token?refresh_token=${getLocalRefreshToken()}`)
      .catch((error) => {
        if (error.response.status === 401) {
          window.localStorage.removeItem("SPOTIFY_TOKEN_TIMESTAMP");
          window.localStorage.removeItem("SPOTIFY_ACCESS_TOKEN");
          window.localStorage.removeItem("SPOTIFY_REFRESH_TOKEN");
          window.location.reload();
          if (process.env.NODE_ENV !== "production") {
            window.location.href = "http://localhost:3000";
          }
          if (process.env.NODE_ENV === "production") {
            window.location.href = "https://spotify-clone-rne.herokuapp.com";
          }
        }
      });
    const { access_token } = data;
    setLocalAccessToken(access_token);
    window.location.reload();
    return;
  } catch (e) {
    console.warn("couldn't refresh the refresh token");
    console.error(e);
  }
};

// Get access token off of query params (called on application init)
export const getAccessToken = () => {
  const { error, access_token, refresh_token } = getHashParams();

  if (error) {
    console.error(error);
    refreshAccessToken();
  }

  // If token has expired
  if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
    console.warn("Access token has expired, refreshing...");
    refreshAccessToken();
  }

  const localAccessToken = getLocalAccessToken();
  const localRefreshToken = getLocalRefreshToken();

  // If there is no REFRESH token in local storage, set it as `refresh_token` from params
  if (!localRefreshToken || localRefreshToken === "undefined") {
    setLocalRefreshToken(refresh_token);
  }

  // If there is no ACCESS token in local storage, set it and return `access_token` from params
  if (!localAccessToken || localAccessToken === "undefined") {
    setLocalAccessToken(access_token);
    return access_token;
  }

  return localAccessToken;
};

export const token = getAccessToken();

//logout remove local storage item at set the user back to login page
export const logout = () => {
  window.localStorage.removeItem("SPOTIFY_TOKEN_TIMESTAMP");
  window.localStorage.removeItem("SPOTIFY_ACCESS_TOKEN");
  window.localStorage.removeItem("SPOTIFY_REFRESH_TOKEN");
  window.location.reload();
  if (process.env.NODE_ENV !== "production") {
    window.location.href = "http://localhost:3000";
  }
  if (process.env.NODE_ENV === "production") {
    window.location.href = "https://spotify-clone-rne.herokuapp.com";
  }
};

/***************************************  API CALLS  ************************************************/

//headers for every endpoint
const headers = {
  Accept: "application/json",
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

//get user profile
export const getUser = () =>
  axios.get("https://api.spotify.com/v1/me", { headers }).catch((err) => {
    if (err.response.status === 401) {
      logout();
    }
  });

//get following artists
export const getFollowing = () =>
  axios.get("https://api.spotify.com/v1/me/following?type=artist", { headers });

//get users playlists
export const getPlaylists = () =>
  axios.get("https://api.spotify.com/v1/me/playlists", { headers });

export const getUserInfo = () => {
  return axios.all([getUser(), getFollowing(), getPlaylists()]).then(
    axios.spread((user, followedArtists, playlists) => {
      return {
        user: user.data,
        followedArtists: followedArtists.data,
        playlists: playlists.data,
      };
    })
  );
};
