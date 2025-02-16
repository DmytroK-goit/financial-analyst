import { useDispatch, useSelector } from "react-redux";
import s from "./Header.module.css";
import { selectIsLoggedIn } from "../../redux/UserAuth/selectors";
import { logout } from "../../redux/UserAuth/operations";
export const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  return (
    <div className={s.header}>
      <div className={s.cont}>
        <p>Logo</p>
        {isLoggedIn && <button onClick={() => dispatch(logout())}>Exit</button>}
      </div>
    </div>
  );
};
