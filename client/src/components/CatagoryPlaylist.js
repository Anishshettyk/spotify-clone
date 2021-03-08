import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getCatagoryPlaylist } from "../spotify";
import styled from "styled-components";
import { theme, media } from "../styles";

const CatagoryPlaylistContainer = styled.main`
  margin: 30px 20px ${theme.visibleBottom};

  ${media.tablet`
  margin-left:10px;
  margin-right:10px;
  `}
`;

const CatagoryPlaylist = ({ categoryID }) => {
  const [playlist, setPlaylist] = useState(null);

  const getCategoryPlaylist = async (categoryID) => {
    const response = await getCatagoryPlaylist(categoryID);
    setPlaylist(response?.data?.playlists);
  };

  useEffect(() => {
    getCategoryPlaylist(categoryID);
  }, [categoryID]);

  console.log(playlist);

  return <CatagoryPlaylistContainer></CatagoryPlaylistContainer>;
};
CatagoryPlaylist.prototype = {
  categoryID: PropTypes.string.isRequired,
};

export default CatagoryPlaylist;
