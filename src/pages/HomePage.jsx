import { Link } from "react-router-dom";
import s from "./HomePage.module.scss";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/UserAuth/selectors";
import ShinyText from "../components/ShinyText/ShinyText";
import { motion } from "framer-motion";

const HomePage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={s.container}>
      <ShinyText disabled={false} speed={5} className="custom-class">
        <h1>Мій фінансовий додаток</h1>
      </ShinyText>

      <div className={s.contButt}>
        {!isLoggedIn && (
          <>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link className={s.butt} to="/signup">
                Реєстрація
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link className={s.butt} to="/signin">
                Вхід
              </Link>
            </motion.div>
          </>
        )}
        {isLoggedIn && (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link className={s.butt} to="/transaction">
              Транзакції
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
