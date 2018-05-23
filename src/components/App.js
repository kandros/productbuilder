import React, { Component } from "react";
import HeaderComponent from "./HeaderComponent.js";
import MainComponent from "./MainComponent.js";
import FooterComponent from "./FooterComponent.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paginaAttiva: "models"
    };
    this.changePage = () => {};
  }
  render() {
    return (
      <div className="app">
        <HeaderComponent />
        <MainComponent />
        <FooterComponent />
      </div>
    );
  }
}

export default App;
