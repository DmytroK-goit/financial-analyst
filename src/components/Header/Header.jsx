import { useDispatch, useSelector } from "react-redux";
import s from "./Header.module.css";
import { selectIsLoggedIn } from "../../redux/UserAuth/selectors";
import { logout } from "../../redux/UserAuth/operations";
import logo from "../../img/logo.png";

export const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  return (
    <div className={s.header}>
      <div className={s.cont}>
        <img className={s.logo} src={logo} alt="logo" />
        {isLoggedIn && <button onClick={() => dispatch(logout())}>Exit</button>}
      </div>
    </div>
  );
};
