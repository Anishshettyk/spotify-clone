import React, { useState, useEffect } from 'react';
import { token } from './../spotify';
import Home from './Home';
import Login from './Login';
import styled from 'styled-components/macro';
import { GlobalStyle } from './../styles';

const StyledAppContainer = styled.div`
  height: 100%;
  min-height: 100vh;
`;

const App = () => {
  const [tokenObtained, setTokenObtained] = useState('');
  useEffect(() => {
    setTokenObtained(token);
  }, []);
  return (
    <StyledAppContainer className="App">
      <GlobalStyle />
      {tokenObtained ? <Home /> : <Login />}
    </StyledAppContainer>
  );
};

export default App;
