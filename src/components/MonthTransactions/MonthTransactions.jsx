import { useSelector } from "react-redux";
import { selectMonthTransactions } from "../../redux/Finance/selectors";

export const MonthTransactions = () => {
  const itemsMonth = useSelector(selectMonthTransactions);
  const { income, expenses } = itemsMonth;

  return (
    <div>
      <h3>Income</h3>
      {income && income.length > 0 ? (
        <ul>
          {income.map((item, index) => (
            <li key={index}>
              {/* Render the details of each income item here */}
              {JSON.stringify(item)}{" "}
              {/* This will display the item, replace with appropriate rendering */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No income data available.</p>
      )}

      <h3>Expenses</h3>
      {expenses && expenses.length > 0 ? (
        <ul>
          {expenses.map((item, index) => (
            <li key={index}>
              {/* Render the details of each expense item here */}
              {JSON.stringify(item)}{" "}
              {/* This will display the item, replace with appropriate rendering */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No expenses data available.</p>
      )}
    </div>
  );
};
