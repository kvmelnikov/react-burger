import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientDetailsStyles from "./ingredient-details.module.css";
import Ingridient from "../ingridient/ingridient.jsx";
import propTypes from "prop-types";

const { details__container } = ingredientDetailsStyles;

function IngridientDetails(props) {
  return (
    <div className={ingredientDetailsStyles.details__container}>
      
      Ingridient details{props._id}
    </div>
  );
}

export default IngridientDetails;
