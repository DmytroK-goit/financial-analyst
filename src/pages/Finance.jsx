import { useSelector } from "react-redux";
import { AddForm } from "../components/AddForm/AddForm";
import { YearMonthForm } from "../components/YearMonthForm/YearMonthForm";
import { selectUserName } from "../redux/UserAuth/selectors";
import s from "./Finance.module.css";
import { MonthTransactions } from "../components/MonthTransactions/MonthTransactions";
import { YearlyReport } from "../components/YearlyReport/YearlyReport";
import ShinyText from "../components/ShinyText/ShinyText";
export const Finance = () => {
  const name = useSelector(selectUserName);
  return (
    <div className={s.container}>
      <ShinyText>
        <h2>{name} your Finance Page</h2>
      </ShinyText>

      <div className={s.forms}>
        <div className={s.forms_add_date}>
          <AddForm />
          <YearMonthForm />
        </div>

        <YearlyReport />
      </div>
      <MonthTransactions />
    </div>
  );
};
