import { Outlet, useLocation } from "react-router-dom";
import AppHeader from "../components/app-header/app-header";
import ProfileStyle from "./profile.module.css";
import { ProfileMenu } from "../components/profile-menu/profile-menu";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { getUserRequest } from "../services/actions/form-action";

export function Profile() {
  return (
    <>
      <AppHeader />
      <div className={`${ProfileStyle.container} mt-30`}>
        <ProfileMenu />
        <Outlet></Outlet>
      </div>
    </>
  );
}
