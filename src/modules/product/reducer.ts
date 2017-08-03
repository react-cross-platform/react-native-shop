import update from "immutability-helper";

import { ACTION_SELECT_SUBPRODUCT, ACTION_SELECT_COLOR } from "./constants";


const DEFAULT_PRODUCT = {
  colorId: null,
  subProductId: null
};

const product = (state = DEFAULT_PRODUCT, action) => {
  switch (action.type) {
    case ACTION_SELECT_SUBPRODUCT:
      return update(state, {
        colorId: { $set: action.colorId },
        subProductId: { $set: action.subProductId }
      });

    case ACTION_SELECT_COLOR:
      return update(state, {
        colorId: { $set: action.colorId }
      });

    default:
      return state;
  }
};

export default product;
