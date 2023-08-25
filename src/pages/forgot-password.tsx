import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import AppHeader from '../components/app-header/app-header'
import { Form } from '../components/form/form'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import StyleForm from '../components/form/form.module.css'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../utils/hooks/hook'
import { setformForgotPassword } from '../services/forms/forms-slice'
import { forgotPassRequest } from '../services/forms/forms-thunks'

export function ForgotPassword() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {
    inputs: {
      email: { value },
    },
    request,
    failed,
    redirect,
  } = useAppSelector((state) => state.form.formForgotPassword)

  const {
    inputs: {
      name: { value: nameUser },
    },
  } = useAppSelector((state) => state.form.formProfile)

  React.useEffect(() => {
    console.log(redirect)
    if (redirect) {
      navigate('/reset-password')
    }
  }, [redirect])

  const onFormChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    dispatch(
      setformForgotPassword({
        field: target.name,
        value: target.value,
        form: 'formForgotPassword',
      }),
    )
  }

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(forgotPassRequest())
  }

  if (nameUser) {
    return <Navigate to='/' replace />
  }

  return (
    <>
      <AppHeader />
      <form onSubmit={onFormSubmit}>
        <Form heading='Восстановление пароля'>
          <EmailInput
            name={'email'}
            isIcon={false}
            placeholder={'Укажите e-mail'}
            extraClass='mt-6'
            value={value}
            onChange={onFormChange}
          />
          <Button htmlType='submit' extraClass='mt-6'>
            Восстановить
          </Button>

          <p className='text text_type_medium mt-6'>
            Вспомнили пароль?
            <Link to='/login' className={`${StyleForm.Link} text text_type_medium`}>
              {' '}
              Войти
            </Link>
          </p>
        </Form>
      </form>
    </>
  )
}
