// Import react
import React, { Component } from "react";

// Page model component
class PageModelsComponent extends Component {
  render() {
    return (
      <React.Fragment>
        <ul className="ul__car page__container">{this.props.createList}</ul>
      </React.Fragment>
    );
  }
}

export default PageModelsComponent;
