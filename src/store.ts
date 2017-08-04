import { createStore, combineReducers, compose, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import client from "./graphqlClient";
import { Platform } from "react-native";

const initialState = {};

const middlewares = [thunk, client.middleware()];
// if (process.env.DEBUG) {
//   middlewares.push(logger);
// }

const store = createStore(
  rootReducer,
  initialState,
  // composeWithDevTools(
  compose(applyMiddleware(...middlewares))
);

export default store;
