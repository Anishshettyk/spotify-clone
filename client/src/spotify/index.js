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
        if (error?.response?.status === 401) {
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
    if (err.response?.status === 401) {
      logout();
    }
  });

//get following artists
export const getFollowing = () =>
  axios.get("https://api.spotify.com/v1/me/following?type=artist", { headers });

//get users playlists
export const getPlaylists = () =>
  axios.get("https://api.spotify.com/v1/me/playlists", { headers });

//get a particular playlist
export const getAParticularPlaylist = (playlistID) =>
  axios.get(`https://api.spotify.com/v1/playlists/${playlistID}?market=IN`, {
    headers,
  });

//get artists (short list)
export const getTopArtistsShort = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term",
    {
      headers,
    }
  );

//get artists (medium list)
export const getTopArtistsMedium = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term",
    {
      headers,
    }
  );

//get artists (long list)
export const getTopArtistsLong = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term",
    { headers }
  );

//get a artist details
export const getArtist = (artistID) =>
  axios.get(`https://api.spotify.com/v1/artists/${artistID}`, { headers });

//follow a artist
export const followArtist = (artistId) => {
  const url = `https://api.spotify.com/v1/me/following?type=artist&ids=${artistId}`;
  return axios({ method: "put", url, headers });
};

//unfollow a artist
export const unfollowArtist = (artistId) => {
  const url = `https://api.spotify.com/v1/me/following?type=artist&ids=${artistId}`;
  return axios({ method: "delete", url, headers });
};

//does user follow that particular artist
export const doesUserFollowArtist = (artistId) =>
  axios.get(
    `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${artistId}`,
    { headers }
  );

//get artists popular tracks
export const getArtistsTopTrack = (artistId) =>
  axios.get(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=IN`,
    { headers }
  );

//get an artist album (single)
export const getArtistAlbumSingle = (artistId) =>
  axios.get(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=single&market=IN&limit=20&offset=0`,
    { headers }
  );
//get an artist album (appeared on)
export const getArtistAlbumAppearsOn = (artistId) =>
  axios.get(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=appears_on&market=IN&limit=20&offset=0`,
    { headers }
  );

//get artists related to a artist
export const getRelatedArtist = (artistId) =>
  axios.get(`https://api.spotify.com/v1/artists/${artistId}/related-artists`, {
    headers,
  });

//get recently played tracks
export const getRecentlyPlayed = () =>
  axios.get("https://api.spotify.com/v1/me/player/recently-played", {
    headers,
  });

//get a album details
export const getAlbumDetails = (albumId) =>
  axios.get(`https://api.spotify.com/v1/albums/${albumId}?market=IN`, {
    headers,
  });
// get a track
export const getTrack = (trackId) =>
  axios.get(`https://api.spotify.com/v1/tracks/${trackId}?market=IN`, {
    headers,
  });

//get users top tracks (short)
export const getTopTracksShort = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term",
    { headers }
  );

//get users top tracks (medium)
export const getTopTracksMedium = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term",
    {
      headers,
    }
  );

//get users top tracks (long)
export const getTopTracksLong = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term",
    { headers }
  );

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

//get users current playback
export const getUsersCurrentPlayback = () =>
  axios.get(
    "https://api.spotify.com/v1/me/player?market=IN&additional_types=episode",
    {
      headers,
    }
  );

//gets users current playing track
export const getUsersCurrentPlay = () =>
  axios.get(
    "https://api.spotify.com/v1/me/player/currently-playing?market=IN&additional_types=episode",
    {
      headers,
    }
  );

//check user liked tracks
export const checkUserLikedTrack = (trackID) =>
  axios.get(`https://api.spotify.com/v1/me/tracks/contains?ids=${trackID}`, {
    headers,
  });

//add this track to liked songs
export const likeThisTrack = (trackID) => {
  const url = `https://api.spotify.com/v1/me/tracks?ids=${trackID}`;
  return axios({ method: "PUT", url, headers });
};

//remove this track from liked song
export const dislikeThisTrack = (trackID) => {
  const url = `https://api.spotify.com/v1/me/tracks?ids=${trackID}`;
  return axios({ method: "DELETE", url, headers });
};

//get search results (Artist)
export const getArtistSearchResults = (searchQuery) =>
  axios.get(
    `https://api.spotify.com/v1/search?query=${searchQuery}&type=artist&market=IN&limit=10`,
    { headers }
  );

//get search results (tracks)
export const getTrackSearchResults = (searchQuery) =>
  axios.get(
    `https://api.spotify.com/v1/search?query=${searchQuery}&type=track&market=IN&limit=10`,
    { headers }
  );

export const totalSearch = (searchQuery) => {
  return axios
    .all([
      getArtistSearchResults(searchQuery),
      getTrackSearchResults(searchQuery),
    ])
    .then(
      axios.spread((artistSearchResults, trackSearchResults) => {
        return {
          artistSearchResults: artistSearchResults.data,
          trackSearchResults: trackSearchResults.data,
        };
      })
    );
};

//get new releases
export const newReleases = () =>
  axios.get("https://api.spotify.com/v1/browse/new-releases?country=IN", {
    headers,
  });

//get featured playlists
export const getFeaturedPlaylists = () =>
  axios.get(
    "https://api.spotify.com/v1/browse/featured-playlists?country=IN&limit=10",
    { headers }
  );

//get bollywood categories
export const getBollywoodCategory = () =>
  axios.get(
    "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFHCxg5H5PtqW/playlists?limit=10",
    { headers }
  );

export const homeApis = () => {
  return axios
    .all([
      newReleases(),
      getRecentlyPlayed(),
      getTopTracksLong(),
      getFeaturedPlaylists(),
      getTopArtistsLong(),
      getBollywoodCategory(),
    ])
    .then(
      axios.spread(
        (
          newReleases,
          recentlyPlayed,
          topTracksLong,
          featuredPlaylists,
          TopArtistsLong,
          bollywoodCategory
        ) => {
          return {
            newReleases: newReleases.data,
            recentlyPlayed: recentlyPlayed.data,
            topTracks: topTracksLong.data,
            featuredPlaylists: featuredPlaylists.data,
            topArtists: TopArtistsLong.data,
            bollywoodCategory: bollywoodCategory.data,
          };
        }
      )
    );
};

//get all the browse categories
export const getCategories = () =>
  axios.get(
    "https://api.spotify.com/v1/browse/categories?country=IN&limit=50",
    { headers }
  );

//get playlist for a particular category
export const getCatagoryPlaylist = (categoryID) =>
  axios.get(
    `https://api.spotify.com/v1/browse/categories/${categoryID}/playlists?country=IN&limit=50`,
    { headers }
  );

//get liked songs
export const getLikedSongs = () =>
  axios.get("https://api.spotify.com/v1/me/tracks?market=IN&limit=50", {
    headers,
  });
