// Import react
import React, { Component } from "react";
// Import app components
import HeaderComponent from "./HeaderComponent.js";
import MainComponent from "./MainComponent.js";
import FooterComponent from "./FooterComponent.js";
import PopupComponent from "./PopupComponent.js";
import PopupPoveraccio from "./PopupPoveraccio.js";
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
      activeCar: "bmwi8--Grey Metallic",
      activeModelCar: "BMWI8",
      showPopup: false,
      popupPoveraccio: false,
      showPoveraccio: false,
      listAttr: {
        car: {
          model: "",
          price: 0,
          description: ""
        },
        color: {
          name: "",
          code: "",
          price: 0
        },
        accessories: {}
      },
      totalPrice: {
        car: 0,
        color: 0,
        accessories: 0,
        total: 0
      },
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
        carModelItems: doc.val(),
        orgCarObject: doc.val()
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
                <h2>{element.model2}</h2>
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
    // Method that update the car element selected
    this.updateCarElements = (elementType, nameElement, price, remove) => {
      // Get the car object
      const carObject = this.state.carModelItems;
      // Get the current car
      let currentCar = carObject[this.state.activeModelCar.toLowerCase()];
      // Get the list object
      const listObject = this.state.listAttr;
      // Define object price
      let totalPrice = {};
      // Update the object
      if (elementType === "car") {
        // Update the car object
        listObject[elementType]["name"] = nameElement;
        listObject[elementType]["model"] = currentCar["model2"];
        listObject[elementType]["description"] = currentCar["description"];
        listObject[elementType]["price"] = price;
        // Update the color object
        let currentColor = currentCar["defaultColor"];
        listObject["color"]["name"] = currentColor;
        listObject["color"]["code"] =
          currentCar["colors"][currentColor]["colorCode"];
        listObject["color"]["price"] =
          currentCar["colors"][currentColor]["colorPrice"];
        // Update the price
        totalPrice = this.updateCurrentPrice("car", price);
      } else if (elementType === "color") {
        // Update the color object
        listObject[elementType]["name"] = nameElement;
        listObject[elementType]["price"] =
          currentCar["colors"][nameElement]["colorPrice"];
        listObject[elementType]["code"] =
          currentCar["colors"][nameElement]["colorCode"];
        // Update the price
        totalPrice = this.updateCurrentPrice("color", price);
      } else if (elementType === "accessories") {
        // Check if the user decide to uncheck the accessorie
        if (remove === true) {
          // Remove the accessorie from object
          delete listObject[elementType][nameElement];
          price = -Math.abs(price);
        } else {
          let newAccessorie = {};
          // Create a new accessorie object
          newAccessorie[nameElement] = price;
          //  Update the accessorie object
          listObject[elementType][nameElement] = newAccessorie;
        }
        // Update the price
        totalPrice = this.updateCurrentPrice("accessories", price);
      }

      // Return the object
      return {
        listAttr: listObject,
        totalPrice: totalPrice
      };
    };
    // Method that update the current price
    this.updateCurrentPrice = (nameElement, price) => {
      // Get the actual total price object
      let actualTotalPrice = this.state.totalPrice;
      // Define a partial current price
      let partialTotalPrice = 0;

      // Update the main object
      if (nameElement !== "accessories") {
        actualTotalPrice[nameElement] = Number(price);
      } else {
        actualTotalPrice[nameElement] =
          actualTotalPrice[nameElement] + Number(price);
      }

      // Update the total price
      for (let key in actualTotalPrice) {
        if (actualTotalPrice.hasOwnProperty(key)) {
          if (key === "total") {
          } else {
            // Sum all the prices
            partialTotalPrice = Number(
              partialTotalPrice + actualTotalPrice[key]
            );
          }
        }
      }

      // Update the total in the main object
      actualTotalPrice["total"] = partialTotalPrice;

      // Return object
      return {
        totalPrice: actualTotalPrice
      };
    };
    // Method that change the car selected
    this.changeCarSelected = e => {
      // Get the car list element
      const carElement = e.currentTarget;
      // Reset eventual car selected
      this.resetMainObject().then(() => {
        // Get the element model
        const elementModel = carElement.getAttribute("data-model");
        // Get the data active car
        const dataActiveCar = carElement.getAttribute("data-activecar");
        // Get the data selected
        const dataSelected = carElement.getAttribute("data-selected");
        // Get the basic price of the car
        let basicPrice = carElement.getAttribute("data-price");

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
                // Reset eventual car selected
                this.resetMainObject();
                return false;
              } else {
                element["selected"] = true;
                checkCarSelected = true;
              }
            }
          }
        }

        // Update the car elements
        let objPrice = this.updateCarElements("car", elementModel, basicPrice);
        // Update the state
        console.log(elementModel);
        this.setState({
          carModelItems: arrayCarElements,
          activeCar: dataActiveCar,
          carSelected: checkCarSelected,
          activeModelCar: elementModel,
          showPopup: false,
          listAttr: objPrice.listAttr,
          popupPoveraccio: elementModel === "BMWi3" ? true : false,
          showPoveraccio: elementModel === "BMWi3" ? true : false
        });
      });
    };
    // Method that update the color select and the total price
    this.selectColor = e => {
      // Get the color selected
      const thisColor = e.currentTarget;
      // Get the color name
      const colorName = thisColor.getAttribute("data-color");
      // Get the color img name
      const colorImgName = thisColor.getAttribute("data-imgsrc");
      // Get the price
      const colorPrice = thisColor.getAttribute("data-price");
      // Get the car object
      const carObject = this.state.carModelItems;
      // Loop through the object
      for (let key in carObject) {
        if (carObject.hasOwnProperty(key)) {
          // Get the element
          let element = carObject[key];
          // Check for the current car selected
          if (element.model === this.state.activeModelCar) {
            // Get the colors
            const colorsObj = element.colors;
            // Loop through the colors
            for (let colorProp in colorsObj) {
              if (colorsObj.hasOwnProperty(colorProp)) {
                // Get the color
                let thisColor = colorsObj[colorProp];
                // Set the color to false
                thisColor.activeColor = false;
                // Set the new color to true
                if (thisColor.colorName === colorName) {
                  thisColor.activeColor = true;
                }
              }
            }
          }
        }
      }

      // Update the car elements
      let objPrice = this.updateCarElements("color", colorName, colorPrice);

      // Update the state with the new color state
      this.setState({
        carModelItems: carObject,
        activeCar: colorImgName,
        listAttr: objPrice.listAttr
      });
    };
    // Method that implement car accessories
    this.selectAccessories = e => {
      // Get the accessorie
      const thisAccessorie = e.currentTarget;
      // Get the name
      const thisAccessorieName = thisAccessorie.getAttribute("data-name");
      // Get the price
      let price = thisAccessorie.getAttribute("data-price");
      // Get the car object
      const carObject = this.state.carModelItems;
      // Loop through the object
      for (let key in carObject) {
        if (carObject.hasOwnProperty(key)) {
          // Get the element
          let element = carObject[key];
          // Get the current car selected
          if (element.model === this.state.activeModelCar) {
            // Active the accessorie
            element["accessories"][thisAccessorieName]["active"] =
              element["accessories"][thisAccessorieName]["active"] === false
                ? true
                : false;

            // Update the car elements
            let objPrice = this.updateCarElements(
              "accessories",
              thisAccessorieName,
              price,
              element["accessories"][thisAccessorieName]["active"] === true
                ? false
                : true
            );

            this.setState({
              carModelItems: carObject,
              listAttr: objPrice.listAttr
            });
          }
        }
      }
    };
    // Method that reset the main car object
    this.resetMainObject = () => {
      return new Promise(ok => {
        // Get the object
        const mainObject = this.state.carModelItems;
        // Loop through the object
        for (let key in mainObject) {
          if (mainObject.hasOwnProperty(key)) {
            let car = mainObject[key];
            // Get the car properties
            let carAccessories = car["accessories"];
            let carColors = car["colors"];

            // Loop through the car properties
            for (let key in carAccessories) {
              if (carAccessories.hasOwnProperty(key)) {
                let element = carAccessories[key];
                element["active"] = false;
              }
            }

            // Loop through the car properties
            for (let key in carColors) {
              if (carColors.hasOwnProperty(key)) {
                let element = carColors[key];
                element["activeColor"] = false;
                // Set default color to true
                if (element["colorName"] === car["defaultColor"]) {
                  element["activeColor"] = true;
                }
              }
            }
          }
        }
        //
        // Update the state
        this.setState(
          {
            carModelItems: mainObject,
            listAttr: {
              car: {
                model: "",
                price: 0
              },
              color: {
                name: "",
                code: "",
                price: 0
              },
              accessories: {}
            },
            totalPrice: {
              car: 0,
              color: 0,
              accessories: 0,
              total: 0
            },
            carSelected: false,
            showPopup: false
          },
          ok
        );
      });
    };
    // Method that closes the poveraccio modal
    this.closePoveraccio = () => {
      this.setState({
        showPoveraccio: false
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
          selectColor={this.selectColor}
          selectAccessories={this.selectAccessories}
          listAttr={this.state.listAttr}
        />
        <FooterComponent
          activeCar={this.state.activeCar}
          carSelected={this.state.carSelected}
          totalPrice={this.state.totalPrice.total}
          prevPage={this.state.appNavigation.prevPage}
          nextPage={this.state.appNavigation.nextPage}
          changePage={this.changePage}
          isMainPage={this.state.isMainPage}
          menuItems={this.state.menuItems}
        />
        <PopupComponent
          showPopup={this.state.showPopup}
          activeCar={this.props.activeCar}
        />
        {this.state.popupPoveraccio ? (
          <PopupPoveraccio
            showPoveraccio={this.state.showPoveraccio}
            closePoveraccio={this.closePoveraccio}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
