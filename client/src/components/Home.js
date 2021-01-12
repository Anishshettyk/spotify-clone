import React from 'react';
import { logout } from './../spotify';
import UserProfile from './UserProfile';

const Home = () => (
  <div>
    <UserProfile />
    <button onClick={logout}>logout</button>
  </div>
);

export default Home;
