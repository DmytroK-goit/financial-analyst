import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getTransaction,
  getTransactionYear,
} from "../../redux/Finance/operations";
import s from "./YearMonthForm.module.css";

export const YearMonthForm = () => {
  const dispatch = useDispatch();
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (!year || !month) return;
    dispatch(getTransaction({ year, month }));
    dispatch(getTransactionYear({ year }));
  }, [year, month, dispatch]);

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleSearch = () => {
    if (year && month) {
      dispatch(getTransaction({ year, month }));
      dispatch(getTransactionYear({ year }));
    }
  };

  return (
    <form className={s.form}>
      <label>
        Виберіть рік:
        <input
          type="number"
          value={year}
          onChange={handleYearChange}
          placeholder="Рік"
          min="2000"
          max={new Date().getFullYear()}
        />
      </label>
      <label>
        Виберіть місяць:
        <select value={month} onChange={handleMonthChange}>
          <option value="">Оберіть місяць</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
              {new Date(0, i).toLocaleString("uk", { month: "long" })}
            </option>
          ))}
        </select>
      </label>
      <button type="button" onClick={handleSearch} className={s.searchButton}>
        Пошук
      </button>
    </form>
  );
};
