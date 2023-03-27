import React from "react";
import appStyle from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngridients from "../burger-ingridients/burger-ingridients.jsx";
import BurgerConstuctor from "../burger-constructor/burger-constructor.jsx";
import { mockData, mockDataForConstructor } from "../../utils/utils.js";
import Api from "../../utils/api/api.js";
import IngridientDetails from "../ingredient-details/ingredient-details.jsx";
import { DataBurgerContext } from "../../utils/burger-consrtuctor-context.js";

const modalSelector = document.querySelector("#modals");
const api = new Api({
  baseUrl: "https://norma.nomoreparties.space/api/",
});

function App() {
  const [consrtuctorIngridients, setConsrtuctorIngridients] = React.useState({
    bun: {},
    toppings: [],
  });
  const [numberOrder, setNumberOrder] = React.useState(0);
  const [ingredients, setIngdidients] = React.useState(mockData);
  const [showModalIngridientDetails, setShowModalIngridientDetails] =
    React.useState(false);
  const [showModalOrderDetails, setShowModalOrderDetails] =
    React.useState(false);
  const [ingredientDataForModal, setingredientDataForModal] = React.useState(
    {}
  );
 

  const hanldleOpenModalIngridientDetails = (ingredient) => {
    setingredientDataForModal(ingredient);
    setShowModalIngridientDetails(true);
  };

  const makeCheckout = () => {
    const idToppings = consrtuctorIngridients.toppings.map((el) => {
      return el._id;
    });
    idToppings.push(consrtuctorIngridients.bun._id);
    return idToppings;
  };

  const hanldleOpenModalOrderDetails = () => {
    api
    .getCheckout(makeCheckout())
    .then((resp) => {
      console.log(resp)
      setNumberOrder(resp.order.number)
      setShowModalOrderDetails(true)
    })
    .catch(()=>'')
  }

  const handleCloseModal = () => {
    setShowModalIngridientDetails(false);
    setShowModalOrderDetails(false);
  };

  React.useEffect(() => {
    api
      .getIngridients()
      .then((data) => {
        setIngdidients((prev) => {
          return [...data.data];
        });
      })
      .catch(() => "");
  }, []);

  React.useEffect(() => {
    const data = {};
    data.toppings = [];
    ingredients.forEach((el) => {
      if (el.type !== "bun") {
        data.toppings.push(el);
      } else {
        data.bun = el;
      }
    });
    setConsrtuctorIngridients((prev) => ({
      ...prev.bun,
      bun: data.bun,
      ...prev.toppings,
      toppings: data.toppings,
    }));
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
            ingredientDataForModal={ingredientDataForModal}
          />
          <DataBurgerContext.Provider
            value={{ numberOrder, consrtuctorIngridients, setConsrtuctorIngridients }}
          >
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
