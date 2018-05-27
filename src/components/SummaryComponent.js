import React, { Component } from "react";
// Method that create accessories
const accessoriesLiest = accList => {
  // Define return array
  const arr = [];
  // Check if the obj is empty
  if (Object.keys(accList).length === 0) {
    arr.push(
      <li key="no-element" className="accessories__list">
        No Accessories selected;
      </li>
    );
  } else {
    // Loop through the object
    for (let key in accList) {
      if (accList.hasOwnProperty(key)) {
        let element = key;
        // Add elements to the array
        arr.push(
          <li key={element} className="accessories__list">
            {element}
          </li>
        );
      }
    }
  }

  // Return arra
  return arr;
};
// Method that create the summary elements
const summaryElements = (obj, img) => {
  // Create the return object
  let arr = [];
  // Loop through the array
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      arr.push(
        key === "car" ? (
          <li key={key} className="summary-list">
            <div className="summary__header">
              <h2 className="summary__title">MODEL</h2>
            </div>
            <div className="summary__body">
              <div className="summary__img">
                <img src={require("../img/" + img + ".jpg")} alt="car" />
              </div>
              <div className="summary__model">
                <h3>{obj[key]["model"]}</h3>
                <p>{obj[key]["description"]}</p>
              </div>
            </div>
          </li>
        ) : key === "color" ? (
          <li key={key} className="summary-list">
            <div className="summary__header">
              <h2 className="summary__title">COLOR</h2>
            </div>
            <div className="summary__body summary__body-color">
              <div
                className="summary__color"
                style={{ backgroundColor: obj[key]["code"] }}
              />
              <p>{obj[key]["name"] + "- $" + obj[key]["price"]}</p>
            </div>
          </li>
        ) : key === "accessories" ? (
          <li key={key} className="summary-list">
            <div className="summary__header">
              <h2 className="summary__title">ACCESSORIES</h2>
            </div>
            <div className="summary__body summary__body-accessories">
              <ul className="accessories__nav">{accessoriesLiest(obj[key])}</ul>
            </div>
          </li>
        ) : (
          ""
        )
      );
    }
  }
  // Return
  return arr;
};

class SummaryComponent extends Component {
  render() {
    return (
      <ul className="summary__nav">
        {summaryElements(this.props.listAttr, this.props.activeCar)}
      </ul>
    );
  }
}

export default SummaryComponent;
