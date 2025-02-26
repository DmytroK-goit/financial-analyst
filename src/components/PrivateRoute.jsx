import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/UserAuth/selectors";

const PrivateRoute = ({ element: Element, redirectTo }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? Element : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
