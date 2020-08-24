import {
  ADD_PRODUCT_CART,
  SHOW_CART_PRODUCTS,
  REMOVE_CART_PRODUCT,
} from "../actions";
import { removeProduct } from "./index";

export default function product(state = [], action) {
  switch (action.type) {
    case ADD_PRODUCT_CART:
      console.log("PREVIOUSLY", state);
      return [...state, action.product];
    case SHOW_CART_PRODUCTS:
      console.log("###PRODUCTS####", action.products);
      return action.products;
    case REMOVE_CART_PRODUCT:
      return removeProduct(state, action.id);
  }
  return state;
}
