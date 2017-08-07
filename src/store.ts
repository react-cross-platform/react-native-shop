import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import client from "./graphqlClient";
import rootReducer from "./rootReducer";

// import { composeWithDevTools } from "redux-devtools-extension";
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
