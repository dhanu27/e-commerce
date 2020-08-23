import { SHOW_PRODUCTS } from "../actions";

export default function product(state = [], action) {
  switch (action.type) {
    case SHOW_PRODUCTS:
      return {
        ...state,
        list: action.products,
      };
  }
  return state;
}
