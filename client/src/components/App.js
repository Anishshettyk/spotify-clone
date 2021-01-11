import React, { useState, useEffect } from 'react';
import { token } from './../spotify';
import Home from './Home';
import Login from './Login';

const App = () => {
  const [tokenObtained, setTokenObtained] = useState('');
  useEffect(() => {
    setTokenObtained(token);
  }, []);
  return <div className="App">{tokenObtained ? <Home /> : <Login />}</div>;
};

export default App;
