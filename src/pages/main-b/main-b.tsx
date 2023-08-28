import { Outlet, useLocation } from 'react-router-dom'
import mainConstructorStyle from './constructor-main.module.css'
import AppHeader from '../../components/app-header/app-header'
import { wsConnect, wsDisconnect as feedDiconnect } from '../../services/feed/feed-slice'
import { useEffect } from 'react'
import { wsDisconnect as orderDisconect } from '../../services/order/order-slice'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/hook'
export const LIVE_TABLE_SERVER_URL = 'wss://norma.nomoreparties.space/orders/all'

export function MainB() {
  const dispatch = useAppDispatch()
  const location = useLocation()

  return (
    <div className={mainConstructorStyle.body}>
      <AppHeader />
      <main className={mainConstructorStyle.container}>
        <Outlet></Outlet>
      </main>
    </div>
  )
}
