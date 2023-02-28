import React from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorStyle from './burger-constructor.module.css';
import { render } from '@testing-library/react';


class BurgerConstructor extends React.Component {
  
  getBun = () =>{
      const filterBun = this.props.data.filter(el => el.type === 'bun')
      console.log(filterBun[0])
  }

  render() {
    return (
      <section>
       <section className={`${burgerConstructorStyle.container} mt-20 p-5`}>
          <div className={`${burgerConstructorStyle.bun} ml-8 mr-2`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={"https://code.s3.yandex.net/react/code/bun-02-mobile.png"}
          />
          </div >
          <ul className={`${burgerConstructorStyle.toppings}`}>
            <li className={`${burgerConstructorStyle.topping__item}`}>
            <DragIcon type="primary" />
            <ConstructorElement
            text="Говяжий Vf (отбивная)"
            price={50}
            thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
          />

            </li>
            <li className={`${burgerConstructorStyle.topping__item}`}>
            <DragIcon type="primary" />
            <ConstructorElement
            text="Говяжий Vf (отбивная)"
            price={50}
            thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
          />
            </li>
            <li className={`${burgerConstructorStyle.topping__item}`}>
            <DragIcon type="primary" />
            <ConstructorElement
            text="Говяжий Vf (отбивная)"
            price={50}
            thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
          />
            </li>
            <li className={`${burgerConstructorStyle.topping__item}`}>
            <DragIcon type="primary" />
            <ConstructorElement
            text="Говяжий Vf (отбивная)"
            price={50}
            thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
          />
            </li>
            <li className={`${burgerConstructorStyle.topping__item}`}>
            <DragIcon type="primary" />
            <ConstructorElement
            text="Говяжий Vf (отбивная)"
            price={50}
            thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
          />
            </li>
           
          </ul>
          <div className={`${burgerConstructorStyle.bun} ml-8 mr-2`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={"https://code.s3.yandex.net/react/code/bun-02-mobile.png"}
          />
          </div>
        </section>
          <div className={`${burgerConstructorStyle.info} mt-5`}>
            <p className="text text_type_digits-medium mr-2">610</p>
            <CurrencyIcon  type="primary" />
            <Button extraClass='ml-10' htmlType="button" type="primary" size="large">
               Оформить заказ
            </Button>
          </div>
          
        </section> 
       
    )
  }
}

export default BurgerConstructor;