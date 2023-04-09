import React, { useMemo } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngridientsStyle from "./burger-ingridients.module.css";
import Ingridient from "../ingridient/ingridient.jsx";
import IngridientDetails from "../ingredient-details/ingredient-details.jsx";
import propTypes from "prop-types";
import Modal from "../modal/modal";
import { DataBurgerIngridientsContext } from "../../utils/context.js";
import { getIngridients } from "../../services/actions";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useEffect } from "react";
import { SET_CURRENT_INGRIDIENT, SHOW_MODAL_INGRIDIENT_DETAILS, CLOSE_MODAL } from "../../services/actions";

const { ingridients__container, ingridients__list, ingridients__tab } =
  burgerIngridientsStyle;

function BurgerIngridients(props) {
  const dispatch = useDispatch()
  const [current, setCurrent] = React.useState("bun");
  const [types] = React.useState({
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
  });

  const modalSelector = useSelector((state)=> state.burger.modalSelector)
  const ingredients = useSelector((state)=>state.burger.ingridients)
  const ingredientDataForModal = useSelector((state)=> state.burger.currentIngridient)
  const showModalIngridientDetails = useSelector((state)=> state.burger.modalIngridientDetail)

  useEffect(()=>{dispatch(getIngridients())},[])

  const filterIngridients = (currentType) => {
    const filterIngridient = ingredients.filter(
      (el) => el.type === currentType
    );
    return filterIngridient;
  };

  const hanldleOpenModalIngridientDetails = (ingredient) => {
      dispatch({type: SET_CURRENT_INGRIDIENT, value:ingredient })
      dispatch({type: SHOW_MODAL_INGRIDIENT_DETAILS})
  }

  const handleCloseModal = () => {
    dispatch({type: CLOSE_MODAL})
  }


  const content = useMemo(()=>{
    return (       
    <section className={`${ingridients__container}`}>
    {Object.keys(types).map((type, index) => {
      return (
        <div key={index}>
          <h3 className={`text text_type_main-medium mt-10 mb-4`}>
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
  </section>)
  }, [ingredients])



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
          <Modal
            heading="Детали ингридиента"
            modalSelector={modalSelector}
            handleCloseModal={handleCloseModal}
          >
            <IngridientDetails {...ingredientDataForModal} />
          </Modal>
        </>
      )}
    </>
  );
}

BurgerIngridients.propTypes = {
  constext: propTypes.shape({
    ingridients: propTypes.array,
    ingredientDataForModal: propTypes.object.isRequired,
    handleOpenModal: propTypes.func.isRequired,
    handleCloseModal: propTypes.func.isRequired,
    showModal: propTypes.bool.isRequired,
    modalSelector: propTypes.object.isRequired,
  })

};

export default BurgerIngridients;
