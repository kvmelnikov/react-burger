import { Navigate, useLocation } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { getCookie, setCookie } from '../utils/cookie'
import Api from '../utils/api/api'
import { useAppSelector } from '../utils/hooks/hook'

export const ProtectedRouteElement = ({ element }) => {
  const location = useLocation()
  const {
    inputs: {
      name: { value: nameUser },
    },
    request,
    failed,
  } = useSelector((state) => state.form.formProfile)

  if (request) {
    return <p>Загрузка...</p>
  }

  if (failed) {
    return <Navigate to='/login' state={{ from: location }} />
  }

  return nameUser ? element : <Navigate to='/login' replace />
}
