import React from "react";
import { connect } from "react-redux";
import {
  getProductsList,
  addProductToCart,
  deleteProduct,
  deleteProductCart,
} from "../actions";

// import { getProductsList } from "../actions";

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    const { product, cart } = this.props;
    this.state = {
      editing: false,
      name: product.name,
      price: product.price,
      rating: product.rating,
      about: product.about,
      img: product.img,
    };
  }
  setEditingState = () => {
    console.log("Editing");
    this.setState({ editing: !this.state.editing });
  };
  handleDelete = (id) => {
    if (this.props.cart) this.props.dispatch(deleteProductCart(id));
    else this.props.dispatch(deleteProduct(id));
  };
  onChange = (e) => {
    console.log("ghbjnkml");
    /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
    this.setState({ [e.target.name]: e.target.value });
    console.log("STATE", this.state);
  };
  handleSave = (id) => {
    const body = {
      name: this.state.name,
      price: this.state.price,
      rating: this.state.rating,
      about: this.state.about,
      img: this.state.img,
    };
    const url = " http://localhost:3000/products/" + id;
    return fetch(url, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA", data);
        this.props.dispatch(getProductsList());
        this.setEditingState();
      });
  };
  handleAddToCart = (product) => {
    this.props.dispatch(addProductToCart(product));
  };
  render() {
    const { product, cart } = this.props;
    let { editing, name, price, rating, about } = this.state;
    console.log("PRODUCT", product);
    return (
      <div className="product-card">
        <div className="left">
          <img src={product.img} alt="product-image" />
        </div>
        <div className="middle">
          <div className="product-name">
            {editing ? (
              <input
                type="text"
                defaultValue={product.name}
                onChange={this.onChange}
                name="name"
              />
            ) : (
              product.name
            )}
          </div>
          <div className="price">
            <span>Rs </span>
            {editing ? (
              <input
                type="text"
                defaultValue={product.price}
                name="price"
                onChange={this.onChange}
              />
            ) : (
              product.price
            )}
          </div>
          <div className="rating">
            {editing ? (
              <input
                type="text"
                defaultValue={product.rating}
                name="rating"
                onChange={this.onChange}
              />
            ) : (
              product.rating
            )}
          </div>
        </div>
        <div className="right">
          <p>
            {editing ? (
              <textarea
                defaultValue={product.about}
                name="about"
                onChange={this.onChange}
                rows={3}
                style={{ rows: 3, width: 300 }}
              />
            ) : (
              product.about
            )}
          </p>
          <div className="card-footer">
            {editing ? (
              <div>
                <button className="primary" onClick={this.setEditingState}>
                  Cancel
                </button>
                <button
                  className="save"
                  type="submit"
                  onClick={() => {
                    this.handleSave(product.id);
                  }}
                >
                  save
                </button>
              </div>
            ) : (
              <div>
                {cart || (
                  <button className="primary" onClick={this.setEditingState}>
                    Edit
                  </button>
                )}
                <button
                  className="danger"
                  onClick={() => {
                    this.handleDelete(product.id);
                  }}
                >
                  Delete
                </button>
                {cart || (
                  <button
                    className="save"
                    onClick={() => this.handleAddToCart(product)}
                  >
                    Add To Cart
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
