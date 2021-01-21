import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getUserInfo } from "./../spotify";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

const UserStyledContainer = styled.section``;

const UserProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 50px;
  .userProfile__content {
    padding-left: 30px;
    p {
      text-transform: uppercase;
      font-size: 15px;
    }
    h1 {
      font-weight: 900;
      font-size: 40px;
      letter-spacing: 1px;
    }
  }
`;

const User = () => {
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    const response = await getUserInfo();
    setUserData(response);
  };

  useEffect(() => {
    getUserData();
  }, []);
  const classes = useStyles();

  return (
    <UserStyledContainer>
      {userData ? (
        <UserProfileContainer>
          <Avatar
            src={userData.user.images[0].url}
            alt={userData.user.display_name}
            className={classes.large}
          />

          <div className="userProfile__content">
            <p>{userData.user.type}</p>
            <h1>{userData.user.display_name}</h1>
          </div>
        </UserProfileContainer>
      ) : (
        <div>loading...</div>
      )}
    </UserStyledContainer>
  );
};

export default User;
