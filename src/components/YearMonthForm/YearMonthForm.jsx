import { useDispatch, useSelector } from "react-redux";
import {
  setYear,
  setMonth,
  selectYear,
  selectMonth,
} from "../../redux/YearMonthSlice";
import { useEffect } from "react";
import {
  getTransaction,
  getTransactionYear,
} from "../../redux/Finance/operations";

export const YearMonthForm = () => {
  const dispatch = useDispatch();
  const year = useSelector(selectYear);
  const month = useSelector(selectMonth);

  const handleMonthChange = (e) => {
    dispatch(setMonth(e.target.value));
  };

  const handleYearChange = (e) => {
    dispatch(setYear(e.target.value));
  };

  useEffect(() => {
    if (!year || !month) return;
    dispatch(getTransaction({ year, month }));
    dispatch(getTransactionYear({ year }));
  }, [year, month, dispatch]);

  return (
    <form>
      <label>
        Виберіть рік:
        <input type="number" value={year} onChange={handleYearChange} />
      </label>
      <label>
        Виберіть місяць:
        <select value={month} onChange={handleMonthChange}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
              {new Date(0, i).toLocaleString("uk", { month: "long" })}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
};
