import { Link } from "react-router-dom";
import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={css.container}>
      <h1>HOME PAGE</h1>
      <Link to="/signup">signup</Link>
      <Link to="/signin">signin</Link>
      <Link to="/transaction">Transaction</Link>
    </div>
  );
};

export default HomePage;
