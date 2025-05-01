import { useSelector } from "react-redux";
import { useState } from "react";
import { AddForm } from "../components/AddForm/AddForm";
import { YearMonthForm } from "../components/YearMonthForm/YearMonthForm";
import { selectUserName } from "../redux/UserAuth/selectors";
import s from "./Finance.module.scss";
import { MonthTransactions } from "../components/MonthTransactions/MonthTransactions";
import { YearlyReport } from "../components/YearlyReport/YearlyReport";
import ShinyText from "../components/ShinyText/ShinyText";
import { motion } from "framer-motion";
import { FinancialCalendar } from "../components/FinancialCalendar/FinancialCalendar";
import { selectMonth, selectYear } from "../redux/YearMonthSlice";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export const Finance = () => {
  const name = useSelector(selectUserName);
  const [showMonthTransactions, setShowMonthTransactions] = useState(false);
  const month = useSelector(selectMonth);
  const year = useSelector(selectYear);
  const toggleMonthTransactions = () => {
    setShowMonthTransactions((prev) => !prev);
  };

  return (
    <div className={s.container}>
      {/* <ToastContainer /> */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <ShinyText>
          <h2 className={s.hero_finance}>{name} твоя сторінка з Фінансами</h2>
        </ShinyText>
      </motion.div>

      <div className={s.forms}>
        <div className={s.forms_add_date}>
          <AddForm />
          <YearMonthForm />
        </div>

        <YearlyReport />
      </div>

      {/* Кнопка для відкриття/закриття */}
      <motion.button
        className={s.toggleButton}
        onClick={toggleMonthTransactions}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {showMonthTransactions
          ? `Сховати Транзакції за ${month}.${year}`
          : `Показати Транзакції за ${month}.${year}`}
      </motion.button>

      {/* Показуємо тільки якщо треба */}
      {showMonthTransactions && <MonthTransactions />}

      {/* <FinancialCalendar /> */}
    </div>
  );
};
