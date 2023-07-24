import { Outlet, useLocation } from 'react-router-dom'
import mainConstructorStyle from './constructor-main.module.css'
import { ConstructorMain } from './constructor-main'
import AppHeader from '../components/app-header/app-header.jsx'
import { wsConnect } from '../services/feed/feed-slice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
export const LIVE_TABLE_SERVER_URL = 'wss://norma.nomoreparties.space/orders/all'

export function MainB() {
  const dispatch = useDispatch()
  const location = useLocation()
  useEffect(() => {
    if (location.pathname === '/feed' || '/feed/') dispatch(wsConnect(LIVE_TABLE_SERVER_URL))
  }, [])

  return (
    <div className={mainConstructorStyle.body}>
      <AppHeader />
      <main className={mainConstructorStyle.container}>
        <Outlet></Outlet>
      </main>
    </div>
  )
}
