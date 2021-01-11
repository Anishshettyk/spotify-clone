import axios from 'axios';
import { getHashParams } from './../utils';

const expireTime = 3600 * 1000;

//set item to localStorage
const setTokensTimeStamp = () => window.localStorage.setItem('SPOTIFY_TOKEN_TIMESTAMP', Date.now());
const setLocalAccessToken = token => {
  setTokensTimeStamp();
  window.localStorage.setItem('SPOTIFY_ACCESS_TOKEN', token);
};
const setLocalRefreshToken = token => window.localStorage.setItem('SPOTIFY_REFRESH_TOKEN', token);

//get item from localStorage
const getTokenTimeStamp = () => window.localStorage.getItem('SPOTIFY_TOKEN_TIMESTAMP');
const getLocalAccessToken = () => window.localStorage.getItem('SPOTIFY_ACCESS_TOKEN');
const getLocalRefreshToken = () => window.localStorage.getItem('SPOTIFY_REFRESH_TOKEN');

//refresh the access token
const refreshAccessToken = async () => {
  try {
    const { data } = await axios.get(`/refresh_token?refresh_token=${getLocalRefreshToken()}`);

    const { access_token } = data;

    //set local access token
    setLocalAccessToken(access_token);

    //reload the window
    window.location.reload();
    return;
  } catch (error) {
    console.warn('error occurred while refreshing access token');
    console.error(error);
  }
};

//get the access token from query parameter
const getAccessToken = () => {
  const { error, access_token, refresh_token } = getHashParams();

  if (error) {
    console.warn('error occurred while getting access token');
    console.error(error);
  }

  //check if access token has expired
  if (Date.now() - getTokenTimeStamp() > expireTime) {
    console.warn('Access token has expired refreshing token again.....');
    refreshAccessToken();
  }

  const localAccessToken = getLocalAccessToken();
  const localRefreshToken = getLocalRefreshToken();

  //if no refresh token then set the refresh token from params
  if (!localRefreshToken || localRefreshToken === 'undefined') {
    setLocalRefreshToken(refresh_token);
  }

  //if no access token then set the access token from params
  if (!localAccessToken || localAccessToken === 'undefined') {
    setLocalAccessToken(access_token);
    return access_token;
  }

  return localAccessToken;
};

export const token = getAccessToken();

//logout remove local storage item
export const logout = () => {
  window.localStorage.removeItem('SPOTIFY_TOKEN_TIMESTAMP');
  window.localStorage.removeItem('SPOTIFY_ACCESS_TOKEN');
  window.localStorage.removeItem('SPOTIFY_REFRESH_TOKEN');
  window.location.reload();
};

/***************************************  API CALLS  ************************************************/

//headers for every endpoint
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-type': 'application/json',
};

//get user profile
export const getUser = () => axios.get('https://api.spotify.com/v1/me', { headers });
