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
import { loginUser } from '../services/actions/form-action';

const getFormData = (state) => state.form.formLogin;

export function Login() {
  const dispatch = useDispatch();

  const {
    inputs: {
      email: { value: email },
      password: { value: password },
    },
  } = useSelector(getFormData);

  const [typePass, setTypePass] = React.useState('password');

  const onChangeEmail = (e) => {
    dispatch(
      setFormValue({
        field: e.target.name,
        value: e.target.value,
        form: 'formLogin',
      })
    );
  };

  const onChangePass = (e) => {
    dispatch(
      setFormValue({
        field: e.target.name,
        value: e.target.value,
        form: 'formLogin',
      })
    );
  };

  const onIconClick = () => {
    setTypePass(() => {
      return typePass === 'password' ? 'text' : 'password';
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser());
  };

  return (
    <>
      <AppHeader />
      <form onSubmit={onFormSubmit}>
        <Form heading="Вход" name="">
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
            Войти
          </Button>

          <p className="text text_type_medium mt-20">
            Вы — новый пользователь?
            <Link
              to={`/register`}
              className={`${StyleForm.link} text text_type_medium`}
            >
              {' '}
              Зарегистрироваться
            </Link>
          </p>
          <p className="text text_type_medium mt-4">
            Забыли пароль?
            <Link
              to={`/forgot-password`}
              className={`${StyleForm.link} text text_type_medium`}
            >
              {' '}
              Восстановить пароль
            </Link>
          </p>
        </Form>
      </form>
    </>
  );
}
