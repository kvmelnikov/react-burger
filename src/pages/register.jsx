import {
  Input,
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../components/app-header/app-header';
import { Form } from '../components/form/form';
import { Link } from 'react-router-dom';
import StyleForm from '../components/form/form.module.css';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFormValue } from '../services/actions/form-action';
import { registrationUser } from '../services/actions/form-action';

const getFormData = (state) => state.form.formRegister;

export function Register() {
  const dispatch = useDispatch();

  const {
    inputs: {
      email: { value: email },
      password: { value: password },
      name: { value: name },
    },
  } = useSelector(getFormData);

  const [typePass, setTypePass] = React.useState('password');

  const onIconClick = () => {
    setTypePass(() => {
      return typePass === 'password' ? 'text' : 'password';
    });
  };

  const onChangeEmail = (e) => {
    dispatch(
      setFormValue({
        field: e.target.name,
        value: e.target.value,
        form: 'formRegister',
      })
    );
  };

  const onChangePass = (e) => {
    dispatch(
      setFormValue({
        field: e.target.name,
        value: e.target.value,
        form: 'formRegister',
      })
    );
  };

  const onChangeName = (e) => {
    dispatch(
      setFormValue({
        field: e.target.name,
        value: e.target.value,
        form: 'formRegister',
      })
    );
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(registrationUser());
  };

  return (
    <>
      <AppHeader />
      <form onSubmit={onFormSubmit}>
        <Form heading="Регистрация">
          <Input
            type={'text'}
            placeholder={'Имя'}
            name={'name'}
            value={name}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mt-6"
            onChange={onChangeName}
          />
          <EmailInput
            onChange={onChangeEmail}
            value={email}
            name={'email'}
            isIcon={false}
            extraClass="mt-6"
          />

          <Input
            type={typePass}
            placeholder={'placeholder'}
            onChange={onChangePass}
            icon={'ShowIcon'}
            value={password}
            name={'password'}
            error={false}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mt-6"
          />
          <Button htmlType="submit" extraClass="mt-6">
            Зарегистрироваться
          </Button>
          <p className="text text_type_medium mt-20">
            Уже зарегистрированы?
            <Link
              to={`/login`}
              className={`${StyleForm.link} text text_type_medium`}
            >
              {' '}
              Войти
            </Link>
          </p>
        </Form>
      </form>
    </>
  );
}
