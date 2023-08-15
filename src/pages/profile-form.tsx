import { Input, Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import AppHeader from '../components/app-header/app-header'
import { Form } from '../components/form/form'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import StyleForm from '../components/form/form.module.css'
import mainConstructorStyle from './constructor-main.module.css'
import React, { useEffect } from 'react'
import ProfileStyle from './profile.module.css'

// import { setFormValue, updateUserRequest } from '../services/actions/form-action'
import { getCookie } from '../utils/cookie'
import { useAppDispatch, useAppSelector } from '../utils/hooks/hook'
import { stat } from 'fs'
import { getUserRequest } from '../services/forms/forms-thunks'
import { setFormValueProfile } from '../services/forms/forms-slice'

export const ProfileForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    inputs: {
      name: { value: nameUser },
      email: { value: email },
      password: { value: pass },
    },
  } = useAppSelector((state) => state.form.formProfile)

  const onChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    dispatch(
      setFormValueProfile({
        field: target.name,
        value: target.value,
        form: 'formProfile',
      }),
    )
  }

  const onChangeName = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    dispatch(
      setFormValueProfile({
        field: target.name,
        value: target.value,
        form: 'formProfile',
      }),
    )
  }
  const onChangePass = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    dispatch(
      setFormValueProfile({
        field: target.name,
        value: target.value,
        form: 'formProfile',
      }),
    )
  }

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // dispatch(updateUserRequest())
    dispatch(getUserRequest())
  }

  const onFormReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(getUserRequest())
  }

  return (
    <>
      <div>
        <form onSubmit={onFormSubmit} onReset={onFormReset} className='ml-15'>
          <Input
            type='text'
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
            placeholder={'Логин'}
            extraClass='mt-6'
            disabled={false}
            value={email}
            // icon={'EditIcon'}
            onChange={onChangeEmail}
          />
          <Input
            type='text'
            placeholder={'Пароль'}
            icon={'EditIcon'}
            name={'pass'}
            value={pass}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass='mt-6'
            disabled={false}
            onChange={onChangePass}
          />
          <Button htmlType='submit' extraClass='mt-6'>
            Сохранить
          </Button>
          <Button htmlType='reset' extraClass='mt-6 ml-6'>
            Отмена
          </Button>
        </form>
      </div>
    </>
  )
}
