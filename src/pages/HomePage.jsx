import { Link } from "react-router-dom";
import s from "./HomePage.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/UserAuth/selectors";

const HomePage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div className={s.container}>
      <h1>Finance App</h1>
      <div className={s.contButt}>
        <Link className={s.butt} to="/signup">
          signup
        </Link>
        <Link className={s.butt} to="/signin">
          signin
        </Link>
        {isLoggedIn && (
          <Link className={s.butt} to="/transaction">
            Transaction
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomePage;
