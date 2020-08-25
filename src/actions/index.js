export const SHOW_PRODUCTS = "SHOW_PRODUCTS",
  ADD_PRODUCT = "ADD_PRODUCT",
  ADD_PRODUCT_CART = "ADD_PRODUCT_CART",
  SHOW_CART_PRODUCTS = "SHOW_CART_PRODUCTS",
  REMOVE_PRODUCT = "REMOVE_PRODUCT",
  REMOVE_CART_PRODUCT = "REMOVE_CART_PRODUCT";

//localhost:3000/products
http: export function getProductsList() {
  console.log("inside a ProductList");
  const url = "http://my-json-server.typicode.com/dhanu27/e-commerce/products";
  https: return function (dispatch) {
    fetch(url)
      .then((response) => response.json())
      .then((products) => {
        console.log("PRODUCTS", products);
        // dispatch an action to add search Result
        dispatch(showAllProducts(products));
      });
  };
}

export function showAllProducts(products) {
  return {
    type: SHOW_PRODUCTS,
    products,
  };
}

export function getCartProductsList() {
  console.log("inside aCard  ProductList");
  // const url = "http://localhost:3000/cart";
  const url = "http://my-json-server.typicode.com/dhanu27/e-commerce/cart";
  return function (dispatch) {
    fetch(url)
      .then((response) => response.json())
      .then((products) => {
        console.log("PRODUCTS", products);
        // dispatch an action to add search Result
        dispatch(showAllCartProducts(products));
      });
  };
}

export function showAllCartProducts(products) {
  return {
    type: SHOW_CART_PRODUCTS,
    products,
  };
}

export function addProduct(body) {
  console.log("Inside####", body);
  const url = " http://localhost:3000/products";
  return function (dispatch) {
    fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New Added Product", data);
        dispatch(addNewProduct(body));
      });
  };
}
export function addProductToCart(body) {
  console.log("$$$$", body);
  const url = " http://localhost:3000/cart";
  return function (dispatch) {
    fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
    })
      .then((response) => response.json())
      .then((product) => {
        console.log("New Added Product", product);
        dispatch(addToCart(product));
      });
  };
}
export function addNewProduct(product) {
  return {
    type: ADD_PRODUCT,
    product,
  };
}

export function addToCart(product) {
  return {
    type: ADD_PRODUCT_CART,
    product,
  };
}

// export function updateProduct(id, body) {
//   const url = " http://localhost:3000/products/" + id;
//   return function (dispatch) {
//     fetch(url, {
//       method: "PUT",
//       body: JSON.stringify({ body }),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8", // Indicates the content
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("DATA", data);
//         getProductsList();
//       });
//   };
// }

export function deleteProduct(id) {
  console.log("ID", id);
  const url = "http://localhost:3000/products/" + id;
  return function (dispatch) {
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log("DATA", data);
        dispatch(removeProduct(id));
      });
  };
}

export function deleteProductCart(id) {
  console.log("ID", id);
  const url = "http://localhost:3000/cart/" + id;
  return function (dispatch) {
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log("DATA", data);
        dispatch(removeCartProduct(id));
      });
  };
}

export function removeCartProduct(id) {
  return {
    type: REMOVE_CART_PRODUCT,
    id,
  };
}

export function removeProduct(id) {
  return {
    type: REMOVE_PRODUCT,
    id,
  };
}
