import React, { Component } from "react";

class PageAccessoriesComponent extends Component {
  render() {
    return (
      <React.Fragment>
        <ul className="page__container">
          <li className="accessories--list">
            <span className="accessories--list-text">BMW Laserlight</span>
            <span className="accessories--list-price" data-price="6300">
              $6.300
            </span>
            <div className="accessories--list-check" />
          </li>
          <li className="accessories--list">
            <span className="accessories--list-text">BMW Laserlight</span>
            <span className="accessories--list-price" data-price="6300">
              $6.300
            </span>
            <div className="accessories--list-check" />
          </li>
          <li className="accessories--list">
            <span className="accessories--list-text">BMW Laserlight</span>
            <span className="accessories--list-price" data-price="6300">
              $6.300
            </span>
            <div className="accessories--list-check" />
          </li>
          <li className="accessories--list">
            <span className="accessories--list-text">BMW Laserlight</span>
            <span className="accessories--list-price" data-price="6300">
              $6.300
            </span>
            <div className="accessories--list-check" />
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default PageAccessoriesComponent;
