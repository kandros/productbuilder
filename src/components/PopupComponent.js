import React, { Component } from "react";

class PopupComponent extends Component {
  render() {
    return (
      <div className="popup" data-show={this.props.showPopup}>
        <p>Please select a model first!</p>
      </div>
    );
  }
}

export default PopupComponent;
