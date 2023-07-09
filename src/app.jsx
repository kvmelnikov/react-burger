import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import {
  ConstructorMain,
  Login,
  ForgotPassword,
  Register,
  ResetPassword,
  ProfileForm,
  Orders,
  Order,
  Profile,
  MainB,
  DetailPageIngredient,
  Feeds,
} from './pages';
import ModalDetail from './components/modal-detail/modal-detail';
import { ProtectedRouteElement } from './components/ProtectedRouteElement';
import { ForgotRouteElement } from './components/ForgotRouteElement';
import { OnlyUnAuthRoute } from './components/OnlyUnAuthRoute';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  getUserRequest,
  RESET_USER_FORM,
} from './services/actions/form-action';
import IngridientDetails from './components/ingredient-details/ingredient-details';

// const getFormData = (state) => state.form.formProfile;

export default function App() {
  const home = '/';
  const ingredient = '/ingredients/:id';
  const login = '/login';
  const register = '/register';
  const forgot_password = '/forgot-password';
  const reset_password = '/reset-password';
  const profile = '/profile';
  const orders = '/profile/orders';
  const feed = '/feed';

  const dispatch = useDispatch();
  let location = useLocation();

  const background = location.state && location.state.background;
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      dispatch(getUserRequest());
    }
  }, [location]);
  return (
    <>
      <Routes location={background || location}>
        <Route path={home} element={<MainB />}>
          <Route path={home} element={<ConstructorMain />} />
          <Route path={ingredient} element={<DetailPageIngredient />} />
          <Route path={feed} element={<Feeds />} />
        </Route>
        <Route path={login} element={<OnlyUnAuthRoute element={<Login />} />} />
        <Route
          path={register}
          element={<OnlyUnAuthRoute element={<Register />} />}
        />
        <Route
          path={forgot_password}
          element={<ForgotRouteElement element={<ForgotPassword />} />}
        />
        <Route path={reset_password} element={<ResetPassword />} />
        <Route
          path={profile}
          element={<ProtectedRouteElement element={<Profile />} />}
        >
          <Route
            path={profile}
            element={<ProtectedRouteElement element={<ProfileForm />} />}
          />
          <Route
            path={orders}
            element={<ProtectedRouteElement element={<Orders />} />}
          />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route path={ingredient} element={<ModalDetail />} />
        </Routes>
      )}
    </>
  );
}
