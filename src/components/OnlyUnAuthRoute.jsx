import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const getFormProfile = (state) => state.form.formProfile;

export const OnlyUnAuthRoute = ({ element }) => {
  const navigate = useNavigate();
  const {
    inputs: {
      name: { value: nameUser },
    },
  } = useSelector(getFormProfile);

  if (nameUser) {
    navigate(-1, { replace: true });
  } else {
    return element;
  }
};
