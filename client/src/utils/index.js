export const getHashParams = () => {
  const hashParams = {};
  let e;
  const regularExpression = /([^&;=]+)=?([^&;]*)/g;
  const query = window.location.hash.substring(1);
  while ((e = regularExpression.exec(query))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }

  return hashParams;
};

export const formatWithCommas = (n) =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

//covert milliseconds to minitute:seconds format.
export const convertMilli = (milli) => {
  const minutes = Math.floor(milli / 60000);
  const seconds = ((milli % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

//convert time

export const convertTime = (timestamp) => {
  let minutes = Math.floor(timestamp / 60);
  let seconds = Math.trunc(timestamp - minutes * 60); //to remove decimal part
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  timestamp = minutes + ":" + seconds;
  return timestamp;
};
