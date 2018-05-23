import React, { Component } from "react";

class HeaderComponent extends Component {
  render() {
    return (
      <header className="header">
        <div className="header__title">
          <h1 className="title">Product builder</h1>
        </div>
        <nav>
          <ul className="header__nav">
            <li className="nav--list">
              <a href="#models" className="nav--link">
                MODELS
              </a>
            </li>
            <li className="nav--list">
              <a href="#colors" className="nav--link">
                COLORS
              </a>
            </li>
            <li className="nav--list">
              <a href="#accessories" className="nav--link">
                ACCESSORIES
              </a>
            </li>
            <li className="nav--list">
              <a href="#summary" className="nav--link">
                SUMMARY
              </a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default HeaderComponent;
