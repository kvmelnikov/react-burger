import { Outlet } from "react-router-dom";
import mainConstructorStyle from "./constructor-main.module.css";
import { ConstructorMain } from "./constructor-main";
import AppHeader from "../components/app-header/app-header.jsx";

export function MainB() {
  return (
    <div className={mainConstructorStyle.body}>
      <AppHeader />
      <main className={mainConstructorStyle.container}>
        <Outlet></Outlet>
      </main>
    </div>
  );
}
