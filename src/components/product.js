import React from "react";
import { connect } from "react-redux";
// import { getProductsList } from "../actions";

class Product extends React.Component {
  render() {
    const { product } = this.props;
    return (
      <div className="product-container">
        <img src={product.image} alt="product-image" />
        <div>
          <span class="product-name">{product.name}</span>
          <span class="price">Rs{product.price}</span>
          <span class="price">{product.rating}</span>
        </div>
        <div className="about">
          <p>{product.about}</p>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    products: state.products,
  };
}

export default connect(mapStateToProps)(App);
