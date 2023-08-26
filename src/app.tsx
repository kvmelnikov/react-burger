import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import {
  ConstructorMain,
  Login,
  ForgotPassword,
  Register,
  ProfileForm,
  Orders,
  Profile,
  MainB,
  DetailPageIngredient,
  Feeds,
  FeedDetailPage,
  OrderDetailPage,
  ResetPassword,
} from './pages'
import ModalDetail from './components/modal-detail/modal-detail'
import { ProtectedRouteElement } from './components/ProtectedRouteElement'
import { ForgotRouteElement } from './components/ForgotRouteElement'
import { useEffect } from 'react'
import { getIngredients } from './services/constructor/constructor-api-slice'
import ModalOrderDetail from './components/modal-order-detail/modal-order-detail'
import { useAppDispatch } from './utils/hooks/hook'
import { getUserRequest } from './services/forms/forms-thunks'
import { ModalFeedDetail } from './components/modal-feed-detail/modal-feed-detail'

export default function App() {
  const home = '/'
  const ingredient = '/ingredients/:id'
  const login = '/login'
  const register = '/register'
  const forgot_password = '/forgot-password'
  const reset_password = '/reset-password'
  const profile = '/profile'
  const orders = '/profile/orders'
  const feed = '/feed'
  const feedDetail = 'feed/:id'
  const orderDetail = '/profile/orders/:id'

  const dispatch = useAppDispatch()
  let location = useLocation()

  const background = location.state && location.state.background

  useEffect(() => {
    dispatch(getIngredients())
    if (localStorage.getItem('accessToken')) {
      dispatch(getUserRequest())
    }
  }, [location])

  return (
    <>
      <Routes location={background || location}>
        <Route path={home} element={<MainB />}>
          <Route path={home} element={<ConstructorMain />} />
          <Route path={feed} element={<Feeds />} />
          <Route path={feedDetail} element={<FeedDetailPage />} />
          <Route path={ingredient} element={<DetailPageIngredient />} />
        </Route>

        <Route path={orderDetail} element={<ProtectedRouteElement element={<OrderDetailPage />} />} />
        <Route path={login} element={<Login />} />
        <Route path={register} element={<Register />} />
        <Route path={forgot_password} element={<ForgotRouteElement element={<ForgotPassword />} />} />
        <Route path={reset_password} element={<ResetPassword />} />
        <Route path={profile} element={<ProtectedRouteElement element={<Profile />} />}>
          <Route path={profile} element={<ProtectedRouteElement element={<ProfileForm />} />} />
          <Route path={orders} element={<ProtectedRouteElement element={<Orders />} />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route path={ingredient} element={<ModalDetail />} />
          <Route path={feedDetail} element={<ModalFeedDetail />} />
          <Route path={orderDetail} element={<ModalOrderDetail />} />
        </Routes>
      )}
    </>
  )
}
