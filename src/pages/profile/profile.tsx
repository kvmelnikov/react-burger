import { Outlet } from 'react-router-dom'
import AppHeader from '../../components/app-header/app-header'
import ProfileStyle from './profile.module.css'
import { ProfileMenu } from '../../components/profile-menu/profile-menu'
import React, { useEffect } from 'react'
import { wsConnect } from '../../services/order/order-slice'
import { useAppDispatch } from '../../utils/hooks/hook'
export const ORDERS_SERVER_URL = 'wss://norma.nomoreparties.space/orders'

export const Profile: React.FC<any> = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')?.split(' ')[1]
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
