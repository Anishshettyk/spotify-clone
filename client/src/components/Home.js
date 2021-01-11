import React from 'react';
import { logout } from './../spotify';

const Home = () => (
  <div>
    Home screen
    <button onClick={logout}>logout</button>
  </div>
);

export default Home;
