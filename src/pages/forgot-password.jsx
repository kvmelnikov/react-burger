import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../components/app-header/app-header";
import { Form } from "../components/form/form";
import { Link, Navigate } from "react-router-dom";
import StyleForm from "../components/form/form.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setFormValue } from "../services/actions/form-action";
import { forgotPassRequest } from "../services/actions/form-action";

import React from "react";
const getFormData = (state) => state.form.formForgotPassword;
const getFormProfile = (state) => state.form.formProfile;

export function ForgotPassword() {
  const dispatch = useDispatch();
  const {
    inputs: {
      email: { value },
    },
  } = useSelector(getFormData);

  const {
    inputs: {
      name: { value: nameUser },
    },
  } = useSelector(getFormProfile);

  React.useEffect(() => {}, []);

  const onFormChange = (e) => {
    dispatch(
      setFormValue({
        field: e.target.name,
        value: e.target.value,
        form: "formForgotPassword",
      })
    );
  };

  const onFormSubmit = (e) => {
    // Предотвращаем дефолтное поведение формы при её отправке
    e.preventDefault();
    // Вызываем наш thunk-экшен
    dispatch(forgotPassRequest());
  };

  if (nameUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <AppHeader />
      <form onSubmit={onFormSubmit}>
        <Form heading="Восстановление пароля">
          <EmailInput
            name={"email"}
            isIcon={false}
            placeholder={"Укажите e-mail"}
            extraClass="mt-6"
            value={value}
            onChange={onFormChange}
          />
          <Button htmlType="submit" extraClass="mt-6">
            Восстановить
          </Button>

          <p className="text text_type_medium mt-6">
            Вспомнили пароль?
            <Link
              to="/login"
              className={`${StyleForm.Link} text text_type_medium`}
            >
              {" "}
              Войти
            </Link>
          </p>
        </Form>
      </form>
    </>
  );
}
