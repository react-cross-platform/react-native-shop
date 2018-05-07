import update from "immutability-helper";

import { ACTION_SELECT_COLOR, ACTION_SELECT_SUBPRODUCT } from "./constants";

const DEFAULT_PRODUCT = {};

const product = (state = DEFAULT_PRODUCT, action) => {
  switch (action.type) {
    case ACTION_SELECT_SUBPRODUCT:
      return update(state, {
        subProductId: { $set: action.subProductId },
        colorId: { $set: [action.colorId] }
      });

    case ACTION_SELECT_COLOR:
      return update(state, {
        colorId: { $set: [action.colorId] }
      });

    default:
      return state;
  }
};

export default product;
