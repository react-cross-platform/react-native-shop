import { combineReducers } from "redux";

import client from "./graphqlClient";
import catalog from "./modules/catalog/reducer";
import layout from "./modules/layout/reducer";
import product from "./modules/product/reducer";
import cart from "./modules/cart/reducer"

const apollo: any = client.reducer();

const rootReducers = combineReducers(
  {
    apollo,
    catalog,
    layout,
    product,
    cart,
  } as any
);

export default rootReducers;
