import { Outlet, useLocation } from 'react-router-dom'
import mainConstructorStyle from './constructor-main.module.css'
import { ConstructorMain } from './constructor-main'
import AppHeader from '../components/app-header/app-header'
import { wsConnect, wsDisconnect as feedDiconnect } from '../services/feed/feed-slice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { wsDisconnect as orderDisconect } from '../services/order/order-slice.ts'
import { useAppDispatch } from '../utils/hooks/hook'
export const LIVE_TABLE_SERVER_URL = 'wss://norma.nomoreparties.space/orders/all'

export function MainB() {
  const dispatch = useAppDispatch()
  const location = useLocation()
  useEffect(() => {
    if (location.pathname === '/feed' || location.pathname === '/feed/') {
      dispatch(wsConnect(LIVE_TABLE_SERVER_URL))
    } else {
      dispatch(feedDiconnect())
      dispatch(orderDisconect())
    }
  }, [location.pathname])

  // useEffect(() => {
  //   if (location.pathname !== '/feed' || '/feed/')
  // }, [])

  return (
    <div className={mainConstructorStyle.body}>
      <AppHeader />
      <main className={mainConstructorStyle.container}>
        <Outlet></Outlet>
      </main>
    </div>
  )
}
