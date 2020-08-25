import React from "react";
import { connect } from "react-redux";
import { store } from "react-notifications-component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  Notification = (text) => {
    store.addNotification({
      title: "Dropbox",
      message: text,
      type: "default", // 'default', 'success', 'info', 'warning'
      container: "bottom-left", // where to position the notifications
      animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
      animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
      dismiss: {
        duration: 3000,
      },
    });
  };
  setEditingState = () => {
    console.log("Editing");
    this.setState({ editing: !this.state.editing });
  };
  handleDelete = (id) => {
    if (this.props.cart) this.props.dispatch(deleteProductCart(id));
    else this.props.dispatch(deleteProduct(id));
  };
  onChange = (e) => {
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
    const arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(i);
    }
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
              <div>
                <label>Rating</label>
                <input
                  type="text"
                  defaultValue={product.rating}
                  name="rating"
                  onChange={this.onChange}
                />
              </div>
            ) : (
              arr.map((i, index) =>
                index < product.rating ? (
                  <span>
                    <img
                      style={styles.star}
                      src="https://image.flaticon.com/icons/svg/1828/1828884.svg"
                    />
                  </span>
                ) : (
                  <span>
                    <img
                      style={styles.star}
                      src="https://image.flaticon.com/icons/svg/1828/1828970.svg"
                    />
                  </span>
                )
              )
              // <div className="rating"></div>
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
        <ToastContainer />
      </div>
    );
  }
}
const styles = {
  star: {
    height: 20,
    width: 20,
  },
};

export default ProductCard;
