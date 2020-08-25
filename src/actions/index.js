import { toast } from "react-toastify";

export const SHOW_PRODUCTS = "SHOW_PRODUCTS",
  ADD_PRODUCT = "ADD_PRODUCT",
  ADD_PRODUCT_CART = "ADD_PRODUCT_CART",
  SHOW_CART_PRODUCTS = "SHOW_CART_PRODUCTS",
  REMOVE_PRODUCT = "REMOVE_PRODUCT",
  REMOVE_CART_PRODUCT = "REMOVE_CART_PRODUCT",
  ADD_TOAST = "ADD_TOAST",
  REMOVE_TOAST = "REMOVE_TOAST";

//localhost:3000/products
export function getProductsList() {
  console.log("inside a ProductList");
  //http://localhost:3000/products
  const url = " http://my-json-server.typicode.com/dhanu27/e-commerce/products";
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
        toast.success("Product Added");
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
        // toast.success("Product Added to Your Cart");
        dispatch(addToCart(product));
        toast.success("Product Added to Your Cart");
      })
      .catch(() => {
        toast.error("Product May Be Already in Your Cart Or Try again");
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
        toast.success("Product Deleted");
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
        toast.success("Product Deleted from Cart");
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
