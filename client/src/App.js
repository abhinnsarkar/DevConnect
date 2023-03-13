import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import Dashboard from "./components/dashboard/Dashboard";

import ProfileForm from "./components/profile-forms/ProfileForm";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";

import Post from "./components/post/Post";
import Posts from "./components/posts/Posts";

import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";

import PrivateRoute from "./components/routing/PrivateRoute";

import Alert from "./components/layout/Alert";

// Redux
import { Provider } from "react-redux";
import store from "./store";

import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

const App = () => {
  useEffect(() => {
    // localStorage.setItem("item", "hello world");
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
          </Routes>
          <section className="container">
            <Alert />
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profiles" element={<Profiles />} />
              <Route path="/profile/:id" element={<Profile />} />

              <Route
                path="/dashboard"
                element={<PrivateRoute component={Dashboard} />}
              />
              <Route
                path="/create-profile"
                // element={<PrivateRoute component={CreateProfile} />}
                element={<PrivateRoute component={ProfileForm} />}
              />
              <Route
                path="/edit-profile"
                // element={<PrivateRoute component={EditProfile} />}
                element={<PrivateRoute component={ProfileForm} />}
              />
              <Route
                path="/add-experience"
                element={<PrivateRoute component={AddExperience} />}
              />
              <Route
                path="/add-education"
                element={<PrivateRoute component={AddEducation} />}
              />
              <Route
                path="/posts"
                element={<PrivateRoute component={Posts} />}
              />
              <Route
                path="/posts/:id"
                element={<PrivateRoute component={Post} />}
              />
            </Routes>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
