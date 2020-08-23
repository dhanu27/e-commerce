export const SHOW_PRODUCTS = "SHOW_PRODUCTS";

export function getProductsList() {
  console.log("inside a ProductList");
  const url = "https://my-json-server.typicode.com/dhanu27/e-commerce/products";
  return function (dispatch) {
    fetch(url)
      .then((response) => response.json())
      .then((products) => {
        console.log("PRODUCTS", products);
        // dispatch an action to add search Result
        dispatch(showAllProducts(products));
      });
  };
}

export function deleteProduct(id) {
  const url =
    "https://my-json-server.typicode.com/dhanu27/e-commerce/products" + id;
  return function (dispatch) {
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA", data);
        getProductsList();
      });
  };
}

export function showAllProducts(products) {
  return {
    type: SHOW_PRODUCTS,
    products,
  };
}
