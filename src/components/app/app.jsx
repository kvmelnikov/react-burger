import React from "react";
import appStyle from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngridients from "../burger-ingridients/burger-ingridients.jsx";
import BurgerConstuctor from "../burger-constructor/burger-constructor.jsx";
import Api from "../../utils/api/api.js";
import {
  DataBurgerConstructorContext,
  DataBurgerIngridientsContext,
} from "../../utils/context.js";

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
  const [ingredients, setIngdidients] = React.useState();
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

  const makeConstructorData = (ingredientsForConstructor) => {
    const data = {};
    data.toppings = [];
    ingredientsForConstructor.forEach((el) => {
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
  };

  const hanldleOpenModalOrderDetails = () => {
    
    api
      .getCheckout(makeCheckout())
      .then((resp) => {
        setNumberOrder(resp.order.number);
        setShowModalOrderDetails(true);
      })
      .catch((err) => console.log(err));
  };

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
        makeConstructorData(data.data);
      })
      .catch(() => "");
  }, []);
  

  if (!ingredients) return <AppHeader />;
  return (
    <>
      <div className={appStyle.body}>
        <AppHeader />
        <main className={appStyle.container}>
          <DataBurgerIngridientsContext.Provider
            value={{
              ingredients,
              ingredientDataForModal,
              hanldleOpenModalIngridientDetails,
              handleCloseModal,
              showModalIngridientDetails,
              modalSelector,
            }}
          >
            <BurgerIngridients />
          </DataBurgerIngridientsContext.Provider>
          <DataBurgerConstructorContext.Provider
            value={{
              numberOrder,
              consrtuctorIngridients,
              hanldleOpenModalOrderDetails,
              showModalOrderDetails,
              modalSelector,
              handleCloseModal,
            }}
          >
            <BurgerConstuctor />
          </DataBurgerConstructorContext.Provider>
        </main>
      </div>
    </>
  );
}

export default App;
