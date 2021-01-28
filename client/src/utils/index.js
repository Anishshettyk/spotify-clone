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
