import React from "react";
import appStyle from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngridients from "../burger-ingridients/burger-ingridients.jsx";
import BurgerConstuctor from "../burger-constructor/burger-constructor.jsx";
import { mockData, mockDataForConstructor } from "../../utils/utils.js";
import Api from "../../utils/api/api.js";
import IngridientDetails from '../ingredient-details/ingredient-details.jsx';



const body = document.querySelector('body')
const api = new Api({
  baseUrl: "https://norma.nomoreparties.space/api/ingredients",
});

function App() {
  const [selectedIngtidients, updateSelectedIngtidients] = React.useState(
    mockDataForConstructor
  );
  const [ingredients, setIngdidients] = React.useState(mockData);
  const [showModalIngridientDetails, setShowModalIngridientDetails] = React.useState(false);
  const [showModalOrderDetails, setShowModalOrderDetails] = React.useState(false);
  const [elementModal, setElementModal] = React.useState({})
 


  const hanldleOpenModalIngridientDetails = (el) =>{
    setElementModal(el)
    setShowModalIngridientDetails(true);
  }
  
  const hanldleOpenModalOrderDetails = () =>{
    setShowModalOrderDetails(true);
  }
  

  const handleCloseModal = () =>{
    setShowModalIngridientDetails(false);
    setShowModalOrderDetails(false);
    
  }

  const handleEscapeClose = (e) => {
    if(e.key === 'Escape') {
      handleCloseModal()
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscapeClose)
    
    return () => {
      document.removeEventListener('keydown', handleEscapeClose)
    }

}, [showModalIngridientDetails, showModalOrderDetails ])


  React.useEffect(() => {
    api
      .getIngridients()
      .then((data) => {
        setIngdidients(data.data);
      })
      .catch(() => setIngdidients(mockData));
  }, []);

  return (
    <>
    <div className={appStyle.body}>
      <AppHeader />
      <main className={appStyle.container}>
        <BurgerIngridients ingredients = {ingredients} handleOpenModal={hanldleOpenModalIngridientDetails} handleCloseModal={handleCloseModal} showModal={showModalIngridientDetails}  body={body}/>
        <BurgerConstuctor {...selectedIngtidients}  handleOpenModal={hanldleOpenModalOrderDetails} handleCloseModal={handleCloseModal} showModal={showModalOrderDetails}  body={body}/>
      </main>
    </div>

    </>
  );
}

export default App;
