import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getArtist } from "../spotify/";
import { Profile } from "./divisions";

const Artist = ({ artistID }) => {
  const [artistData, setArtistData] = useState(null);

  useEffect(() => {
    const getArtistData = async () => {
      const artistDataResponse = await getArtist(artistID);
      setArtistData(artistDataResponse);
    };
    getArtistData();
  }, [artistID]);

  return <div>{artistData && <Profile profiler={artistData.data} />}</div>;
};

Artist.propTypes = {
  artistID: PropTypes.string,
};

export default Artist;
