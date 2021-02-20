import React from "react";
import styled from "styled-components";
import { theme } from "../styles";

const SearchContainer = styled.section`
  margin: 20px 30px calc(${theme.navHeight} + 20px);
`;

const Search = () => {
  return <SearchContainer>search functionality in future</SearchContainer>;
};

export default Search;
