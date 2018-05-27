import React, { Component } from "react";
import check from "../img/check.svg";

// Method that loops and create the car accessories
const createAccessories = (obj, activeModelCar, carSelected, eventClick) => {
  // Create the list array
  const listArray = [];
  // Loop trough the object
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let element = obj[key];
      // Get the correct object
      if (element.model === activeModelCar) {
        // Get the accessories object
        const accessories = element.accessories;
        // Loop through the objcet accessories
        for (let accessorieKey in accessories) {
          if (accessories.hasOwnProperty(accessorieKey)) {
            let accessorieElement = accessories[accessorieKey];
            // Push the accessorie into the array
            listArray.push(
              <li
                key={accessorieElement.accName}
                data-name={accessorieElement.accName}
                className="accessories--list"
                onClick={eventClick}
                data-active={accessorieElement.active}
                data-price={accessorieElement.accPrice}
              >
                <span className="accessories--list-text">
                  {accessorieElement.accName}
                </span>
                <span
                  className="accessories--list-price"
                  data-price={accessorieElement.accPrice}
                >
                  {"$" + accessorieElement.accPrice}
                </span>
                <div className="accessories--list-check">
                  <img src={check} alt="check" />
                </div>
              </li>
            );
          }
        }
      }
    }
  }
  // Return the array
  return listArray;
};

class PageAccessoriesComponent extends Component {
  render() {
    return (
      <React.Fragment>
        <ul className="page__container">
          {createAccessories(
            this.props.carModelItems,
            this.props.activeModelCar,
            this.props.carSelected,
            this.props.selectAccessories
          )}
        </ul>
      </React.Fragment>
    );
  }
}

export default PageAccessoriesComponent;
