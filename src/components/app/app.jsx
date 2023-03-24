import React from "react";
import appStyle from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngridients from "../burger-ingridients/burger-ingridients.jsx";
import BurgerConstuctor from "../burger-constructor/burger-constructor.jsx";
import { mockData, mockDataForConstructor } from "../../utils/utils.js";
import Api from "../../utils/api/api.js";
import IngridientDetails from "../ingredient-details/ingredient-details.jsx";
import {DataBurgerContext} from "../../utils/burger-consrtuctor-context.js";

const modalSelector = document.querySelector('#modals');
const api = new Api({
  baseUrl: "https://norma.nomoreparties.space/api/",
 // baseUrl: "https://norma.nomoreparties.space/api/ingredients",

});

function App() {


  const [consrtuctorIngridients, setConsrtuctorIngridients] = React.useState(mockDataForConstructor);

  const [ingredients, setIngdidients] = React.useState(mockData);
  const [showModalIngridientDetails, setShowModalIngridientDetails] =
    React.useState(false);
  const [showModalOrderDetails, setShowModalOrderDetails] =
    React.useState(false);
  const [ingredientDataForModal, setingredientDataForModal] = React.useState({});

  const hanldleOpenModalIngridientDetails = (ingredient) => {
    setingredientDataForModal(ingredient);
    setShowModalIngridientDetails(true);
  };

  const makeCheckout = () =>{
    const idToppings = consrtuctorIngridients.toppings.map(el =>{
      return el._id
    })
    idToppings.push(consrtuctorIngridients.bun._id)
    
    return idToppings
  }

  const hanldleOpenModalOrderDetails = () => {
    api.getCheckout(makeCheckout())
    setShowModalOrderDetails(true);
  };

  const handleCloseModal = () => {
    setShowModalIngridientDetails(false);
    setShowModalOrderDetails(false);
  };

  React.useEffect(() => {
    api
      .getIngridients()
      .then((data) => {
        setIngdidients(data.data);
      })
      .catch(() => '');
  }, []);

  return (
    <>
      <div className={appStyle.body}>
        <AppHeader />
        <main className={appStyle.container}>
          <BurgerIngridients
            ingredients={ingredients}
            handleOpenModal={hanldleOpenModalIngridientDetails}
            handleCloseModal={handleCloseModal}
            showModal={showModalIngridientDetails}
            modalSelector={modalSelector}
            ingredientDataForModal= {ingredientDataForModal}
          />
          <DataBurgerContext.Provider value={{consrtuctorIngridients, setConsrtuctorIngridients}}>
          <BurgerConstuctor
            handleOpenModal={hanldleOpenModalOrderDetails}
            handleCloseModal={handleCloseModal}
            showModal={showModalOrderDetails}
            modalSelector={modalSelector}
          />
          </DataBurgerContext.Provider>

        </main>
      </div>
    </>
  );
}

export default App;
