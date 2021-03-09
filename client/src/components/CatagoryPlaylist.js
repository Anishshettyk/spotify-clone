import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getCatagoryPlaylist } from "../spotify";
import styled from "styled-components";
import { theme, media } from "../styles";
import { AlbumPreviewSmall } from "./divisions";

const { colors } = theme;
const CatagoryPlaylistContainer = styled.main`
  margin: 30px 20px ${theme.visibleBottom};

  h1 {
    text-transform: uppercase;
    letter-spacing: 0.25px;
    font-size: 45px;
    border-bottom: 1px solid ${colors.grey};
    ${media.tablet`
    font-size:30px;
    `}
  }

  ${media.tablet`
  margin-left:10px;
  margin-right:10px;
  `}
`;

const CategoryPlaylist = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
  ${media.tablet`
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 15px;
  `};
  ${media.phablet`
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    grid-gap: 10px;
  `};
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

  return (
    <CatagoryPlaylistContainer>
      <h1>{categoryID}.</h1>
      <CategoryPlaylist>
        {playlist?.items?.map((item, i) => (
          <AlbumPreviewSmall
            artistAlbum={item}
            playlist={true}
            key={i}
            imageIndex={0}
          />
        ))}
      </CategoryPlaylist>
    </CatagoryPlaylistContainer>
  );
};
CatagoryPlaylist.prototype = {
  categoryID: PropTypes.string.isRequired,
};

export default CatagoryPlaylist;
