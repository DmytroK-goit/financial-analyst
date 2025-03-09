import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editTransaction,
  getTransaction,
  getTransactionYear,
} from "../../redux/Finance/operations";
import s from "./EditTransactionModal.module.css";
import { selectMonth, selectYear } from "../../redux/YearMonthSlice";

export const EditTransactionModal = ({ transaction, onClose }) => {
  const month = useSelector(selectMonth);
  const year = useSelector(selectYear);
  const [formData, setFormData] = useState({
    amount: transaction.amount,
    category: transaction.category,
  });

  const dispatch = useDispatch();

  const categories = [
    "Auto",
    "Food",
    "Clothing",
    "Home expenses",
    "Entertainment",
    "Health",
    "Transport",
    "Education",
    "Other",
    "Salary",
    "Credit",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(editTransaction({ _id: transaction._id, ...formData }));
    await dispatch(getTransaction({ year, month }));
    await dispatch(getTransactionYear({ year }));
    onClose();
  };

  return (
    <div className={s.overlay}>
      <div className={s.modal}>
        <h3>Редагування транзакції</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Сума:
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </label>
          <label>
            Категорія:
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>
          <div className={s.buttons}>
            <button type="submit">Зберегти</button>
            <button type="button" onClick={onClose}>
              Закрити
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
