import React from 'react';
import appStyle from './app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngridients from '../burger-ingridients/burger-ingridients.jsx';
import BurgerConstuctor from '../burger-constructor/burger-constructor.jsx'
import {data} from '../utils/utils.js';

const dataForConstructor = {
  bun: 
  { 
    name:  data[0].name,
    image:  data[0].image,
    price:  data[0].price
  },
  toppings: 
  [
    {
    name:  data[1].name,
    image:  data[1].image,
    price:  data[1].price 
  },
  {
    name:  data[2].name,
    image:  data[2].image,
    price:  data[2].price 
  },
  {
    name:  data[3].name,
    image:  data[3].image,
    price:  data[3].price 
  },
  {
    name:  data[4].name,
    image:  data[4].image,
    price:  data[4].price 
  },
  {
    name:  data[3].name,
    image:  data[3].image,
    price:  data[3].price 
  },
  ]
}

function App() {  

  const [selectedIngtidients, UpdateSelectedIngtidients] = React.useState(dataForConstructor)

  return (
    <div className={appStyle.body}>
      <AppHeader/>
      <main className={appStyle.container}>
      <BurgerIngridients ingridients ={data} />
      <BurgerConstuctor {...selectedIngtidients}/>
      </main>
    </div>
  );
}

export default App;
