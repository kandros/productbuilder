// Import react
import React, { Component } from "react";

// Loop to create the color lists
const createColorElements = (obj, activeModelCar, carSelected) => {
  // Check if user select a car
  if (!carSelected) return false;
  // Create the list array
  let listArray = [];
  // Loop through the object
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let element = obj[key];
      // Get the correct object
      if (element.model === activeModelCar) {
        // Get the colors
        let objColors = element.colors;
        // Loop throug the colors
        for (let colorKey in objColors) {
          if (objColors.hasOwnProperty(colorKey)) {
            let color = objColors[colorKey];
            console.log(color);
            // Push the list into the array
            listArray.push(
              <li
                key={color.colorCode}
                className="car__colors"
                data-color="color.colorName"
                style={{
                  backgroundColor: color.colorCode,
                  order: color.colorOrder
                }}
              />
            );
          }
        }
      }
    }
  }
  // Return the list colors
  return listArray;
};

class PageColorsComponent extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="page__container">
          <div className="car__color-img">
            {this.props.carSelected ? (
              <img
                src={require("../img/" + this.props.activeCar + ".jpg")}
                alt={this.props.activeCar}
              />
            ) : (
              ""
            )}
          </div>
          <ul className="car__color-color">
            {createColorElements(
              this.props.carModelItems,
              this.props.activeModelCar,
              this.props.carSelected
            )}
            {/* <li className="car__colors" data-color="grey" />
            <li className="car__colors" data-color="perl" /> */}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default PageColorsComponent;
