import { Input, Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import AppHeader from '../components/app-header/app-header'
import { Form } from '../components/form/form'
import StyleForm from '../components/form/form.module.css'
import React from 'react'
// import { useSelector, useDispatch } from "react-redux";
import { setFormValueRegister } from '../services/forms/forms-slice'
// import { registrationUser } from "../services/actions/form-action";
import { Link, Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../utils/hooks/hook'
import { getUserRequest } from '../services/forms/forms-thunks'

// const getFormData = (state) => state.form.;
// const getFormProfile = (state) => state.form.formProfile;

export function Register() {
  const dispatch = useAppDispatch()

  const {
    inputs: {
      email: { value: email },
      password: { value: password },
      name: { value: name },
    },
  } = useAppSelector((state) => state.form.formRegister)

  // const {
  //   inputs: {
  //     name: { value: nameUser },
  //   },
  // } = useAppSelector(getFormProfile);

  const [typePass, setTypePass] = React.useState<'password' | 'text'>('password')

  const onIconClick = () => {
    setTypePass(() => {
      return typePass === 'password' ? 'text' : 'password'
    })
  }

  const onChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    dispatch(
      setFormValueRegister({
        field: target.name,
        value: target.value,
        form: 'formRegister',
      }),
    )
  }

  const onChangePass = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    dispatch(
      setFormValueRegister({
        field: target.name,
        value: target.value,
        form: 'formRegister',
      }),
    )
  }

  const onChangeName = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    dispatch(
      setFormValueRegister({
        field: target.name,
        value: target.value,
        form: 'formRegister',
      }),
    )
  }

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(getUserRequest())
  }

  // if (nameUser) {
  //   return <Navigate to="/" replace />;
  // }

  return (
    <>
      <AppHeader />
      <form onSubmit={onFormSubmit}>
        <Form heading='Регистрация'>
          <Input
            type={'text'}
            placeholder={'Имя'}
            name={'name'}
            value={name}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass='mt-6'
            onChange={onChangeName}
          />
          <EmailInput onChange={onChangeEmail} value={email} name={'email'} isIcon={false} extraClass='mt-6' />

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
            extraClass='mt-6'
          />
          <Button htmlType='submit' extraClass='mt-6'>
            Зарегистрироваться
          </Button>
          <p className='text text_type_medium mt-20'>
            Уже зарегистрированы?
            <Link to={`/login`} className={`${StyleForm.link} text text_type_medium`}>
              Войти
            </Link>
          </p>
        </Form>
      </form>
    </>
  )
}
