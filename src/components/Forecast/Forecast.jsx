import { useSelector } from "react-redux";
import { selectYearTransactions } from "../../redux/Finance/selectors";
import s from "./Forecast.module.scss";
export const Forecast = () => {
  const yearData = useSelector(selectYearTransactions);
  const monthlyData = yearData.monthly;
  const monthNamesUa = [
    "січень",
    "лютий",
    "березень",
    "квітень",
    "травень",
    "червень",
    "липень",
    "серпень",
    "вересень",
    "жовтень",
    "листопад",
    "грудень",
  ];
  const forecastMonthIndex = (new Date().getMonth() + 1) % 12;
  const forecastMonthName = monthNamesUa[forecastMonthIndex];
  const filledMonths = monthlyData.filter(
    (item) => item.income > 0 || item.expense > 0
  );
  const lastNMonths = filledMonths.slice(-4);

  const avg = lastNMonths.reduce(
    (acc, item) => {
      acc.income += item.income;
      acc.expense += item.expense;
      acc.netTotal += item.netTotal;
      return acc;
    },
    { income: 0, expense: 0, netTotal: 0 }
  );
  const count = lastNMonths.length;
  const forecast = count
    ? {
        income: Math.round(avg.income / count),
        expense: Math.round(avg.expense / count),
        netTotal: Math.round(avg.netTotal / count),
      }
    : { income: 0, expense: 0, netTotal: 0 };

  return (
    <div
      className={s.forecast}
      title="Прогноз розраховується як середнє значення доходів і витрат за останні 3 місяці"
    >
      <h2 className={s.forecastTitle}>
        Прогноз доходів та витрат на {forecastMonthName.toLocaleUpperCase()}{" "}
        {new Date().getFullYear()}
      </h2>
      <p className={s.forecastText}>
        💰 Прогнозований дохід: <strong>{forecast.income} грн</strong>
      </p>
      <p className={s.forecastText}>
        💸 Прогнозовані витрати: <strong>{forecast.expense} грн</strong>
      </p>
      <p className={s.forecastText}>
        📈 Прогнозований чистий дохід: <strong>{forecast.netTotal} грн</strong>
      </p>
    </div>
  );
};
