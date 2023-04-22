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
import {
  getOrderNumber,
  addBunInConstructor,
  addToppingInConstructor,
  deleteTopping,
  DECREASE_COUNTER_INGREDIENT
} from "../../services/actions";
import { useDrop } from "react-dnd";

const { container, bun, toppings, topping__item, info } =
  burgerConstructorStyle;

function BurgerConstructor() {
  const dispatch = useDispatch();
  const numberOrder = useSelector((state) => state.burger.numberOrder);
  const showModalOrderDetails = useSelector(
    (state) => state.burger.showModalOrderDetails
  );
  const ingredientsConstructor = useSelector(
    (state) => state.burger.ingridientsForConstructor
  );
  console.log(ingredientsConstructor)
  const ingredients = useSelector((state) => state.burger.ingridients);
 // const toppingRef = React.useRef(null);

  const [{ isHover }, drop] = useDrop({
    accept: "ingridient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(ingredient) {
      if (ingredient[0].type === "bun" )  {
        dispatch(addBunInConstructor(ingredient[0], ingredientsConstructor.bun._id));
      }
       else  {
        dispatch(addToppingInConstructor(ingredient[0]));
      }
    },
  });

  function calculateAmount() {
    if (
      Object.keys(ingredientsConstructor.bun).length === 0 &&
      Object.keys(ingredientsConstructor.toppings).length === 0
    ) {
      return "0";
    }
    else {

      const summToppings = ingredientsConstructor.toppings.reduce(
        (accumulator, next) => {
          return accumulator + Number(next.price);
        },
        0
      );

      return summToppings + Number(ingredientsConstructor.bun.price);
    }
  }

  const [summBurger, setSummBurger] = React.useReducer(calculateAmount, 0);

  const hanldleOpenModalOrderDetails = () => {
    dispatch(getOrderNumber(ingredientsConstructor));
  };

  const handleDeleteTopping = (e, index) => {
    if(e.target.parentElement.parentElement.classList.contains('pr-2')) {
    //  console.log(ingredientsConstructor.toppings[index]._id, index)
      
      dispatch(deleteTopping(ingredientsConstructor.toppings[index]._id, index))
    }
  }

  React.useEffect(() => {
    setSummBurger();
  }, [ingredientsConstructor]);

  const bunUp =
    Object.keys(ingredientsConstructor.bun).length > 0 ? (
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${ingredientsConstructor.bun.name} (верх)`}
        price={ingredientsConstructor.bun.price / 2}
        thumbnail={ingredientsConstructor.bun.image}
      />
    ) : (
      <div></div>
    );
  const bunDown =
    Object.keys(ingredientsConstructor.bun).length > 0 ? (
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${ingredientsConstructor.bun.name} (низ)`}
        price={ingredientsConstructor.bun.price/ 2}
        thumbnail={ingredientsConstructor.bun.image}
      />
    ) : (
      <div></div>
    );

  return (
    <>
      <section>
        <section ref={drop} className={`${container} mt-20 p-5`}>
          <div className={`${bun} ml-8 mr-2`}>{bunUp}</div>
          <ul className={`${toppings}`}>
            {ingredientsConstructor.toppings ? (
              ingredientsConstructor.toppings.map((topping, index) => {
                 return (
                  <li onClick={(e) => handleDeleteTopping(e,index)} key={index} className={`${topping__item}`}>
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
          <Modal heading="">
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
