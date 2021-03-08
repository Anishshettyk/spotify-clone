import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme, media } from "../styles";
import { getCategories } from "../spotify";
import { Loader } from "./index";
import { Link } from "@reach/router";

const { colors } = theme;

const BrowseContainer = styled.main`
  margin: 30px 20px ${theme.visibleBottom};
  h1 {
    font-size: 45px;
    padding-bottom: 10px;
    border-bottom: 2px solid ${colors.grey};
  }
  ${media.tablet`
  margin-left:10px;
  margin-right:10px;
  `}
`;

const BrowseContentContainer = styled.section`
  margin-top: 30px;
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

const Category = styled.div`
  position: relative;
  h3 {
    position: absolute;
    left: 50%;
    top: 70%;
    transform: translate(-50%, 50%);
    font-weight: 400;
    border-bottom: 2px solid transparent;
    ${media.phablet`
    top:50%;
    `}
  }
  &:hover,
  &:focus {
    h3 {
      border-bottom: 2px solid ${colors.white};
    }
  }
`;

const Browse = () => {
  const [catagories, setCategories] = useState(null);

  const findCategories = async () => {
    const response = await getCategories();
    setCategories(response?.data?.categories);
  };

  useEffect(() => {
    findCategories();
  }, []);

  return (
    <BrowseContainer>
      <h1>Browse.</h1>

      {catagories ? (
        <BrowseContentContainer>
          {catagories?.items?.map((item, i) => (
            <Link to={`/browse/${item?.id}`}>
              <Category key={i}>
                <img src={item?.icons[0]?.url} alt={item?.name} />
                <h3>{item?.name}</h3>
              </Category>
            </Link>
          ))}
        </BrowseContentContainer>
      ) : (
        <Loader />
      )}
    </BrowseContainer>
  );
};

export default Browse;
