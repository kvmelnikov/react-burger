import React, { useEffect } from "react";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from "./burger-constructor.module.css";
import propTypes from "prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { DataBurgerConstructorContext } from "../../utils/context.js";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { getIngridients } from "../../services/actions";


const { container, bun, toppings, topping__item, info } =
  burgerConstructorStyle;

function BurgerConstructor(props) {
  const dispatch = useDispatch();
  const {
    numberOrder,
    hanldleOpenModalOrderDetails,
    handleCloseModal,
    showModalOrderDetails,

    modalSelector,
  } = React.useContext(DataBurgerConstructorContext);
  const consrtuctorIngridients = useSelector((state) => state.burger.ingridientsForConstructor)
  useEffect(()=>{
    dispatch(getIngridients())
  }, [])


  function calculateAmount() {
    if (!consrtuctorIngridients) return "0";
    const summToppings = consrtuctorIngridients.toppings.reduce(
      (accumulator, next) => {
        return accumulator + next.price;
      },
      0
    );
    return summToppings + consrtuctorIngridients.bun.price;
  }
  const [summBurger, setSummBurger] = React.useReducer(calculateAmount, 0);


  React.useEffect(() => {
    setSummBurger();
  }, [consrtuctorIngridients.toppings]);

  const bunUp = consrtuctorIngridients ? (
    <ConstructorElement
      type="top"
      isLocked={true}
      text={`${consrtuctorIngridients.bun.name} (верх)`}
      price={200 / 2}
      thumbnail={consrtuctorIngridients.bun.image}
    />
  ) : (
    <div></div>
  );
  const bunDown = consrtuctorIngridients ? (
    <ConstructorElement
      type="bottom"
      isLocked={true}
      text={`${consrtuctorIngridients.bun.name} (низ)`}
      price={200 / 2}
      thumbnail={consrtuctorIngridients.bun.image}
    />
  ) : (
    <div></div>
  );

  return (
    <>
      <section>
        <section className={`${container} mt-20 p-5`}>
          <div className={`${bun} ml-8 mr-2`}>{bunUp}</div>
          <ul className={`${toppings}`}>
            {consrtuctorIngridients ? (
              consrtuctorIngridients.toppings.map((topping, index) => {
                return (
                  <li key={index} className={`${topping__item}`}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                      text={topping.name}
                      price={topping.price}
                      thumbnail={topping.image}
                    />
                  </li>
                );
              })
            ) : (
              <div></div>
            )}
          </ul>
          <div className={`${bun} ml-8 mr-2`}>{bunDown}</div>
        </section>
        <div className={`${info} mt-5`}>
          <p className="text text_type_digits-medium mr-2">{summBurger}</p>
          <CurrencyIcon type="primary" />
          <Button
            onClick={hanldleOpenModalOrderDetails}
            extraClass="ml-10"
            htmlType="button"
            type="primary"
            size="large"
          >
            Оформить заказ
          </Button>
        </div>
      </section>
      {showModalOrderDetails && (
        <>
          <Modal
            heading=""
            modalSelector={modalSelector}
            handleCloseModal={handleCloseModal}
          >
            <OrderDetails numberOrder={numberOrder} />
          </Modal>
        </>
      )}
    </>
  );
}

BurgerConstructor.propTypes = {
  context: propTypes.shape({
    consrtuctorIngridients: propTypes.object.isRequired,
      handleCloseModal: propTypes.func.isRequired,
  hanldleOpenModalOrderDetails: propTypes.func.isRequired,
  modalSelector: propTypes.object.isRequired,
  showModalOrderDetails: propTypes.bool.isRequired,
  }),

};

export default BurgerConstructor;
