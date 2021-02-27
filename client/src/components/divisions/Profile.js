import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { theme, media } from "./../../styles";

const { colors } = theme;

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

const ProfilerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 15px;
  ${media.tablet`
     padding:10px 0px;
     
  `}

  .Profiler__content {
    padding-left: 30px;
    ${media.tablet`
      padding:0;
      `}
    p {
      text-transform: uppercase;
      font-size: 15px;
    }
    h1 {
      font-weight: 900;
      font-size: 40px;
      letter-spacing: 1px;
      ${media.tablet`
      font-size:27px;
      letter-spacing:0px;
      `}
    }
  }
  ${media.tablet`
  padding:15px 25px;
  .Profiler__content{
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

const Profile = ({ profiler }) => {
  const classes = useStyles();
  return (
    <ProfilerContainer>
      <Avatar
        src={profiler.images[0]?.url}
        alt={profiler.name}
        className={classes.large}
      />
      <div className="Profiler__content">
        <p>
          {profiler?.type}{" "}
          <span>
            {profiler.type === "artist" ? (
              <CheckCircleIcon style={{ color: colors.blue }} />
            ) : (
              ""
            )}
          </span>
        </p>
        <h1>{profiler.display_name || profiler.name}</h1>
      </div>
    </ProfilerContainer>
  );
};

Profile.propTypes = {
  profiler: PropTypes.object,
};

export default Profile;
