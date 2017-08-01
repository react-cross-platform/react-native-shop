import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import client from "./graphqlClient";
import { Platform } from 'react-native';

const initialState = {};

// const middleware = routerMiddleware(history)

const middlewares = [
  thunk,
  client.middleware(),
];
// if (process.env.DEBUG) {
if (true) {
  middlewares.push(logger);
}

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middlewares),
  ),
);

export default store;
