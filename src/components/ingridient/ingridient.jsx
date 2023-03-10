import React from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingridientStyle from "./ingridient.module.css";
import propTypes from "prop-types";

const { ingridients__ingridient, ingridients__icon, ingridients__text } =
  ingridientStyle;

export default function Ingridient(props) {
  return (
    <li className={`${ingridients__ingridient}`}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img src={props.image} alt={props.name} />
      <div className={`${ingridients__icon} mb-2`}>
        <span className={`text text_type_main-medium mr-2`}>20</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${ingridients__text}`}>
        {props.name}
      </p>
    </li>
  );
}

Ingridient.propTypes = {
  image: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
};
