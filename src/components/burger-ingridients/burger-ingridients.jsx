import React from 'react';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngridientsStyle from './burger-ingridients.module.css';
import Ingridient from '../ingridient/ingridient.jsx'


function BurgerIngridients(props) {

  const [current, setCurrent] = React.useState('bun')
  const [types, setTypes] = React.useState({'bun': 'Булки', 'sauce': 'Соусы', 'main': 'Начинки'})



  const  getIngridients = (currentType) => {
    const filterIngridient = props.ingridients.filter(el => el.type === currentType);
    return filterIngridient;

  }
 
    return (
        <>
        <section className='mt-10'> 
          <h2 className={`text text_type_main-large`}>
            Соберите бургер
          </h2>
          <div style={{ display: 'flex' }}>
            <Tab 
            value="bun"
            active={current === 'bun'} 
            onClick={()=> setCurrent('bun')}>
              Булки
            </Tab>
            <Tab 
            value="sauce" 
            active={current === 'sauce'} 
            onClick={() => setCurrent('sauce')}>
              Соусы
            </Tab>
            <Tab 
            value="main" 
            active={current === 'main'} 
            onClick={() => setCurrent('main')}>
              Начинки
            </Tab>
          </div>   
              <section className={`${burgerIngridientsStyle.ingridients__container}`}>
                {
                  Object.keys(types).map(type => {
                    return  (
                      <>
                      <h3 className={`text text_type_main-medium mt-10 mb-4`}>
                      {types[type]}
                      </h3>
                      <ul className={`${burgerIngridientsStyle.ingridients__list}`}>

                      {
                        getIngridients(type).map(el => {
                          return (
                              <Ingridient  key={el._id} dataIngridient={{id: el._id, image: el.image, name: el.name }}  />
                          )
                        })
                      }

                      </ul>

                      </>
                      )
                    })  
                } 

              </section> 
           
          </section>
          </>
    )
  
}
      
              
 
            
        

export default BurgerIngridients;