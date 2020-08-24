import React from "react";
import { connect } from "react-redux";
import ProductCard from "./productCard";

class Cart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { list } = this.props;
    console.log("CART List", list);
    return (
      <div>
        <h3>Cart</h3>
        <div>
          {list &&
            list.map((product, index) => (
              <ProductCard
                product={product}
                dispatch={this.props.dispatch}
                key={product.id}
                cart={true}
              ></ProductCard>
            ))}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    cart: state.cart,
  };
}

export default connect(mapStateToProps)(Cart);
