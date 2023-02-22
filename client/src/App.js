import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import Dashboard from "./components/dashboard/Dashboard";

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
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
              <Route
                path="dashboard"
                element={<PrivateRoute component={Dashboard} />}
              />
            </Routes>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
