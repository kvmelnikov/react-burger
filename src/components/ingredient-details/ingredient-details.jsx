import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientDetailsStyles from "./ingredient-details.module.css";
import Ingridient from "../ingridient/ingridient.jsx";
import propTypes from "prop-types";

const { details__container } = ingredientDetailsStyles;

function IngridientDetails(props) {
  return (
    <div className={ingredientDetailsStyles.details__container}>
      <img src={props.image_large} alt={props.name} />
      <p className="text text_type_main-medium mt-4 mb-8">{props.name}</p>
      <div className={`${ingredientDetailsStyles.nutritionals} mb-15`}>
        <div className={ingredientDetailsStyles.element_nutritional}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Калории,ккал
          </p>
          <p
            className={`text text_type_main-default text_color_inactive ${ingredientDetailsStyles.element_nutritional_digits}`}
          >
            {props.calories}
          </p>
        </div>
        <div className={ingredientDetailsStyles.element_nutritional}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </p>
          <p  className={`text text_type_main-default text_color_inactive ${ingredientDetailsStyles.element_nutritional_digits}`}>
            {props.proteins}
          </p>
        </div>
        <div className={ingredientDetailsStyles.element_nutritional}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </p>
          <p  className={`text text_type_main-default text_color_inactive ${ingredientDetailsStyles.element_nutritional_digits}`}>
            {props.fat}
          </p>
        </div>
        <div className={ingredientDetailsStyles.element_nutritional}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </p>
          <p  className={`text text_type_main-default text_color_inactive ${ingredientDetailsStyles.element_nutritional_digits}`}>
            {props.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
}

export default IngridientDetails;
