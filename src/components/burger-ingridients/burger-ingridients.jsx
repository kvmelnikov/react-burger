import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngridientsStyle from './burger-ingridients.module.css';
import { render } from '@testing-library/react';



class BurgerIngridients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'bun'
    }
  }

 
  setCurrent = (current) =>{
    this.setState({
      current: current,
    })
  }

  render() {
    console.log(this.props)
    return (
        <section className='mt-10'> 
          <h1 className={`text text_type_main-large`}>
            Соберите бургер
          </h1>
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
          
        </section>
    )
  }
}

export default BurgerIngridients;