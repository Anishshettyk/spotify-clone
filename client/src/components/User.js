import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
import { getUserInfo } from "./../spotify";
import { Avatar } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { theme, media } from "../styles";
import { AppBar, Tabs, Tab, Box } from "@material-ui/core";
import { AlbumPreviewSmall, Profile } from "./divisions";
import { Loader } from "./index";

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
  Avatar__size: {
    width: theme.spacing(13),
    height: theme.spacing(13),
  },
  [theme.breakpoints.down("sm")]: {
    Avatar__size: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
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

const StyledUserSection = styled.main`
  padding: 10px 15px;
  ${media.tablet`
    padding:10px 0px;
  `}
`;

const UserActionsContainer = styled.div`
  .overview__tab {
    h2 {
      padding-bottom: 5px;
      border-bottom: 1px solid ${colors.grey};
    }
  }
  .overview__tab__content__container {
    margin: 3vh 0px ${theme.navHeight};
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    .overview__tab__content__inside__container {
      p {
        margin: 0;
        color: ${colors.lightGrey};
        font-size: 13px;
      }
    }

    ${media.tablet`
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    `}
  }
  .artist__follower__content__container {
    margin-bottom: ${theme.navHeight};
    .followed__artist__content__container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0px;
      border-bottom: 1px solid ${colors.grey};
      .followed__artist__content {
        display: flex;
        align-items: center;
        justify-content: center;
        .followed__artist__content__container__text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 0 0 10px;
          p {
            font-size: 13px;
            letter-spacing: 2px;
            font-weight: 200;
            color: ${colors.lightestGrey};
            ${media.tablet`
              font-size:10px;
            `}
          }
        }
      }
    }
  }
`;
const ArtistName = styled(Link)`
  h5 {
    letter-spacing: 1px;
    font-weight: 200;
    &:hover,
    &:focus {
      transform: scale(1.03);
      color: ${colors.green};
    }
  }
`;

const User = ({ artistID }) => {
  const [user, setUser] = useState(null);
  const [followedArtists, setFollowedArtists] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [value, setValue] = useState(0);

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
    <StyledUserSection>
      {user ? (
        <div>
          <Profile profiler={user} />

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
              <h2>Playlists</h2>
              <div className="overview__tab__content__container">
                {playlists &&
                  playlists?.items?.map(
                    (playlist, id) =>
                      playlist && (
                        <div
                          className="overview__tab__content__inside__container"
                          key={id}
                        >
                          <AlbumPreviewSmall
                            artistAlbum={playlist}
                            imageIndex={0}
                            playlist={true}
                          />
                        </div>
                      )
                  )}
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div className="overview__tab__content__container">
                {playlists &&
                  playlists?.items.map(
                    (playlist, id) =>
                      playlist?.public && (
                        <div
                          className="overview__tab__content__inside__container"
                          key={id}
                        >
                          <AlbumPreviewSmall
                            artistAlbum={playlist}
                            imageIndex={0}
                            playlist={true}
                          />
                          <p>{`Total tracks ${
                            playlist?.tracks?.total || 0
                          }`}</p>
                        </div>
                      )
                  )}
              </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div className="artist__follower__content__container">
                {followedArtists &&
                  followedArtists?.artists?.items?.map((item, id) => (
                    <div
                      className="followed__artist__content__container"
                      key={id}
                    >
                      <div className="followed__artist__content">
                        <Avatar
                          src={item?.images[0]?.url}
                          alt={item?.name}
                          className={classes.Avatar__size}
                        />
                        <div className="followed__artist__content__container__text">
                          <ArtistName to={`/artist/${item.id}`}>
                            <h5>{item?.name}</h5>
                          </ArtistName>
                          <p>{`${item?.followers?.total} Followers`}</p>
                        </div>
                      </div>

                      <Link to={`/artist/${item?.id}`}>
                        <button>View Artist</button>
                      </Link>
                    </div>
                  ))}
              </div>
            </TabPanel>
          </UserActionsContainer>
        </div>
      ) : (
        <Loader />
      )}
    </StyledUserSection>
  );
};

export default User;
