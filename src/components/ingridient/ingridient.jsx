import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import ingridientStyle from './ingridient.module.css';

export default function Ingridient(props) {

  
    return (
      <li
      className={`${ingridientStyle.ingridients__ingridient}`}>
      <Counter count={1} size="default" extraClass="m-1" />
        <img src={props.dataIngridient.image} alt="" />
          <div className={`${ingridientStyle.ingridients__icon} mb-2`}>
            <span className={`text text_type_main-medium mr-2`}>20</span>
            <CurrencyIcon type="primary" />
          </div> 
          <p className={`text text_type_main-default ${ingridientStyle.ingridients__text}`}>
            {props.dataIngridient.name}
          </p>
      </li>

    )
  

}