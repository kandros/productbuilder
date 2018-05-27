// Import react
import React, { Component } from "react";
// Import app components
import HeaderComponent from "./HeaderComponent.js";
import MainComponent from "./MainComponent.js";
import FooterComponent from "./FooterComponent.js";
import PopupComponent from "./PopupComponent.js";
// Import firebase
import firebase from "firebase";
import config from "./firebase.js";
// Import img
import check from "../img/check.svg";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carSelected: false,
      activeCar: "bmwi8--grey",
      activeModelCar: "BMWI8",
      showPopup: false,
      totalPrice: 0,
      menuItems: [
        {
          name: "MODELS",
          state: true,
          position: "show--left",
          indx: -1
        },
        {
          name: "COLORS",
          state: false,
          position: "initial",
          indx: 0
        },
        {
          name: "ACCESSORIES",
          state: false,
          position: "initial",
          indx: 1
        },
        {
          name: "SUMMARY",
          state: false,
          position: "initial",
          indx: 2
        },
        {
          name: "BUY",
          indx: 3
        }
      ],
      appNavigation: {
        prevPage: "SUMMARY",
        actualPage: "MODELS",
        nextPage: "COLORS"
      },
      mainPage: "MODELS",
      isMainPage: true,
      carModelItems: ""
    };
    // Get the reference to the database
    this.datab = firebase.database().ref("cars");
    // Fetch the cars
    this.db = this.datab.once("value").then(doc => {
      // Update the state
      this.setState({
        carModelItems: doc.val()
      });
    });
    // Method that creates the car list from data
    this.createList = () => {
      let nav = [];
      let index = 0;
      for (let prop in this.state.carModelItems) {
        if (this.state.carModelItems.hasOwnProperty(prop)) {
          let element = this.state.carModelItems[prop];
          nav.push(
            <li
              key={index}
              className="car"
              data-model={element.model}
              data-activecar={element.activeCar}
              data-price={element.initialPrice}
              onClick={this.changeCarSelected}
              data-selected={element.selected}
            >
              <div className="car__header">
                <h2>{element.model}</h2>
              </div>
              <div className="car__body">
                <div className="car__footer-price">
                  <img
                    src={require("../img/" + element.thumbnail + ".jpg")}
                    alt="check"
                    className="car__img"
                  />
                </div>
              </div>
              <div className="car__footer">
                <span className="car__footer-price">
                  {"from $" + element.initialPrice}
                </span>
                <button className="car__footer-check">
                  <img src={check} alt="check" />
                </button>
              </div>
            </li>
          );
          index++;
        }
      }
      return nav;
    };
    // Method that change the page
    this.changePage = e => {
      // Prevent defaul browser action
      e.preventDefault();
      // Check if the user select a model car
      if (!this.state.carSelected) {
        // Update state to show popup
        this.setState({
          showPopup: true
        });
        // Return
        return false;
      }
      // Get the new active page
      const newActivePage = e.currentTarget.getAttribute("data-page");
      // Check if the user gets to the last page
      if (newActivePage === "BUY") {
        // Return
        return false;
      }
      // Get the array of pages
      const arr = this.state.menuItems;
      // Get the active page
      let activeIndex = 0;
      // Get the new page
      let newIndex = 0;
      // Declare variable direction
      let direction = null;
      // Loop through the array
      arr.forEach((el, index) => {
        // If the loop hits the buy page do nothing
        if (el.name === "BUY") {
        } else {
          if (el.state === true) {
            activeIndex = index;
          }
          if (el.name === newActivePage) {
            newIndex = index;
          }
        }
      });

      // Get the direction
      if (newIndex > activeIndex) {
        direction = "right";
      } else {
        direction = "left";
      }

      // Update active state
      arr[activeIndex]["state"] = false;
      arr[newIndex]["state"] = true;
      // Update page direction
      arr.forEach((el, index) => {
        // If the loop hits the buy page change only the indx position
        if (el.name === "BUY") {
          if (direction === "right") {
            // Update index menu nav position
            arr[index]["indx"] =
              arr[index]["indx"] - 1 * (newIndex - activeIndex);
          } else {
            // Update index menu nav position
            arr[index]["indx"] =
              arr[index]["indx"] + 1 * (activeIndex - newIndex);
          }
        } else {
          // Update obj
          if (direction === "right") {
            // Update direction
            arr[newIndex]["position"] = "show--left";
            // Update all other pages
            if (index !== newIndex) {
              // Update direction
              arr[index]["position"] = "hide--left";
            }
            // Update elements after new index page for direction
            if (index > newIndex) {
              // Update direction
              arr[index]["position"] = "hide--right";
            }
            // Update index menu nav position
            arr[index]["indx"] =
              arr[index]["indx"] - 1 * (newIndex - activeIndex);
          }
          if (direction === "left") {
            // Update direction
            arr[newIndex]["position"] = "show--right";
            // Update all other pages
            if (index !== newIndex) {
              // Update direction
              arr[index]["position"] = "hide--right";
            }
            // Update elements after new index page for direction
            if (index < newIndex) {
              // Update direction
              arr[index]["position"] = "hide--left";
            }
            // Update index menu nav position
            arr[index]["indx"] =
              arr[index]["indx"] + 1 * activeIndex - newIndex;
          }
        }
      });
      // Create object to update the app navigation btn
      let newObjNavigationApp = {
        prevPage:
          arr[newIndex - 1] === undefined
            ? arr[activeIndex].name
            : arr[newIndex - 1].name,
        actualPage: arr[newIndex].name,
        nextPage:
          arr[newIndex + 1] === undefined ? "BUY" : arr[newIndex + 1].name
      };

      // Update the state
      this.setState({
        menuItems: arr,
        appNavigation: newObjNavigationApp,
        isMainPage: newActivePage !== this.state.mainPage ? false : true
      });
    };
    // Method that change the car selected
    this.changeCarSelected = e => {
      // Get the car list element
      const carElement = e.currentTarget;
      // Get the element model
      const elementModel = carElement.getAttribute("data-model");
      // Get the data active car
      const dataActiveCar = carElement.getAttribute("data-activecar");
      // Get the data selected
      const dataSelected = carElement.getAttribute("data-selected");
      // Get the basic price of the car
      const basicPrice = Number(carElement.getAttribute("data-price")).toFixed(
        3
      );
      // Get the array of car elements
      const arrayCarElements = this.state.carModelItems;
      // Flag checked car variable
      let checkCarSelected = false;
      // Loop through the object
      for (let key in arrayCarElements) {
        if (arrayCarElements.hasOwnProperty(key)) {
          // Get the element
          let element = arrayCarElements[key];
          // Change the state of the element
          element["selected"] = false;
          // Change the selected element
          if (element["model"] === elementModel) {
            // Check if this elements was selected
            if (dataSelected === "true") {
              element["selected"] = false;
              checkCarSelected = false;
            } else {
              element["selected"] = true;
              checkCarSelected = true;
            }
          }
        }
      }
      // Update the state
      this.setState({
        carModelItems: arrayCarElements,
        activeCar: dataActiveCar,
        carSelected: checkCarSelected,
        totalPrice: checkCarSelected ? basicPrice : 0,
        activeModelCar: elementModel,
        showPopup: false
      });
    };
  }

  render() {
    return (
      <div
        className="app"
        data-activepage={this.state.appNavigation.actualPage}
      >
        <HeaderComponent
          menuItems={this.state.menuItems}
          changePage={this.changePage}
          carSelected={this.state.carSelected}
        />
        <MainComponent
          createList={this.createList()}
          activeCar={this.state.activeCar}
          menuItems={this.state.menuItems}
          appNavigation={this.state.appNavigation}
          carModelItems={this.state.carModelItems}
          activeModelCar={this.state.activeModelCar}
          carSelected={this.state.carSelected}
        />
        <FooterComponent
          activeCar={this.state.activeCar}
          carSelected={this.state.carSelected}
          totalPrice={this.state.totalPrice}
          prevPage={this.state.appNavigation.prevPage}
          nextPage={this.state.appNavigation.nextPage}
          changePage={this.changePage}
          isMainPage={this.state.isMainPage}
          menuItems={this.state.menuItems}
        />
        <PopupComponent showPopup={this.state.showPopup} />
      </div>
    );
  }
}

export default App;
