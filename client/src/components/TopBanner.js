import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "@reach/router";
import { theme } from "../styles";
import { getUser } from "./../spotify";
import { logout } from "./../spotify";
import { Avatar, Menu, MenuItem, Button, Tooltip } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const { colors } = theme;

const TopBannerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TopBannerInside = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const UserShowContainer = styled.div`
  .UserShowContainer__insider {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    p {
      margin: 0;
      padding: 7px 10px;
      margin-left: 3px;
      background: ${colors.black};
      border-radius: 30px;
    }
    svg {
      border-radius: 50%;
      background: ${colors.black};
      color: ${colors.green};
    }
    .userMenuButton {
      padding: 0px;
      min-width: 0px;
      margin: 3px;
    }
  }
`;
const SearchContainer = styled.div`
  padding: 10px;
`;

const TopBanner = () => {
  const [user, setUser] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const getUserData = async () => {
    const response = await getUser();
    setUser(response);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TopBannerContainer>
      {user && (
        <TopBannerInside>
          <SearchContainer>.</SearchContainer>
          <UserShowContainer>
            <div className="UserShowContainer__insider">
              <Avatar alt="Aemy Sharp" src={user?.data?.images[0]?.url} />
              <p>{user?.data?.display_name || "NO NAME"}</p>
              <Tooltip title="Menu" aria-label="Menu">
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  className="userMenuButton"
                >
                  <KeyboardArrowDownIcon fontSize="large" />
                </Button>
              </Tooltip>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link to="/me">
                  <MenuItem onClick={handleClose}>View Profile</MenuItem>
                </Link>

                <MenuItem onClick={(handleClose, logout)}>Logout</MenuItem>
              </Menu>
            </div>
          </UserShowContainer>
        </TopBannerInside>
      )}
    </TopBannerContainer>
  );
};

export default TopBanner;
