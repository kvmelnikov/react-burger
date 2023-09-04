import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../utils/hooks/hook'

export const ForgotRouteElement: FC<any | null> = ({ element }) => {
  const { redirect } = useAppSelector((state) => state.form.formForgotPassword)
  return redirect ? <Navigate to='/reset-password' replace /> : element
}
