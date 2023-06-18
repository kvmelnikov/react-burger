import { NavLink } from "react-router-dom";
import ElementStyle from "./element-profile-menu.module.css";

export function ElementProfileMenu({ children, classActive, onHandler, path }) {
  return (
    <li
      className={`${ElementStyle.item} text text_type_main-medium ${classActive} `}
    >
      <NavLink
        onClick={onHandler}
        to={path}
        className={({ isActive }) =>
          isActive
            ? `${ElementStyle.link_active} ml-2`
            : `${ElementStyle.link} ml-2`
        }
      >
        {children}
      </NavLink>
    </li>
  );
}
