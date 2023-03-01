import React from 'react';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngridientsStyle from './burger-ingridients.module.css';
import Ingridient from '../ingridient/ingridient.jsx'


class BurgerIngridients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'bun',
      types:{
        'bun': 'Булки',
        'sauce': 'Соусы',
        'main': 'Начинки',
      }
    }

  }

  getIngridients = (currentType) => {
    const filterIngridient = this.props.ingridients.filter(el => el.type === currentType);
    return filterIngridient;

  }
 
  setCurrent = (current) =>{

    this.setState({
      current: current,
    })
    this.getIngridient();
  }

  render() {

    return (
        <>
        <section className='mt-10'> 
          <h2 className={`text text_type_main-large`}>
            Соберите бургер
          </h2>
          <div style={{ display: 'flex' }}>
            <Tab 
            value="bun"
            active={this.state.current === 'bun'} 
            onClick={()=> this.setCurrent('bun')}>
              Булки
            </Tab>
            <Tab 
            value="sauce" 
            active={this.state.current === 'sauce'} 
            onClick={() => this.setCurrent('sauce')}>
              Соусы
            </Tab>
            <Tab 
            value="main" 
            active={this.state.current === 'main'} 
            onClick={() => this.setCurrent('main')}>
              Начинки
            </Tab>
          </div>   
              <section className={`${burgerIngridientsStyle.ingridients__container}`}>
                {
                  Object.keys(this.state.types).map(type => {
                    return  (
                      <>
                      <h3 className={`text text_type_main-medium mt-10 mb-4`}>
                      {this.state.types[type]}
                      </h3>
                      <ul className={`${burgerIngridientsStyle.ingridients__list}`}>

                      {
                        this.getIngridients(type).map(el => {
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
}
      
              
 
            
        

export default BurgerIngridients;