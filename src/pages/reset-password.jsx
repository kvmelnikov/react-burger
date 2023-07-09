import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../components/app-header/app-header";
import { Form } from "../components/form/form";
import { Link, Navigate } from "react-router-dom";

import StyleForm from "../components/form/form.module.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFormValue } from "../services/actions/form-action";
import { resetPassRequest } from "../services/actions/form-action";

const getFormData = (state) => state.form.formResetPassword;
const getFormProfile = (state) => state.form.formProfile;

export function ResetPassword() {
  const dispatch = useDispatch();

  const {
    inputs: {
      password: { value: pass },
      token: { value: token },
    },
  } = useSelector(getFormData);

  const {
    inputs: {
      name: { value: nameUser },
    },
  } = useSelector(getFormProfile);

  const [typePass, setTypePass] = React.useState("password");

  const onIconClick = () => {
    setTypePass(() => {
      return typePass === "password" ? "text" : "password";
    });
  };

  const onChangePass = (e) => {
    dispatch(
      setFormValue({
        field: e.target.name,
        value: e.target.value,
        form: "formResetPassword",
      })
    );
  };

  const onChangeToken = (e) => {
    dispatch(
      setFormValue({
        field: e.target.name,
        value: e.target.value,
        form: "formResetPassword",
      })
    );
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassRequest());
  };

  if (nameUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <AppHeader />
      <form onSubmit={onFormSubmit}>
        <Form heading="Восстановление пароля">
          <Input
            type={typePass}
            placeholder={"Введите новый пароль"}
            onChange={onChangePass}
            icon={"ShowIcon"}
            value={pass}
            name={"password"}
            error={false}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mt-6"
          />

          <Input
            type={"text"}
            onChange={onChangeToken}
            placeholder={"Введите код из письма"}
            name={"token"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mt-6"
            value={token}
          />

          <Button htmlType="submit" extraClass="mt-6">
            Сохранить
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
