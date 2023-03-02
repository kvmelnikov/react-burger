import React from 'react';
import appStyle from './app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngridients from '../burger-ingridients/burger-ingridients.jsx';
import BurgerConstuctor from '../burger-constructor/burger-constructor.jsx'
import {data} from '../utils/utils.js';

function App() {  
  const[items, setCart] = React.useState([]);
  


  function handleAddItem(id_item, index){
    setCart([...items, data.filter((el) => {return el._id === id_item})[0]].index = index)
  }

  function handleDeleteItem(index){
    setCart(
      items.filter((el)=> {return el.index === index})
    )
  }



  return (
    <div className={appStyle.body}>
      <button onClick={() => handleAddItem('60666c42cc7b410027a1a9b1')}>булка</button>
      <button onClick={() => handleAddItem('60666c42cc7b410027a1a9b5')}>метеорит</button>
      
      {items.map((el, index)=>{
       return(<div key={index}>{el.name}
       <button onClick={() => handleDeleteItem(index)}>уалить</button>
       </div>) 
      })}
      <AppHeader/>
      <main className={appStyle.container}>
      <BurgerIngridients ingridients ={data} />
      <BurgerConstuctor data={data}/>
      </main>
    </div>
  );
}

export default App;
