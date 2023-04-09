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
import { useSelector, useDispatch } from "react-redux";
import { getOrderNumber } from "../../services/actions";


const { container, bun, toppings, topping__item, info } =
  burgerConstructorStyle;

function BurgerConstructor() {
  const dispatch = useDispatch();
  const numberOrder = useSelector((state)=> state.burger.numberOrder)
  const showModalOrderDetails = useSelector((state)=>state.burger.showModalOrderDetails)
  const ingredientsConstructor = useSelector((state) => state.burger.ingridientsForConstructor)
  
  function calculateAmount() {
    if (!ingredientsConstructor) return "0";
    const summToppings = ingredientsConstructor.toppings.reduce(
      (accumulator, next) => {
        return accumulator + next.price;
      },
      0
    );
    return summToppings + ingredientsConstructor.bun.price;
  }

  const [summBurger, setSummBurger] = React.useReducer(calculateAmount, 0);

  const hanldleOpenModalOrderDetails = () => {
    dispatch(getOrderNumber(ingredientsConstructor))
  }


  React.useEffect(() => {
    setSummBurger();
  }, [ingredientsConstructor.toppings]);

  const bunUp = ingredientsConstructor ? (
    <ConstructorElement
      type="top"
      isLocked={true}
      text={`${ingredientsConstructor.bun.name} (верх)`}
      price={200 / 2}
      thumbnail={ingredientsConstructor.bun.image}
    />
  ) : (
    <div></div>
  );
  const bunDown = ingredientsConstructor ? (
    <ConstructorElement
      type="bottom"
      isLocked={true}
      text={`${ingredientsConstructor.bun.name} (низ)`}
      price={200 / 2}
      thumbnail={ingredientsConstructor.bun.image}
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
            {ingredientsConstructor ? (
              ingredientsConstructor.toppings.map((topping, index) => {
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
          >
            <OrderDetails numberOrder={numberOrder} />
          </Modal>
        </>
      )}
    </>
  );
}

// BurgerConstructor.propTypes = {
//   context: propTypes.shape({
//     ingredientsConstructor: propTypes.object.isRequired,
//       handleCloseModal: propTypes.func.isRequired,
//   hanldleOpenModalOrderDetails: propTypes.func.isRequired,
//   modalSelector: propTypes.object.isRequired,
//   showModalOrderDetails: propTypes.bool.isRequired,
//   }),

// };

export default BurgerConstructor;
