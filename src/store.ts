import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";

import client from "./graphqlClient";
import rootReducer from "./rootReducer";

const initialState = {};

const middlewares = [thunk, client.middleware()];
middlewares.push(logger);

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
