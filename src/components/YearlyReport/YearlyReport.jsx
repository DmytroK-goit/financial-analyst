import { useDispatch, useSelector } from "react-redux";
import { selectYearTransactions } from "../../redux/Finance/selectors";
import { selectMonth, selectYear } from "../../redux/YearMonthSlice";
import { useEffect, useRef } from "react";
import s from "./YearlyReport.module.scss";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { toast } from "react-toastify";

export const YearlyReport = () => {
  const yearData = useSelector(selectYearTransactions);
  const year = useSelector(selectYear);
  const month = useSelector(selectMonth);
  const shownToastMonths = useRef(new Set());

  const currentMonthData = yearData?.monthly?.find(
    (item) => item.month === Number(month)
  );
  useEffect(() => {
  if (
    currentMonthData &&
    typeof currentMonthData.netTotal === "number" &&
    !shownToastMonths.current.has(month)
  ) {
    const net = currentMonthData.netTotal;

    if (net < 0) {
      toast.info(`Увага: Твій прибуток від’ємний — ${net} грн.`);
    } else if (net > 0) {
      toast.success(`Вітаємо! Твій прибуток позитивний — ${net} грн.`);
    } else {
      toast.warning(`Нульовий баланс: твій прибуток складає 0 грн.`);
    }

    shownToastMonths.current.add(month);
  }
}, [currentMonthData, month]);

  if (!yearData || !yearData.yearly) {
    return <p>Завантаження...</p>;
  }

  const { yearly, monthly } = yearData;

  const chartData = monthly.map(({ month, income, expense }) => ({
    name: new Date(0, month - 1).toLocaleString("uk", { month: "long" }),
    income,
    expense,
  }));

  return (
    <div className={s.report}>
      <div>
        <h2 className={s.hero_year}>
          Фінансовий звіт за {year || new Date().getFullYear()}
        </h2>
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
              <th>Категорія</th>
              {monthly.map(({ month }) => (
                <th key={month}>
                  {new Date(0, month - 1).toLocaleString("uk", {
                    month: "long",
                  })}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Дохід</td>
              {monthly.map(({ month, income }) => (
                <td key={month}>{income} грн</td>
              ))}
            </tr>
            <tr>
              <td>Витрати</td>
              {monthly.map(({ month, expense }) => (
                <td key={month}>{expense} грн</td>
              ))}
            </tr>
            <tr>
              <td>Чистий дохід</td>
              {monthly.map(({ month, netTotal }) => (
                <td key={month}>{netTotal} грн</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <ResponsiveContainer
          width="100%"
          height={300}
          margin={{ right: 10, left: 10 }}
        >
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="name" tick={{ angle: -15, textAnchor: "end" }} />
            <YAxis />
            <Tooltip />
            <Legend margin={{ top: 20 }} />
            <Bar dataKey="income" fill="#82ca9d" name="Дохід" />
            <Bar dataKey="expense" fill="#8884d8" name="Витрати" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
