import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getUserInfo } from "./../spotify";
import { Avatar } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { theme, media } from "../styles";
import { AppBar, Tabs, Tab, Box } from "@material-ui/core";

const { colors } = theme;
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  appBar: {
    boxShadow: "none",
  },
}));

const StyledAppBar = withStyles({
  root: {
    backgroundColor: "transparent",
  },
})((props) => <AppBar {...props} />);

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 40,
      width: "100%",
      backgroundColor: colors.green,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "uppercase",
    color: colors.white,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(14),
    marginRight: theme.spacing(1),
    "&:focus": {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

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
  ${media.tablet`
  padding:15px 25px;
  .userProfile__content{
    padding:10px;
    P{
      font-size:13px;
    }
    h1{
      font-size:30px;
    }
  } 
  `}
`;

const UserActionsContainer = styled.div`
  .overview__tab {
    h3 {
      padding-bottom: 5px;
      border-bottom: 1px solid ${colors.grey};
    }
  }
  .overview__tab__content__container {
    margin-top: 3vh;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    .overview__tab__content__inside__container {
      h4 {
        padding: 10px 0 0 0;
      }
      p {
        color: ${colors.lightGrey};
        font-size: 13px;
      }
    }

    ${media.tablet`
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    `}
  }
`;

const User = () => {
  const [user, setUser] = useState(null);
  const [followedArtists, setFollowedArtists] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [value, setValue] = React.useState(0);

  const getUserData = async () => {
    const { user, followedArtists, playlists } = await getUserInfo();
    setUser(user);
    setFollowedArtists(followedArtists);
    setPlaylists(playlists);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();

  return (
    <section>
      {user ? (
        <div>
          <UserProfileContainer>
            <Avatar
              src={user.images[0].url}
              alt={user.display_name}
              className={classes.large}
            />

            <div className="userProfile__content">
              <p>{user.type}</p>
              <h1>{user.display_name}</h1>
            </div>
          </UserProfileContainer>

          <UserActionsContainer className={classes.root}>
            <StyledAppBar position="static" className={classes.appBar}>
              {followedArtists && (
                <StyledTabs
                  value={value}
                  onChange={handleChange}
                  aria-label="User actions tab"
                  className={classes.tab}
                >
                  <StyledTab label="Overview" {...a11yProps(0)} />
                  <StyledTab label="Public playlists" {...a11yProps(1)} />
                  <StyledTab
                    label={`Following (${followedArtists.artists.total})`}
                    {...a11yProps(2)}
                  />
                </StyledTabs>
              )}
            </StyledAppBar>
            <TabPanel value={value} index={0} className="overview__tab">
              <h3>Public playlists</h3>
              <div className="overview__tab__content__container">
                {playlists &&
                  playlists.items.map(
                    (playlist, id) =>
                      playlist.public && (
                        <div
                          className="overview__tab__content__inside__container"
                          key={id}
                        >
                          <img
                            src={playlist.images[0].url}
                            alt={playlist.name}
                          />
                          <h4>{playlist.name}</h4>
                          <p>{`Total tracks ${playlist.tracks.total}`}</p>
                        </div>
                      )
                  )}
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
          </UserActionsContainer>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </section>
  );
};

export default User;
