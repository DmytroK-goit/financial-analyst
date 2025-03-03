import { useSelector } from "react-redux";
import { selectMonthTransactions } from "../../redux/Finance/selectors";
import s from "./MonthTransactions.module.css";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { selectMonth } from "../../redux/YearMonthSlice";

export const MonthTransactions = () => {
  const itemsMonth = useSelector(selectMonthTransactions);
  const month = useSelector(selectMonth);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[month - 1];
  const { income = [], expenses = [] } = itemsMonth;

  return (
    <div>
      <h2>Фінансовий звіт за {monthName}</h2>
      <div className={s.container}>
        <div className={s.column}>
          <h3 className={s.incomeTitle}>💰 Доходи</h3>
          {income.length > 0 ? (
            <ul className={s.list}>
              {income.map((item, index) => (
                <li key={index} className={s.item}>
                  <FaArrowUp className={s.incomeIcon} />
                  <div>
                    <p className={s.amount}>+{item.amount} грн</p>
                    <p className={s.category}>{item.category}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className={s.noData}>Немає даних про доходи.</p>
          )}
        </div>

        <div className={s.column}>
          <h3 className={s.expenseTitle}>💸 Витрати</h3>
          {expenses.length > 0 ? (
            <ul className={s.list}>
              {expenses.map((item, index) => (
                <li key={index} className={s.item}>
                  <FaArrowDown className={s.expenseIcon} />
                  <div>
                    <p className={s.amount}>-{item.amount} грн</p>
                    <p className={s.category}>{item.category}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className={s.noData}>Немає даних про витрати.</p>
          )}
        </div>
      </div>{" "}
    </div>
  );
};
