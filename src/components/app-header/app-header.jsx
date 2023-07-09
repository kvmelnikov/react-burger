import React from 'react';
import {
  Logo,
  BurgerIcon,
  ProfileIcon,
  ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyle from './app-header.module.css';
import { render } from '@testing-library/react';
import { Link, NavLink } from 'react-router-dom';
const {
  header,
  header__nav,
  header__logo,
  header__icons,
  header__icons_type_user,
  header__icon,
} = headerStyle;

function AppHeader() {
  return (
    <header className={header}>
      <nav className={`p-1 ${header__nav} mt-10`}>
        <ul className={header__icons}>
          <li className={`text text_type_main-default ${header__icon}`}>
            <BurgerIcon type="primary" />
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `${headerStyle.link_active} ml-2 mr-10`
                  : `${headerStyle.link} ml-2 mr-10`
              }
            >
              Конструктор
            </NavLink>
          </li>
          <li
            className={`text text_type_main-default text_color_inactive ${header__icon}`}
          >
            <ListIcon type="secondary" />
            <NavLink
              to="/feed"
              className={({ isActive }) =>
                isActive
                  ? `${headerStyle.link_active} ml-2`
                  : `${headerStyle.link} ml-2`
              }
            >
              Лента заказов
            </NavLink>
          </li>
        </ul>
        <NavLink to="/" className={`${header__logo} pt-6 pb-6`} href="#">
          <Logo />
        </NavLink>
        <ul className={`${header__icons} ${header__icons_type_user}`}>
          <li
            className={`text text_type_main-default text_color_inactive ${header__icon}`}
          >
            <ProfileIcon type="secondary" />
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? `${headerStyle.link_active} ml-2`
                  : `${headerStyle.link} ml-2`
              }
            >
              Личный кабинет
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
