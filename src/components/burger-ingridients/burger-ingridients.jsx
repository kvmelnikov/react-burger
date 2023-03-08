import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngridientsStyle from './burger-ingridients.module.css';
import Ingridient from '../ingridient/ingridient.jsx'
import propTypes  from 'prop-types';


function BurgerIngridients(props) {

  const [current, setCurrent] = React.useState('bun')
  const [types] = React.useState(
    {'bun': 'Булки',
     'sauce': 'Соусы',
      'main': 'Начинки'})



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
            <Tab key={0}
            value="bun"
            active={current === 'bun'} 
            onClick={()=> setCurrent('bun')}>
              Булки
            </Tab>
            <Tab key={1}
            value="sauce" 
            active={current === 'sauce'} 
            onClick={() => setCurrent('sauce')}>
              Соусы
            </Tab>
            <Tab key={2}
            value="main" 
            active={current === 'main'} 
            onClick={() => setCurrent('main')}>
              Начинки
            </Tab>
          </div>   
              <section className={`${burgerIngridientsStyle.ingridients__container}`}>
                {
                  Object.keys(types).map((type, index) => {
                    return  (
                      <div key={index}>
                      <h3  className={`text text_type_main-medium mt-10 mb-4`}>
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

                      </div>
                      )
                    })  
                } 

              </section> 
           
          </section>
          </>
    )
  
}
      
              
BurgerIngridients.propTypes = {
  ingridients: propTypes.array

}  
            
        

export default BurgerIngridients;