import React from "react";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from "./burger-constructor.module.css";
import propTypes from "prop-types";
import { createPortal } from 'react-dom';
import Modal from "../modal/modal";
import ModalOverlay from "../modal-overlay/modal-overlay";
import OrderDetails from  "../order-details/order-details"
import {DataBurgerContext} from "../../utils/burger-consrtuctor-context.js";

const { container, bun, toppings, topping__item, info } =
  burgerConstructorStyle;



function BurgerConstructor(props) {
  const { consrtuctorIngridients, numberOrder, setConsrtuctorIngridients } = React.useContext(DataBurgerContext);
  const [summBurger, setSummBurger] = React.useReducer(calculateAmount, 0)
  function calculateAmount() {
    const summToppings = consrtuctorIngridients.toppings.reduce((accumulator, next) => {
      return accumulator + next.price;
    }, 0);
    return summToppings + consrtuctorIngridients.bun.price;
  }

  React.useEffect(() => {
    setSummBurger();
  }, [consrtuctorIngridients.toppings]);

  return (
    <>
    <section>
      <section className={`${container} mt-20 p-5`}>
        <div className={`${bun} ml-8 mr-2`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${consrtuctorIngridients.bun.name} (верх)`}
            price={200 / 2}
            thumbnail={consrtuctorIngridients.bun.image}
          />
        </div>
        <ul className={`${toppings}`}>
          {consrtuctorIngridients.toppings.map((topping, index) => {
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
          })}
        </ul>
        <div className={`${bun} ml-8 mr-2`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${consrtuctorIngridients.bun.name} (низ)`}
            price={200 / 2}
            thumbnail={consrtuctorIngridients.bun.image}
          />
        </div>
      </section>
      <div className={`${info} mt-5`}>
        <p className="text text_type_digits-medium mr-2">{summBurger}</p>
        <CurrencyIcon type="primary" />
        <Button
          onClick={props.handleOpenModal}
          extraClass="ml-10"
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>
    </section>
    {props.showModal && (
        <>
        <Modal heading='' modalSelector={props.modalSelector} handleCloseModal={props.handleCloseModal}> 
            <OrderDetails numberOrder={numberOrder} />
        </Modal>
        </>
      )}
    </>
  );
}

BurgerConstructor.propTypes = {
  context: propTypes.shape({
    consrtuctorIngridients: propTypes.object.isRequired
  }), 
  handleCloseModal: propTypes.func.isRequired,
  handleOpenModal: propTypes.func.isRequired,
  modalSelector:propTypes.object.isRequired,
  showModal: propTypes.bool.isRequired
};

export default BurgerConstructor;
