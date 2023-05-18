import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  ConstructorMain,
  Login,
  ForgotPassword,
  Register,
  ResetPassword,
  Profile,
} from './pages';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConstructorMain />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
