import React, { Component } from "react";
import HeaderComponent from "./HeaderComponent.js";
import MainComponent from "./MainComponent.js";
import FooterComponent from "./FooterComponent.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCar: "bmwi3",
      totalPrice: 0,
      activePage: ""
    };
    this.changePage = () => {};
  }
  render() {
    return (
      <div className="app">
        <HeaderComponent />
        <MainComponent />
        <FooterComponent activeCar={this.state.activeCar} />
      </div>
    );
  }
}

export default App;
