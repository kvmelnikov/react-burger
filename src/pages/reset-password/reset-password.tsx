import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import AppHeader from '../../components/app-header/app-header'
import { Form } from '../../components/form/form'
import { Link, Navigate } from 'react-router-dom'
import StyleForm from '../../components/form/form.module.css'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/hook'
import { resetPassRequest } from '../../services/forms/forms-thunks'
import { setformResetPassword } from '../../services/forms/forms-slice'

export function ResetPassword() {
  const dispatch = useAppDispatch()

  const {
    inputs: {
      password: { value: password },
      token: { value: token },
    },
  } = useAppSelector((state) => state.form.formResetPassword)

  const {
    inputs: {
      name: { value: nameUser },
    },
  } = useAppSelector((state) => state.form.formProfile)
  const [typePass, setTypePass] = React.useState<'password' | 'text'>('password')

  const onIconClick = () => {
    setTypePass(() => {
      return typePass === 'password' ? 'text' : 'password'
    })
  }

  const onChangePass = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    dispatch(
      setformResetPassword({
        field: target.name,
        value: target.value,
        form: 'formResetPassword',
      }),
    )
  }

  const onChangeToken = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement

    dispatch(
      setformResetPassword({
        field: target.name,
        value: target.value,
        form: 'formResetPassword',
      }),
    )
  }

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(resetPassRequest())
  }

  if (nameUser) {
    return <Navigate to='/' replace />
  }

  return (
    <>
      <AppHeader />
      <form onSubmit={onFormSubmit}>
        <Form heading='Восстановление пароля'>
          <Input
            type={typePass}
            placeholder={'Введите новый пароль'}
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

          <Input
            type={'text'}
            onChange={onChangeToken}
            placeholder={'Введите код из письма'}
            name={'token'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass='mt-6'
            value={token}
          />

          <Button htmlType='submit' extraClass='mt-6'>
            Сохранить
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
