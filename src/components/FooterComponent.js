import React, { Component } from "react";

class FooterComponent extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="product-selected">
          <div className="product-selected__img">
            <img src={"../img/" + this.props.activeCar + ".jpg"} alt="car" />
          </div>
          <div className="product-selected__price">
            <span className="total">Total</span>
            <span className="total--amount">$40.000</span>
          </div>
        </div>
        <ul className="footer--nav">
          <li className="footer--list back-page">
            <a className="footer--link" />
          </li>
          <li className="footer--list next-page">
            <ul className="footer--list-nav">
              <li className="footer--list-list">
                <a className="footer--list-link" href="#color">
                  COLORS
                </a>
              </li>
              <li className="footer--list-list">
                <a className="footer--list-link" href="#color">
                  MODELS
                </a>
              </li>
              <li className="footer--list-list">
                <a className="footer--list-link" href="#color">
                  ACCESORIES
                </a>
              </li>
              <li className="footer--list-list">
                <a className="footer--list-link" href="#color">
                  SUMMARY
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </footer>
    );
  }
}

export default FooterComponent;
