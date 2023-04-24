import React, { useMemo } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngridientsStyle from "./burger-ingridients.module.css";
import Ingridient from "../ingridient/ingridient.jsx";
import IngridientDetails from "../ingredient-details/ingredient-details.jsx";
import propTypes from "prop-types";
import Modal from "../modal/modal";
import { DataBurgerIngridientsContext } from "../../utils/context.js";

import { GET_INGREDIENTS } from "../../services/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useDrag } from "react-dnd";
import {
  SET_CURRENT_INGREDIENT,
  SHOW_MODAL_INGRIDIENT_DETAILS,
  UPDATE_TYPE
} from "../../services/actions";

const { ingridients__container, ingridients__list, ingridients__tab } =
  burgerIngridientsStyle;

function BurgerIngridients() {
  const dispatch = useDispatch();
  const [current, setCurrent] = React.useState("bun");
  const [types] = React.useState({
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
  });
 

  const ingredients = useSelector((state) => state.api.ingridients);
  


  const ingredientDataForModal = useSelector(
    (state) => state.burger.currentIngridient
  );
  const showModalIngridientDetails = useSelector(
    (state) => state.modal.modalIngridientDetail
  );


  
  const typeRefs = React.useRef([]);
  const containerRef = React.useRef()
  
  typeRefs.current = Object.keys(types).map((_, i) => typeRefs.current[i] ?? React.createRef());

  const calculateMinDistanceTypeToScroll = (scrollDistanceTop, currentType) =>{
    let currentTab = currentType
    let minElement = 9999999;

    typeRefs.current.forEach((el)=>{
      const elementDistanceTop = el.current.offsetTop
      const currentDifference =  (scrollDistanceTop + 40) - elementDistanceTop ;
      if( currentDifference < minElement && currentDifference >= 0) {
          minElement = currentDifference
          currentTab = el.current.dataset.types
      }
    
    })
    return currentTab
  }
  

  const handleScroll = React.useCallback( (() => {
    const scrollDistanceTop = containerRef.current.scrollTop
      setCurrent(calculateMinDistanceTypeToScroll(scrollDistanceTop, current))
    }), [types])
 

  const filterIngridients = (currentType) => {
    const filterIngridient = ingredients.filter(
      (el) => el.type === currentType
    );
    return filterIngridient;
  };

  const hanldleOpenModalIngridientDetails = (ingredient) => {
    dispatch({ type: SET_CURRENT_INGREDIENT, value: ingredient });
    dispatch({ type: SHOW_MODAL_INGRIDIENT_DETAILS });
  };

  const content = useMemo(() => {
    return (
      <section ref={containerRef} onScroll={handleScroll} className={`${ingridients__container}`}>
        {Object.keys(types).map((type, index) => {
          return (
            <div key={type} data-types={type}  ref={typeRefs.current[index]} >
              <h3
                className={`text text_type_main-medium mt-10 mb-4`}
              >
                {types[type]}
              </h3>
              <ul className={`${ingridients__list}`}>
                {filterIngridients(type).map((el) => {
                  return (
                    <Ingridient
                     
                      key={el._id}
                      handleOpenModal={hanldleOpenModalIngridientDetails}
                      {...el}
                    />
                  );
                })}
              </ul>
            </div>
          );
        })}
      </section>
    );
  }, [ingredients]);

  return (
    <>
      <section className="mt-10">
        <h2 className={`text text_type_main-large`}>Соберите бургер</h2>
        <div className={`${ingridients__tab} mb-10`}>
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
        {content}
      </section>
      {showModalIngridientDetails && (
        <>
          <Modal heading="Детали ингридиента">
            <IngridientDetails {...ingredientDataForModal} />
          </Modal>
        </>
      )}
    </>
  );
}

// BurgerIngridients.propTypes = {
//   constext: propTypes.shape({
//     ingridients: propTypes.array,
//     ingredientDataForModal: propTypes.object.isRequired,
//     handleOpenModal: propTypes.func.isRequired,
//     handleCloseModal: propTypes.func.isRequired,
//     showModal: propTypes.bool.isRequired,
//     modalSelector: propTypes.object.isRequired,
//   })

// };

export default BurgerIngridients;
