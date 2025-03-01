import { useSelector } from "react-redux";
import { AddForm } from "../components/AddForm/AddForm";
import { YearMonthForm } from "../components/YearMonthForm/YearMonthForm";
import { selectUserName } from "../redux/UserAuth/selectors";
import s from "./Finance.module.css";
import { MonthTransactions } from "../components/MonthTransactions/MonthTransactions";
import { YearlyReport } from "../components/YearlyReport/YearlyReport";
export const Finance = () => {
  const name = useSelector(selectUserName);
  return (
    <div className={s.container}>
      <h2>{name} your Finance Page</h2>
      <div className={s.forms}>
        <AddForm />
        <YearMonthForm />
        <YearlyReport />
      </div>
      <MonthTransactions />
    </div>
  );
};
