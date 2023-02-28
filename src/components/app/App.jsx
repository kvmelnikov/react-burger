import React from 'react';
import appStyle from './app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngridients from '../burger-ingridients/burger-ingridients.jsx';
import BurgerConstuctor from '../burger-constructor/burger-constructor.jsx'
import {data} from '../utils/utils.js';

function App() {
  return (
    <div className={appStyle.body}>
      <AppHeader/>
      <main className={appStyle.container}>
      <BurgerIngridients ingridients ={data} />
      <BurgerConstuctor data={data}/>
      </main>
    </div>
  );
}

export default App;
