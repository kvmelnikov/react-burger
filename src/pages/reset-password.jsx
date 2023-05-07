import {
  Input,
  Button,
  EmailInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../components/app-header/app-header";
import { Form } from "../components/form/form";
import { Link } from "react-router-dom";
import StyleForm from '../components/form/form.module.css'
import React from "react";


export function ResetPassword() {

  const [typePass, setTypePass] = React.useState('password')
  const [pass, setPass] = React.useState('')
  const inputRef = React.useRef(null)

  const onIconClick = () => {
    setTypePass(()=>{
      return typePass === 'password' ? 'text':  'password'
    })
  }


  const onChangePass = e => {
    setPass(e.target.value)
  }
  
  return (
    <>
    <AppHeader/>
    <Form heading='Восстановление пароля'>
    <Input 
      type={typePass}
      placeholder={'Введите новый пароль'}
      onChange={onChangePass}
      icon={'ShowIcon'}
      value={pass}
      name={'name'}
      error={false}
      ref={inputRef}
      onIconClick={onIconClick}
      errorText={'Ошибка'}
      size={'default'}
      extraClass="mt-6"/>

<Input 
      type={'text'}
      placeholder={'Введите код из письма'}
      name={'name'}
      error={false}
      errorText={'Ошибка'}
      size={'default'}
      extraClass="mt-6"/>

      <Button extraClass="mt-6">Сохранить</Button>
      <p className='text text_type_medium mt-6'>Вспомнили пароль?
        <Link  to="/login" className={`${StyleForm.Link} text text_type_medium`}> Войти</Link> 
      </p>
    </Form>
    </>
    )
}