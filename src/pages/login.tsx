import { Input, Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import AppHeader from '../components/app-header/app-header'
import { Form } from '../components/form/form'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import StyleForm from '../components/form/form.module.css'
import React, { useEffect } from 'react'

// import { getUserRequest, setFormValue, updateUserRequest } from '../services/actions/form-action'

import { useAppDispatch, useAppSelector } from '../utils/hooks/hook'
import { setFormValueLogin } from '../services/forms/forms-slice'
import { loginUserRequest } from '../services/forms/forms-thunks'

// const getFormData = (state) => state.form.formLogin
// const getFormProfile = (state) => state.form.formProfile

export function Login() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  const {
    inputs: {
      email: { value: email },
      password: { value: password },
    },
    request,
    failed,
  } = useAppSelector((state) => state.form.formLogin)

  // const {
  //   inputs: {
  //     name: { value: nameUser },
  //   },
  // } = useAppSelector((state)=> state.form.formProfile)

  const [typePass, setTypePass] = React.useState<'text' | 'password'>('password')

  const onChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLButtonElement
    dispatch(
      setFormValueLogin({
        field: target.name,
        value: target.value,
        form: 'formLogin',
      }),
    )
  }

  const onChangePass = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLButtonElement
    dispatch(
      setFormValueLogin({
        field: target.name,
        value: target.value,
        form: 'formLogin',
      }),
    )
  }

  const onIconClick = () => {
    setTypePass(() => {
      return typePass === 'password' ? 'text' : 'password'
    })
  }

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(loginUserRequest())
    if (!request && !failed) {
      navigate(from, { replace: true })
    }
  }

  return (
    <>
      <AppHeader />
      <form onSubmit={onFormSubmit}>
        <Form heading='Вход'>
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
            Войти
          </Button>

          <p className='text text_type_medium mt-20'>
            Вы — новый пользователь?
            <Link to={`/register`} className={`${StyleForm.link} text text_type_medium`}>
              Зарегистрироваться
            </Link>
          </p>
          <p className='text text_type_medium mt-4'>
            Забыли пароль?
            <Link to={`/forgot-password`} className={`${StyleForm.link} text text_type_medium`}>
              Восстановить пароль
            </Link>
          </p>
        </Form>
      </form>
    </>
  )
}
