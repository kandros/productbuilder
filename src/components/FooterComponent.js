import React, { Component } from "react";

class FooterComponent extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="product-selected" data-state={this.props.carSelected}>
          <div className="product-selected__img">
            <img
              src={require("../img/" + this.props.activeCar + ".jpg")}
              alt="car"
            />
          </div>
          <div className="product-selected__price">
            <span className="total">Total</span>
            <span className="total--amount">{"$" + this.props.totalPrice}</span>
          </div>
        </div>
        <ul className="footer--nav">
          <li
            className="footer--list back-page"
            data-page={this.props.prevPage}
            onClick={this.props.changePage}
            data-ismainpage={this.props.isMainPage}
          >
            <a className="footer--link" />
          </li>
          <li
            className="footer--list next-page"
            data-state={this.props.carSelected}
            onClick={this.props.changePage}
            data-page={this.props.nextPage}
          >
            <ul className="footer--list-nav">
              {this.props.menuItems.map((el, index) => {
                return (
                  <li
                    key={index}
                    className="footer--list-list"
                    style={{
                      transform: "translateY(" + el.indx * 100 + "%)"
                    }}
                  >
                    <a className="footer--list-link" href={el.name}>
                      {el.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </footer>
    );
  }
}

export default FooterComponent;
