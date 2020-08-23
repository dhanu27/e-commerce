import React from "react";
import { connect } from "react-redux";
import { getProductsList } from "../actions";
import Product from "./product";
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(getProductsList());
  }
  render() {
    const { list } = this.props.products;
    console.log("list", list);
    console.log("PROPS", this.props);
    return (
      <div>
        App
        <div>
          {list &&
            list.map((product, index) => <Product product={product}></Product>)}
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
