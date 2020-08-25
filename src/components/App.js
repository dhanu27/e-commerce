import React from "react";
import { connect } from "react-redux";
import { getCartProductsList } from "../actions";
import Product from "./product";
import AddProduct from "./AddProduct";
import Cart from "./cart";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(getCartProductsList());
  }
  render() {
    console.log("PROPS", this.props);
    const { products, cart } = this.props;
    const count = cart.length;
    return (
      <div>
        <ReactNotification />
        <Router>
          <div>
            <div>
              <nav>
                <ul>
                  <li>
                    <ul>
                      <li>
                        <Link to="/Products">Products</Link>
                      </li>
                      <li>
                        <Link to="/AddProducts">AddProducts</Link>
                      </li>
                      <li>
                        <Link to="/cart">Cart</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="right">
                    <div className="cart-icon">
                      <img
                        style={styles.image}
                        src="https://image.flaticon.com/icons/svg/1170/1170627.svg"
                      />
                      <span className="show-number">{count}</span>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/Products">
                <Product list={products}></Product>
              </Route>
              <Route path="/AddProducts">
                <AddProduct dispatch={this.props.dispatch} />
              </Route>
              <Route path="/cart">
                <Cart list={cart} />
              </Route>
              <Route path="/">
                <Product list={products}></Product>
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    products: state.products,
    cart: state.cart,
  };
}
const styles = {
  image: {
    height: 50,
    width: 50,
  },
};
export default connect(mapStateToProps)(App);
