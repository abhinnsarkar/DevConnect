import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteAccount, getCurrentProfile } from "../../actions/profile";

import { DashboardActions } from "./DashboardActions";
import Spinner from "../layout/Spinner";

import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  // console.log("user", user);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user"></i>Welcome {user && user.name}
        </p>
        {profile !== null ? (
          // <Fragment>has</Fragment>
          <Fragment>
            <DashboardActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />

            {/* <div className="my-2">
            <button
              className="btn btn-danger"
              // onClick={() => deleteAccount(user._id)}
              // onClick={() => deleteAccount()}
              // onClick={() => console.log("clicked and", user)}
              onClick={() => deleteAccount()}
              // onClick={() => window.confirm("u sure?")}
            >
              <i className="fas fa-user-minus"></i> Delete My Account
            </button>
          </div> */}
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not yet set up a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </Fragment>
        )}
        <Fragment>
          <div className="my-2">
            <button
              className="btn btn-danger"
              // onClick={() => deleteAccount(user._id)}
              // onClick={() => deleteAccount()}
              // onClick={() => console.log("clicked and", user)}
              onClick={() => deleteAccount()}
              // onClick={() => window.confirm("u sure?")}
            >
              <i className="fas fa-user-minus"></i> Delete My Account
            </button>
          </div>
        </Fragment>
      </Fragment>
      {/* <Fragment>
        <div className="my-2">
          <button
            className="btn btn-danger"
            // onClick={() => deleteAccount(user._id)}
            // onClick={() => deleteAccount()}
            // onClick={() => console.log("clicked and", user)}
            onClick={() => deleteAccount()}
            // onClick={() => window.confirm("u sure?")}
          >
            <i className="fas fa-user-minus"></i> Delete My Account
          </button>
        </div>
      </Fragment> */}
    </>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
