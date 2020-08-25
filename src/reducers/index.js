import { combineReducers } from "redux";
import products from "./product";
import cart from "./cart";
import toast from "./toast";

export function removeProduct(product, id) {
  console.log("REmove Product", product);
  let filtered = product.filter(function (value, index) {
    return value.id !== id;
  });
  return filtered;
}
export default combineReducers({
  products,
  cart,
  toast,
});
