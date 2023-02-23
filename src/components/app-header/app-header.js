import React from 'react';
import { Logo, BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import headerStyle from './app-header.module.css';
import { render } from '@testing-library/react';


class AppHeader extends React.Component {
  render() {
    return (
      <>
      <header className={headerStyle.header}>
        <nav className={`p-1 ${headerStyle.header__nav} mt-10`}>
        <ul className={headerStyle.header__icons}>       
            <li className={`text text_type_main-default ${headerStyle.header__icon}`}>
            <BurgerIcon type="primary"/>
              <span className={`ml-2 mr-10`}>Конструктор</span>
            </li> 
            <li className={`text text_type_main-default text_color_inactive ${headerStyle.header__icon}`}>
            <ListIcon type="secondary" />
            <span className={`ml-2`}>Лента заказов</span>
            </li> 
          </ul>
          <a className={`${headerStyle.header__logo} pt-6 pb-6`}  href='#'>
              <Logo/>
          </a>
          <ul className={`${headerStyle.header__icons} ${headerStyle.header__icons_type_user}`}>
          <il className={`text text_type_main-default text_color_inactive ${headerStyle.header__icon}`}>
            <ProfileIcon type="secondary" />
            <span className={`ml-2`}>Личный кабинет</span>
          </il>
          </ul>  

        </nav>
        {/* <nav className={`p-1 ${headerStyle.header} mt-10`}> 
          <ul className={headerStyle.header__icons}>       
            <li className={`text text_type_main-default ${headerStyle.header_icon}`}>
            <BurgerIcon type="primary"/>
              <span className={`ml-2 mr-10`}>Конструктор</span>
            </li> 
            <li className={`text text_type_main-default`}>
            <ListIcon type="secondary" />
            <span className={`ml-2`}>Лента заказов</span>
            </li> 
          </ul>
       

        </nav> */}
      </header>
      </>
    )
  }
}

export default AppHeader;