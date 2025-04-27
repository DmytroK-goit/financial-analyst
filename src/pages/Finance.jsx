import { useSelector } from "react-redux";
import { AddForm } from "../components/AddForm/AddForm";
import { YearMonthForm } from "../components/YearMonthForm/YearMonthForm";
import { selectUserName } from "../redux/UserAuth/selectors";
import s from "./Finance.module.scss";
import { MonthTransactions } from "../components/MonthTransactions/MonthTransactions";
import { YearlyReport } from "../components/YearlyReport/YearlyReport";
import ShinyText from "../components/ShinyText/ShinyText";
import { motion } from "framer-motion";
import { FinancialCalendar } from "../components/FinancialCalendar/FinancialCalendar";

export const Finance = () => {
  const name = useSelector(selectUserName);
  return (
    <div className={s.container}>
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
      <MonthTransactions />
      {/* <FinancialCalendar /> */}
    </div>
  );
};
