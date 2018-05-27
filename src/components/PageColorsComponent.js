import React, { Component } from "react";

class PageColorsComponent extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="page__container">
          <div className="car__color-img">
            <img
              src={require("../img/" + this.props.activeCar + ".jpg")}
              alt={this.props.activeCar}
            />
          </div>
          <ul className="car__color-color">
            <li className="car__colors" data-color="grey" />
            <li className="car__colors" data-color="perl" />
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default PageColorsComponent;
