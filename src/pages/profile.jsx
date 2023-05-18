import {
  Input,
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../components/app-header/app-header';
import { Form } from '../components/form/form';
import { Link } from 'react-router-dom';
import StyleForm from '../components/form/form.module.css';
import mainConstructorStyle from './constructor-main.module.css';
import React, { useEffect } from 'react';
import ProfileStyle from './profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFormValue,
  getUserRequest,
  updateUserRequest,
} from '../services/actions/form-action';
const getFormData = (state) => state.form.formProfile;

export function Profile() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserRequest());
  }, []);

  const {
    inputs: {
      name: { value: nameUser },
      email: { value: email },
    },
  } = useSelector(getFormData);

  console.log(nameUser);
  const onChangeEmail = (e) => {
    dispatch(
      setFormValue({
        field: e.target.name,
        value: e.target.value,
        form: 'formProfile',
      })
    );
  };

  const onChangeName = (e) => {
    dispatch(
      setFormValue({
        field: e.target.name,
        value: e.target.value,
        form: 'formProfile',
      })
    );
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserRequest());
  };

  const onFormReset = (e) => {
    e.preventDefault();
    dispatch(getUserRequest());
  };

  return (
    <>
      <AppHeader />
      <div className={`${ProfileStyle.container} mt-30`}>
        <ul className={ProfileStyle.menu}>
          <li className={`${ProfileStyle.item} text text_type_main-medium `}>
            Профиль
          </li>
          <li
            className={`${ProfileStyle.item} text text_type_main-medium text_color_inactive`}
          >
            История заказов
          </li>
          <li
            className={`${ProfileStyle.item} text text_type_main-medium text_color_inactive`}
          >
            Выход
          </li>
        </ul>
        <form onSubmit={onFormSubmit} onReset={onFormReset} className="ml-15">
          <Input
            type="text"
            isIcon={false}
            placeholder={'Имя'}
            name={'name'}
            errorText={'Ошибка'}
            size={'default'}
            disabled={false}
            value={nameUser}
            icon={'EditIcon'}
            onChange={onChangeName}
          />
          <EmailInput
            name={'email'}
            isIcon={false}
            placeholder={'Логин'}
            extraClass="mt-6"
            disabled={false}
            value={email}
            icon={'EditIcon'}
            onChange={onChangeEmail}
          />
          <Input
            type="text"
            placeholder={'Пароль'}
            icon={'EditIcon'}
            name={'password'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mt-6"
            disabled={true}
          />
          <Button htmlType="submit" extraClass="mt-6">
            Сохранить
          </Button>
          <Button htmlType="reset" extraClass="mt-6 ml-6">
            Отмена
          </Button>
        </form>
      </div>
    </>
  );
}
