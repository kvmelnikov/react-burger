import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
} from "./pages";
import ModalDetail from "./components/modal-detail/modal-detail";
import { ProtectedRouteElement } from "./components/ProtectedRouteElement";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserRequest } from "./services/actions/form-action";
import IngridientDetails from "./components/ingredient-details/ingredient-details";

// const getFormData = (state) => state.form.formProfile;

export default function App() {
  const dispatch = useDispatch();
  let location = useLocation();

  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getUserRequest());
  }, [location]);

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<MainB />}>
          <Route path="/" element={<ConstructorMain />} />
          <Route path="/ingredients/:id" element={<DetailPageIngredient />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/profile"
          element={<ProtectedRouteElement element={<Profile />} />}
        >
          <Route
            path="/profile"
            element={<ProtectedRouteElement element={<ProfileForm />} />}
          />
          <Route
            path="/profile/orders"
            element={<ProtectedRouteElement element={<Orders />} />}
          />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route path="/ingredients/:id" element={<ModalDetail />} />
        </Routes>
      )}
    </>
  );
}
