import update from "immutability-helper";

import {
  ACTION_SET_CATALOG_DRAWER,
} from "./constants";
import { ILayout } from "./model";

const DEFAULT_LAYOUT: ILayout = {
  openCatalog: undefined
};

const layout = (state = DEFAULT_LAYOUT, action) => {
  switch (action.type) {
    case ACTION_SET_CATALOG_DRAWER:
      return update(DEFAULT_LAYOUT, {
        openCatalog: { $set: action.openCatalog }
      });
    default:
      return state;
  }
};

export default layout;
