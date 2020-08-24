import React from "react";
import { connect } from "react-redux";
import { getProductsList } from "../actions";
import ProductCard from "./productCard";
// import { getProductsList } from "../actions";

class Product extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch(getProductsList());
  }
  sortProducts = () => {
    console.log("Sorting");
    const { list } = this.props;
    list.sort((product1, product2) => product1.price - product2.price);
    this.setState({ list: list });
  };
  render() {
    const { list } = this.props;
    return (
      <div>
        <h3>Products</h3>
        <div>
          <button className="sortbttn" onClick={this.sortProducts}>
            Sort By Price
          </button>
        </div>
        <div>
          {list &&
            list.map((product, index) => (
              <ProductCard
                product={product}
                dispatch={this.props.dispatch}
                key={product.id}
              ></ProductCard>
            ))}
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

export default connect(mapStateToProps)(Product);
