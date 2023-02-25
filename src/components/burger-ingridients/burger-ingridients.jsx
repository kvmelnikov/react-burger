import React from 'react';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngridientsStyle from './burger-ingridients.module.css';
import { render } from '@testing-library/react';



class BurgerIngridients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'bun',
      types:{
        'bun': 'Булки',
        'main': 'Начинки',
        'sauce': 'Соусы'
      }
    }


  }

 
  setCurrent = (current) =>{
    this.setState({
      current: current,
    })
  }

  render() {

    return (
        <>
        <section className='mt-10'> 
          <h2 className={`text text_type_main-large`}>
            Соберите бургер
          </h2>
          <div style={{ display: 'flex' }}>
            <Tab value="bun" active={this.state.current === 'bun'} onClick={()=> this.setCurrent('bun')}>
              Булки
            </Tab>
            <Tab value="sauce" active={this.state.current === 'sauce'} onClick={() => this.setCurrent('sauce')}>
              Соусы
            </Tab>
            <Tab value="main" active={this.state.current === 'main'} onClick={() => this.setCurrent('main')}>
              Начинки
            </Tab>
          </div>
          { Object.keys(this.state.types).map((t) => {
            return (
              <>
              <h3 className={`text text_type_main-medium mt-10 mb-4`}>
              {this.state.types[t]}
              </h3>
              <section className={`${burgerIngridientsStyle.ingridients}`}>
              {this.props.data.map((el)=>{
                return (
                    <article className={`${burgerIngridientsStyle.ingridients__ingridient}`}>
                     <Counter count={1} size="default" extraClass="m-1" />
                      <img src={el.image} alt="" />
                        <div className={`${burgerIngridientsStyle.ingridients__icon} mb-2`}>
                          <span className={`text text_type_main-medium mr-2`}>20</span>
                          <CurrencyIcon type="primary" />
                        </div> 
                        <p className={`text text_type_main-default ${burgerIngridientsStyle.ingridients__text}`}>
                          Краторная булка N-200i
                        </p>
                   </article>
                )
              })}
              </section>
              </>
            )
          })}

          </section>
          </>

    )
  }
}
      
              
 
            
        

export default BurgerIngridients;