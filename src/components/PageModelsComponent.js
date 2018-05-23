import React, { Component } from "react";
import bmwi3 from "../img/bmw_xs_white.jpg";
import bmwi8 from "../img/bmw_xl_black.jpg";
import check from "../img/check.svg";

class PageModelsComponent extends Component {
  render() {
    return (
      <li className="page car__container">
        <ul className="ul__car">
          <li className="car" data-car="bmwi3">
            <div className="car__header">
              <h2>BMW i3</h2>
            </div>
            <div className="car__body">
              <div className="car__footer-price">
                <img src={bmwi3} alt="check" className="car__img" />
              </div>
            </div>
            <div className="car__footer">
              <span className="car__footer-price">from $140.700</span>
              <button className="car__footer-check">
                <img src={check} alt="check" />
                <span className="check" />
              </button>
            </div>
          </li>
          <li className="car" data-car="bmwi8">
            <div className="car__header">
              <h2>BMW i8</h2>
            </div>
            <div className="car__body">
              <img src={bmwi8} alt="check" className="car__img" />
            </div>
            <div className="car__footer">
              <span className="car__footer-price">from $42.400</span>
              <button className="car__footer-check">
                <img src={check} alt="check" />
                <span className="check" />
              </button>
            </div>
          </li>
        </ul>
      </li>
    );
  }
}

export default PageModelsComponent;
