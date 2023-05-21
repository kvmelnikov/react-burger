import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  ConstructorMain,
  Login,
  ForgotPassword,
  Register,
  ResetPassword,
  Profile,
  Orders,
  Order,
} from './pages';
import { ProtectedRouteElement } from './components/ProtectedRouteElement';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUserRequest } from './services/actions/form-action';
import { getCookie } from './utils/cookie';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserRequest(getCookie('accessToken')));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConstructorMain />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route
          path="/profile"
          element={<ProtectedRouteElement element={<Profile />} />}
        />
        <Route
          path="/profile/orders"
          element={<ProtectedRouteElement element={<Orders />} />}
        />
        <Route
          path="/profile/orders/:id"
          element={<ProtectedRouteElement element={<Order />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
