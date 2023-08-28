import { Navigate, useLocation } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React, { FC, useEffect, useMemo } from 'react'
import { useAppSelector } from '../utils/hooks/hook'

export const ProtectedRouteElement: FC<any | null> = ({ element }) => {
  const location = useLocation()
  const {
    inputs: {
      name: { value: nameUser },
    },
    request,
    failed,
  } = useAppSelector((state) => state.form.formProfile)

  const content = useMemo(() => {
    if (failed) {
      return <Navigate to='/login' state={{ from: location }} />
    } else if (nameUser) {
      return element
    }
  }, [nameUser, request, failed, location])

  return content
}
