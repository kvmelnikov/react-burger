import { Navigate, useLocation } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React, { FC, useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../utils/hooks/hook'
import { getUserRequest } from '../services/forms/forms-thunks'

export const ProtectedRouteElement: FC<any | null> = ({ element }) => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const {
    inputs: {
      name: { value: nameUser },
    },
    request,
    failed,
    success,
  } = useAppSelector((state) => state.form.formProfile)

  const content = useMemo(() => {
    if (!localStorage.getItem('accessToken')) {
      return <Navigate to='/login' state={{ from: location }} />
    } else if (failed && !request) {
      return <Navigate to='/login' state={{ from: location }} />
    } else if (nameUser && success) {
      return element
    } else if (!request && failed && !success) {
      return <Navigate to='/login' state={{ from: location }} />
    }
  }, [nameUser, request, failed, location])

  return content
}
