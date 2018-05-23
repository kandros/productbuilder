import React, { Component } from "react";
import PageModelsComponent from "./PageModelsComponent.js";

class MainComponent extends Component {
  render() {
    return (
      <main className="main">
        <ul className="ul__page">
          <PageModelsComponent />
        </ul>
      </main>
    );
  }
}

export default MainComponent;
