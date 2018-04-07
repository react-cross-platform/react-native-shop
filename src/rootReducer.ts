import { combineReducers } from "redux";

import catalog from "./modules/catalog/reducer";
import layout from "./modules/layout/reducer";
import product from "./modules/product/reducer";

const rootReducers = combineReducers({
  catalog,
  layout,
  product
} as any);

export default rootReducers;
