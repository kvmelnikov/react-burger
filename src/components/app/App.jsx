import React from 'react';
import appStyle from './app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngridients from '../burger-ingridients/burger-ingridients.jsx';
import BurgerConstuctor from '../burger-constructor/burger-constructor.jsx'
import {mockData} from '../utils/utils.js';
import Api from '../api/api.js';

const api = new Api({
  baseUrl: 'https://norma.nomoreparties.space/api/ingredients',
})


const dataForConstructor = {
  bun: 
  { 
    name:  mockData[0].name,
    image:  mockData[0].image,
    price:  mockData[0].price
  },
  
  toppings: 
  [
    {
    name:  mockData[1].name,
    image:  mockData[1].image,
    price:  mockData[1].price 
  },
  {
    name:  mockData[2].name,
    image:  mockData[2].image,
    price:  mockData[2].price 
  },
  {
    name:  mockData[3].name,
    image:  mockData[3].image,
    price:  mockData[3].price 
  },
  {
    name:  mockData[4].name,
    image:  mockData[4].image,
    price:  mockData[4].price 
  },
  {
    name:  mockData[3].name,
    image:  mockData[3].image,
    price:  mockData[3].price 
  },
  ]
}

function App() {  

  const [selectedIngtidients, updateSelectedIngtidients] = React.useState(dataForConstructor);
  const [ingredients, setIngdidients] = React.useState(mockData);


  React.useEffect(()=>{
    api.getIngridients()
      .then((data)=>{setIngdidients(data.data)})
      .catch(setIngdidients(mockData))
  },[])

  return (
    <div className={appStyle.body}>
      <AppHeader/>
      <main className={appStyle.container}>
      <BurgerIngridients ingridients ={ingredients} />
      <BurgerConstuctor {...selectedIngtidients}/>
      </main>
    </div>
  );
}

export default App;
