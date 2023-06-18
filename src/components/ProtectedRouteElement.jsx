import { Navigate } from "react-router-dom";
import { Route } from "react-router-dom";
import { getUserRequest, updateToken } from "../services/actions/form-action";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getCookie, setCookie } from "../utils/cookie";
import Api from "../utils/api/api";

const getFormData = (state) => state.form.formProfile;

export const ProtectedRouteElement = ({ element }) => {
  const dispatch = useDispatch();

  const {
    inputs: {
      name: { value: nameUser },
    },
    request,
    failed,
  } = useSelector(getFormData);

  if (request) {
    return <p>Загрузка...</p>;
  }

  if (failed) {
    return <Navigate to="/login" />;
  }

  return nameUser ? element : <Navigate to="/login" replace />;
};
