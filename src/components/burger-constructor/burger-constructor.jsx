import React from 'react';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyle from './burger-constructor.module.css';
import Modal from '../modal/modal';
import Topping from '../topping/topping';
import OrderDetails from '../order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { getOrderNumber } from '../../services/actions/api-action';
import {
  ADD_BUN_TO_BURGER_CONSTRUCTOR,
  ADD_TOPPING_TO_BURGER_CONSTRUCTOR,
} from '../../services/actions/burger-action';
import {
  INCREASE_COUNTER_INGREDIENT,
  DECREASE_COUNTER_INGREDIENT,
} from '../../services/actions/ingridients-action';
import { v4 as uuidv4 } from 'uuid';

const { container, bun, toppings, info } = burgerConstructorStyle;

function BurgerConstructor() {
  const dispatch = useDispatch();
  const numberOrder = useSelector((state) => state.burger.numberOrder);

  const showModalOrderDetails = useSelector(
    (state) => state.modal.showModalOrderDetails
  );
  const ingredientsConstructor = useSelector(
    (state) => state.burger.ingridientsForConstructor
  );

  const [, drop] = useDrop({
    accept: 'ingridient',

    drop(ingredient) {
      if (ingredient[0].type === 'bun') {
        dispatch({ type: ADD_BUN_TO_BURGER_CONSTRUCTOR, bun: ingredient[0] });
        dispatch({ type: INCREASE_COUNTER_INGREDIENT, id: ingredient[0]._id });

        if (ingredientsConstructor.bun._id) {
          dispatch({
            type: DECREASE_COUNTER_INGREDIENT,
            id: ingredientsConstructor.bun._id,
          });
        }
      } else {
        dispatch({
          type: ADD_TOPPING_TO_BURGER_CONSTRUCTOR,
          topping: ingredient[0],
        });
        dispatch({ type: INCREASE_COUNTER_INGREDIENT, id: ingredient[0]._id });
      }
    },
  });

  function calculateAmount() {
    if (
      Object.keys(ingredientsConstructor.bun).length === 0 &&
      Object.keys(ingredientsConstructor.toppings).length === 0
    ) {
      return '0';
    } else {
      const summToppings = ingredientsConstructor.toppings.reduce(
        (accumulator, next) => {
          return accumulator + Number(next.price);
        },
        0
      );
      const priceBun = Number(ingredientsConstructor.bun.price)
        ? Number(ingredientsConstructor.bun.price)
        : 0;
      return summToppings + priceBun;
    }
  }

  const [summBurger, setSummBurger] = React.useReducer(calculateAmount, 0);

  const hanldleOpenModalOrderDetails = () => {
    dispatch(getOrderNumber(ingredientsConstructor));
  };

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
        price={ingredientsConstructor.bun.price / 2}
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
                  <Topping
                    key={uuidv4()}
                    item={topping}
                    index={index}
                    {...topping}
                  />
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
            disabled={ingredientsConstructor.bun.name ? false : true}
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

export default BurgerConstructor;
