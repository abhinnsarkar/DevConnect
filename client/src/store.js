import { applyMiddleware, createStore } from "redux";
// import { createStore } from "redux";
// import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";

import { combineReducers } from "redux";
import alert from "./reducers/alert";
import auth from "./reducers/auth";

const initialState = {};

// const rootReducer = combineReducers({
//   alert,
//   auth,
// });

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
