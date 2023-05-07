import {
  Input,
  Button,
  EmailInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../components/app-header/app-header";
import { Form } from "../components/form/form";
import { Link } from "react-router-dom";
import StyleForm from '../components/form/form.module.css'

export function ForgotPassword() {
  return (
    <>
    <AppHeader/>
    
    <Form heading='Восстановление пароля'>
      <form>
    <EmailInput 
           name={'email'}
           isIcon={false}
           placeholder={'Укажите e-mail'}
            extraClass="mt-6"/>
      <Button extraClass="mt-6">Восстановить</Button>
      </form>
      <p className='text text_type_medium mt-6'>Вспомнили пароль?
        <Link  to="/login" className={`${StyleForm.Link} text text_type_medium`}> Войти</Link> 
      </p>
    </Form>
    </>
    )
}