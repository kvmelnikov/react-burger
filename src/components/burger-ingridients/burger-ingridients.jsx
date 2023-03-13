import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngridientsStyle from "./burger-ingridients.module.css";
import Ingridient from "../ingridient/ingridient.jsx";
import IngridientDetails from "../ingredient-details/ingredient-details.jsx";
import propTypes from "prop-types";
import { createPortal } from 'react-dom';
import Modal from "../modal/modal";
import ModalOverlay from "../modal-overlay/modal-overlay";


const { ingridients__container, ingridients__list, ingridients__tab } =
  burgerIngridientsStyle; 

function BurgerIngridients(props) {
  const [current, setCurrent] = React.useState("bun");


  const [types] = React.useState({
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
  });

 


  const getIngridients = (currentType) => {
    
    const filterIngridient = props.ingredients.filter(
      (el) => el.type === currentType
    );
    return filterIngridient;
  };

  return (
    <>
      <section className="mt-10">
        <h2 className={`text text_type_main-large`}>Соберите бургер</h2>
        <div
          className={`${ingridients__tab} mb-10`}
        >
          <Tab
            key={0}
            value="bun"
            active={current === "bun"}
            onClick={() => setCurrent("bun")}
          >
            Булки
          </Tab>
          <Tab
            key={1}
            value="sauce"
            active={current === "sauce"}
            onClick={() => setCurrent("sauce")}
          >
            Соусы
          </Tab>
          <Tab
            key={2}
            value="main"
            active={current === "main"}
            onClick={() => setCurrent("main")}
          >
            Начинки
          </Tab>
        </div>
        <section className={`${ingridients__container}`}>
          {Object.keys(types).map((type, index) => {
            return (
              <div key={index}>
                <h3 className={`text text_type_main-medium mt-10 mb-4`}>
                  {types[type]}
                </h3>
                <ul className={`${ingridients__list}`}>
                  {getIngridients(type).map((el) => {
                    return <Ingridient key={el._id} handleOpenModal={props.handleOpenModal}  {...el} />;
                    
                  })}
                </ul>
              </div>
            );
          })}
        </section>
      </section>
      {props.showModal && (
        <>
        <Modal heading='Детали ингридиента' modalSelector={props.modalSelector} handleCloseModal={props.handleCloseModal}> 
            <IngridientDetails   {...props.ingredientDataForModal}/>
        </Modal>
        </>
    
      )}

    </>
  );
}

BurgerIngridients.propTypes = {
  ingridients: propTypes.array,
  handleOpenModal: propTypes.func.isRequired,
  handleCloseModal: propTypes.func.isRequired,
  showModal: propTypes.bool.isRequired,
  modalSelector: propTypes.object.isRequired,
  ingredientDataForModal: propTypes.object.isRequired
};

export default BurgerIngridients;
