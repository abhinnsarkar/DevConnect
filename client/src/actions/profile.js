import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  UPDATE_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
} from "./types";

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    // console.log(res);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    // console.log("GET_PROFILE: ", res.data);
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
    // console.log("PROFILE_ERROR: ", err);
  }
};

export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get("/api/profile");
    // console.log(res);
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
    // console.log("GET_PROFILE: ", res.data);
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
    // console.log("PROFILE_ERROR: ", err);
  }
};

export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    // console.log(res);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    // console.log("GET_PROFILE: ", res.data);
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
    // console.log("PROFILE_ERROR: ", err);
  }
};

export const getGithubRepos = (username) => async (dispatch) => {
  console.log("inside func");
  try {
    console.log("inside try");
    const res = await axios.get(`/api/profile/github/${username}`);
    console.log(res);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
    console.log("GET_PROFILE: ", res.data);
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
    console.log("PROFILE_ERROR: ", err);
  }
};

// Create or update profile
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/profile", formData, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      if (edit) {
        dispatch(
          setAlert("Profile updated, go to dashboard when done", "success")
        );
      } else {
        history("/dashboard");
        dispatch(setAlert("Profile Created", "success"));
      }
    } catch (err) {
      console.log(err);
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
      // console.log("PROFILE_ERROR: ", err);
    }
  };

// add experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/experience", formData, config);
    // console.log(res);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    history("/dashboard");
    dispatch(setAlert("Experience Added", "success"));
  } catch (err) {
    // console.log(err);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
    // console.log("PROFILE_ERROR: ", err);
  }
};

// add education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/education", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    history("/dashboard");
    dispatch(setAlert("Education Added", "success"));
  } catch (err) {
    // console.log(err);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
    // console.log("PROFILE_ERROR: ", err);
  }
};

// delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Deleted", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Deleted", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// delete account and profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This action can not be undone")) {
    try {
      await axios.delete(`/api/profile/`);

      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: ACCOUNT_DELETED,
      });

      dispatch(setAlert("Account sucessfully deleted"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }
};
