import {
  ACTION_ADD_CART_ITEM,
  ACTION_REMOVE_CART_ITEM,
  ACTION_SET_COUNT
} from "./constants";

import update from "immutability-helper";

const DEFAULT_CART: any = [];

const cart = (state = DEFAULT_CART, action) => {
  switch (action.type) {
    case ACTION_ADD_CART_ITEM:
      return update(state, {
        $push: [
          {
            productId: action.productId,
            subProductId: action.subProductId,
            colorId: action.colorId,
            price: action.price,
            count: 1
          }
        ]
      });

    case ACTION_REMOVE_CART_ITEM:
      return update(state, { $splice: [[action.index, 1]] });

    case ACTION_SET_COUNT:
      return state.map(el => {
        if (el.subProductId === action.subProductId) {
          return update(el, { count: { $set: action.count } });
        } else {
          return el;
        }
      });

    default:
      return state;
  }
};

export default cart;
