import React from "react";
import { logout } from "./../spotify";
import UserProfile from "./UserProfile";

import Navbar from "./Navbar";

const Home = () => (
  <div>
    <Navbar />
    <UserProfile />
    <button onClick={logout}>logout</button>
  </div>
);

export default Home;
