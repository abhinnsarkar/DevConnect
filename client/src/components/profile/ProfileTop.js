import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    githubusername,
    social,
    user: { name, avatar },
  },
}) => {
  console.log("gt", githubusername);
  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={avatar} alt="" />
      <h1 className="large">{name}</h1>
      <p className="lead">
        {status} {company && <span>at {company}</span>}
      </p>
      <p>{location && <span>{location}</span>}</p>
      <div className="icons my-1">
        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer">
            {/* <i className="fas fa-globe fa-2x"></i> */}
            <i class="fas fa-solid fa-link fa-2x"></i>
          </a>
        )}
        {social && social.twitter && (
          // <a href={social.twitter} target="_blank" rel="noopener noreferrer">
          <a
            href={`https://twitter.com/${social.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter fa-2x"></i>
          </a>
        )}
        {social && social.facebook && (
          <a
            href={`https://www.facebook.com/${social.facebook}/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook fa-2x"></i>
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
        )}
        {social && social.youtube && (
          <a
            href={`https://www.youtube.com/@${social.youtube}/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-youtube fa-2x"></i>
          </a>
        )}
        {social && social.instagram && (
          // <a href={social.instagram} target="_blank" rel="noopener noreferrer">
          <a
            href={`https://www.instagram.com/${social.instagram}/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram fa-2x"></i>
          </a>
        )}
        {social && social.tiktok && (
          // <a href={social.tiktok} target="_blank" rel="noopener noreferrer">
          <a
            href={`https://www.tiktok.com/@${social.tiktok}/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* https://www.tiktok.com/@abhinnsarkar */}
            {/* <i className="fab fa-tiktok fa-2x"></i> */}
            <i className="fab fa-brands fa-tiktok fa-2x"></i>
          </a>
        )}
        {githubusername && (
          // <a href={social.tiktok} target="_blank" rel="noopener noreferrer">
          <a
            href={`https://github.com/${githubusername}/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* https://www.tiktok.com/@abhinnsarkar */}
            {/* <i className="fab fa-tiktok fa-2x"></i> */}
            {/* <i className="fab fa-brands fa-tiktok fa-2x"></i> */}
            <i class="fab fa-brands fa-github fa-2x"></i>
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
