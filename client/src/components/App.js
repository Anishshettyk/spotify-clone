import React, { useState, useEffect } from "react";
import { token } from "./../spotify";
import Home from "./Home";
import Login from "./Login";
import styled from "styled-components/macro";
import { GlobalStyle } from "./../styles";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const StyledAppContainer = styled.div`
  height: 100%;
  min-height: 100vh;
`;

const App = () => {
  const [tokenObtained, setTokenObtained] = useState("");
  useEffect(() => {
    setTokenObtained(token);
  }, []);
  return (
    <MuiThemeProvider theme={theme}>
      <StyledAppContainer className="App">
        <GlobalStyle />
        {tokenObtained ? <Home /> : <Login />}
      </StyledAppContainer>
    </MuiThemeProvider>
  );
};

export default App;
