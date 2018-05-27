import React, { Component } from "react";
import PageModelsComponent from "./PageModelsComponent.js";
import PageColorsComponent from "./PageColorsComponent.js";
import PageAccessoriesComponent from "./PageAccessoriesComponent.js";
import SummaryComponent from "./SummaryComponent.js";

class MainComponent extends Component {
  render() {
    return (
      <main className="main">
        <ul className="ul__page">
          {this.props.menuItems.map((el, index) => {
            if (el.name === "MODELS") {
              return (
                <li
                  key={index}
                  className="page"
                  data-page="MODELS"
                  data-direction={this.props.menuItems[index].position}
                >
                  <PageModelsComponent
                    createList={this.props.createList}
                    checkPg={this.props.checkPg}
                    page="page"
                  />
                </li>
              );
            } else if (el.name === "COLORS") {
              return (
                <li
                  key={index}
                  className="page"
                  data-page="COLORS"
                  data-direction={this.props.menuItems[index].position}
                >
                  <PageColorsComponent
                    activeCar={this.props.activeCar}
                    carModelItems={this.props.carModelItems}
                    activeModelCar={this.props.activeModelCar}
                    carSelected={this.props.carSelected}
                    selectColor={this.props.selectColor}
                  />
                </li>
              );
            } else if (el.name === "ACCESSORIES") {
              return (
                <li
                  key={index}
                  className="page"
                  data-page="ACCESSORIES"
                  data-direction={this.props.menuItems[index].position}
                >
                  <PageAccessoriesComponent
                    selectAccessories={this.props.selectAccessories}
                    activeCar={this.props.activeCar}
                    carModelItems={this.props.carModelItems}
                    activeModelCar={this.props.activeModelCar}
                    carSelected={this.props.carSelected}
                  />
                </li>
              );
            } else if (el.name === "SUMMARY") {
              return (
                <li
                  key={index}
                  className="page"
                  data-page="SUMMARY"
                  data-direction={this.props.menuItems[index].position}
                >
                  <SummaryComponent />
                </li>
              );
            }
          })}
        </ul>
      </main>
    );
  }
}

export default MainComponent;
