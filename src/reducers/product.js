import { SHOW_PRODUCTS, ADD_PRODUCT, REMOVE_PRODUCT } from "../actions";
import { removeProduct } from "./index";

export default function product(state = [], action) {
  switch (action.type) {
    case SHOW_PRODUCTS:
      console.log("PREViously State", state);
      return action.products;
    case ADD_PRODUCT:
      console.log("PREViously State", state);
      return [...state, action.product];
    case REMOVE_PRODUCT:
      return removeProduct(state, action.id);
  }
  return state;
}
