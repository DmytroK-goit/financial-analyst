import { Link } from "react-router-dom";
import s from "./HomePage.module.scss";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/UserAuth/selectors";
import ShinyText from "../components/ShinyText/ShinyText";

const HomePage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={s.container}>
      <ShinyText disabled={false} speed={3} className="custom-class">
        <h1>My Financial Control</h1>
      </ShinyText>

      <div className={s.contButt}>
        {!isLoggedIn && (
          <>
            <Link className={s.butt} to="/signup">
              Signup
            </Link>
            <Link className={s.butt} to="/signin">
              Signin
            </Link>
          </>
        )}
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
