import React from "react";
import appStyle from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngridients from "../burger-ingridients/burger-ingridients.jsx";
import BurgerConstuctor from "../burger-constructor/burger-constructor.jsx";
import { mockData, mockDataForConstructor } from "../../utils/utils.js";
import Api from "../../utils/api/api.js";

const api = new Api({
  baseUrl: "https://norma.nomoreparties.space/api/ingredients",
});

function App() {
  const [selectedIngtidients, updateSelectedIngtidients] = React.useState(
    mockDataForConstructor
  );
  const [ingredients, setIngdidients] = React.useState(mockData);

  React.useEffect(() => {
    api
      .getIngridients()
      .then((data) => {
        setIngdidients(data.data);
      })
      .catch(() => setIngdidients(mockData));
  }, []);

  return (
    <div className={appStyle.body}>
      <AppHeader />
      <main className={appStyle.container}>
        <BurgerIngridients ingredients = {ingredients} />
        <BurgerConstuctor {...selectedIngtidients} />
      </main>
    </div>
  );
}

export default App;
