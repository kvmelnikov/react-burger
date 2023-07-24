import { Outlet, useLocation } from 'react-router-dom'
import AppHeader from '../components/app-header/app-header'
import ProfileStyle from './profile.module.css'
import { ProfileMenu } from '../components/profile-menu/profile-menu'
import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'
import { getUserRequest } from '../services/actions/form-action'
import { wsConnect } from '../services/order/order-slice'
export const ORDERS_SERVER_URL = 'wss://norma.nomoreparties.space/orders'

export function Profile() {
  const dispatch = useDispatch()
  const accessToken = localStorage.getItem('accessToken').split(' ')[1]
  useEffect(() => {
    dispatch(wsConnect(`${ORDERS_SERVER_URL}?token=${accessToken}`))
  }, [])

  return (
    <>
      <AppHeader />
      <div className={`${ProfileStyle.container} mt-30`}>
        <ProfileMenu />
        <Outlet></Outlet>
      </div>
    </>
  )
}
