import React from "react";
import { connect } from "react-redux";
import { addProduct } from "../actions";

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    console.log("ADD Props", props);
    this.state = {
      name: "",
      price: "",
      rating: "",
      about: "",
      img: "",
      id: "",
    };
  }
  onChange = (e) => {
    console.log("PPPP@@@@P");
    this.setState({ [e.target.name]: e.target.value });
    console.log("STATE", this.state);
  };
  handleSave = (e) => {
    e.preventDefault();
    const body = {
      name: this.state.name,
      price: this.state.price,
      rating: this.state.rating,
      about: this.state.about,
      img: this.state.img,
      id: Date.now(),
    };
    this.props.dispatch(addProduct(body));
  };
  render() {
    const { name, price, rating, about } = this.state;
    return (
      <div className="addProduct">
        <h1>ADD Product</h1>
        <form>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.onChange}
          />
          <label>Price</label>
          <input
            type="Number"
            name="price"
            value={price}
            onChange={this.onChange}
          />
          <label>Description</label>
          <input
            type="text"
            name="about"
            value={about}
            onChange={this.onChange}
          />
          <label>Rating</label>
          <input
            type="number"
            name="rating"
            value={rating}
            onChange={this.onChange}
          />
          <button type="submit" onClick={this.handleSave}>
            ADD
          </button>
        </form>
      </div>
    );
  }
}

export default AddProduct;
