import { useEffect } from "react";
import IngridientDetails from "../components/ingredient-details/ingredient-details";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getIngredients } from "../services/actions/api-action";

export function DetailPageIngredient() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  useEffect(() => {
    if (path !== "/") {
      dispatch(getIngredients(path.split("/")[2]));
    }
  }, [path]);

  const ingredientDataForModal = useSelector(
    (state) => state.ingredients.currentIngridient
  );

  return <IngridientDetails {...ingredientDataForModal} />;
}
