import React, { Component } from "react";

class HeaderComponent extends Component {
  render() {
    return (
      <header className="header" data-carselected={this.props.carSelected}>
        <div className="header__title">
          <h1 className="title">Product builder</h1>
        </div>
        <nav>
          <ul className="header__nav">
            {this.props.menuItems.map((el, index) => {
              return (
                // Check if the loop hits the buy page
                el.name === "BUY" ? (
                  ""
                ) : (
                  <li key={index} className="nav__list">
                    <a
                      href={el.name}
                      className="nav--link"
                      data-active={el.state}
                      data-page={el.name}
                      onClick={this.props.changePage}
                    >
                      {el.name}
                    </a>
                  </li>
                )
              );
            })}
          </ul>
        </nav>
      </header>
    );
  }
}

export default HeaderComponent;
