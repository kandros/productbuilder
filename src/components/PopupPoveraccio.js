import React, { Component } from "react";

class PopupPoveraccio extends Component {
  render() {
    return (
      <div
        className="poveraccio__overlay"
        data-show={this.props.showPoveraccio}
      >
        <div className="popup--poveraccio">
          <div className="poveraccio__header">
            <img src={require("../img/jaga.jpg")} alt="Mr.Jaga" />
          </div>
          <div className="poveraccio__body">
            <p>
              Dice il saggio, di non fare il poveraccio e di prenderti la
              macchina più bella!
            </p>
          </div>
          <div className="poveraccio__footer">
            <button onClick={this.props.closePoveraccio}>Doh!</button>
          </div>
        </div>
      </div>
    );
  }
}

export default PopupPoveraccio;
