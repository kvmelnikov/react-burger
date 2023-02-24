import React from 'react';
import logo from './logo.svg';
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
      <BurgerIngridients data={data} />
      <BurgerConstuctor/>
      </main>
    </div>
  );
}

export default App;
