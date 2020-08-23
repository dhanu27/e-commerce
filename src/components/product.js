import React from "react";
import { connect } from "react-redux";
import { deleteProduct } from "../actions";
// import { getProductsList } from "../actions";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
  }
  setEditingState = () => {
    console.log("Editing");
    this.setState({ editing: !this.state.editing });
  };
  handleDelete = (id) => {
    deleteProduct(id);
  };
  render() {
    const { product } = this.props;
    let { editing } = this.state;
    console.log("PRODUCT", product);
    return (
      <div className="product-card">
        <div className="left">
          <img src={product.img} alt="product-image" />
        </div>
        <div className="middle">
          <div className="product-name">
            {editing ? (
              <input type="text" defaultValue={product.name} />
            ) : (
              product.name
            )}
          </div>
          <div className="price">
            <span>Rs</span>
            {editing ? (
              <input type="text" defaultValue={product.price} />
            ) : (
              product.price
            )}
          </div>
          <div className="rating">
            {editing ? (
              <input type="text" defaultValue={product.rating} />
            ) : (
              product.rating
            )}
          </div>
        </div>
        <div className="right">
          <p>
            {editing ? (
              <textarea defaultValue={product.about} />
            ) : (
              product.about
            )}
          </p>
        </div>
        <div className="card-footer">
          {editing ? (
            <div>
              <button onClick={this.setEditingState}>Cancel</button>
              <button>save</button>
            </div>
          ) : (
            <div>
              <button onClick={this.setEditingState}>Edit</button>
              <button onClick={this.handleDelete}>Delete</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Product;
