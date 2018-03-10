import { combineReducers } from "redux";

import cart from "./modules/cart/reducer";
import catalog from "./modules/catalog/reducer";
import layout from "./modules/layout/reducer";
import product from "./modules/product/reducer";

const rootReducers = combineReducers({
  catalog,
  layout,
  product,
  cart
} as any);

export default rootReducers;
