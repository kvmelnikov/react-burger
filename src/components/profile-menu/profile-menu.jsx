import { useDispatch } from 'react-redux';
import MenuStyle from './profile-menu.module.css';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  RESET_USER_FORM,
  getUserRequest,
  logoutUser,
} from '../../services/actions/form-action';

export function ProfileMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogOut = (e) => {
    dispatch(logoutUser());
  };

  return (
    <>
      <ul className={MenuStyle.menu}>
        <li className={`${MenuStyle.item} text text_type_main-medium`}>
          <NavLink
            to={'/profile'}
            className={({ isActive }) =>
              isActive
                ? `${MenuStyle.link_active} ml-2`
                : `${MenuStyle.link} ml-2`
            }
          >
            Профиль
          </NavLink>
        </li>
        <li className={`${MenuStyle.item} text text_type_main-medium`}>
          <NavLink
            to={'/profile/orders'}
            className={({ isActive }) =>
              isActive
                ? `${MenuStyle.link_active} ml-2`
                : `${MenuStyle.link} ml-2`
            }
          >
            История заказов
          </NavLink>
        </li>
        <li className={`${MenuStyle.item} text text_type_main-medium`}>
          <a
            onClick={() => {
              onLogOut();
            }}
            className={`${MenuStyle.link} ml-2`}
          >
            Выход
          </a>
        </li>
      </ul>
    </>
  );
}
