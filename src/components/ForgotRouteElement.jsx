import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const getFormData = (state) => state.form.formForgotPassword;

export function ForgotRouteElement({ element }) {
  const { redirect } = useSelector(getFormData);
  return redirect ? <Navigate to="/reset-password" replace /> : element;
}
