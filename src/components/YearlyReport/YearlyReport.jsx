import { useSelector } from "react-redux";
import { selectYearTransactions } from "../../redux/Finance/selectors";
import s from "./YearlyReport.module.css";
import { selectYear } from "../../redux/YearMonthSlice";

export const YearlyReport = () => {
  const yearData = useSelector(selectYearTransactions);
  const year = useSelector(selectYear);

  if (!yearData || !yearData.yearly) {
    return <p>Завантаження...</p>;
  }

  const { yearly, monthly } = yearData;

  return (
    <div className={s.report}>
      <h2>Фінансовий звіт за {year || new Date().getFullYear()}</h2>
      <div className={s.summary}>
        <p>
          💰 Загальний дохід: <strong>{yearly.totalIncome} грн</strong>
        </p>
        <p>
          💸 Загальні витрати: <strong>{yearly.totalExpense} грн</strong>
        </p>
        <p>
          📈 Чистий дохід: <strong>{yearly.netTotal} грн</strong>
        </p>
      </div>

      <table className={s.table}>
        <thead>
          <tr>
            <th>Місяць</th>
            <th>Дохід</th>
            <th>Витрати</th>
            <th>Чистий дохід</th>
          </tr>
        </thead>
        <tbody>
          {monthly?.map(({ month, income, expense, netTotal }) => (
            <tr key={month}>
              <td>
                {new Date(0, month - 1).toLocaleString("uk", { month: "long" })}
              </td>
              <td>{income} грн</td>
              <td>{expense} грн</td>
              <td>{netTotal} грн</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
