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

export function Login() {
  const [email, setEmail] = React.useState('')

  const onChangeEmail = e => {
    setEmail(e.target.value)
  }

  const [pass, setPass] = React.useState('')
  const inputRef = React.useRef(null)
  const [typePass, setTypePass] = React.useState('password')
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
    <form name="login" action="" noValidate>
    <Form heading='Вход' name=''>
      <EmailInput 
           onChange={onChangeEmail}
           value={email}
           name={'email'}
           isIcon={false}
            extraClass="mt-6"/>
      <Input 
      type={typePass}
      placeholder={'placeholder'}
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
      
      <Button extraClass="mt-6">Войти</Button>
    
      <p className='text text_type_medium mt-20'>Вы — новый пользователь? 
        <Link to={`/register`} className={`${StyleForm.link} text text_type_medium`}> Зарегистрироваться</Link> 
      </p>
      <p className='text text_type_medium mt-4'>Забыли пароль?
       <Link to={`/forgot-password`} className={`${StyleForm.link} text text_type_medium`}> Восстановить пароль</Link>
       </p>
    </Form>
    </form>
    </>
    )
}