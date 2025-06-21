import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMonthTransactions,
  selectYearTransactions,
} from "../../redux/Finance/selectors";
import s from "./MonthTransactions.module.scss";
import { FaArrowUp, FaArrowDown, FaTrash, FaEdit } from "react-icons/fa";
import { selectMonth, selectYear } from "../../redux/YearMonthSlice";
import {
  delTransaction,
  getTransaction,
  getTransactionYear,
} from "../../redux/Finance/operations";
import { EditTransactionModal } from "../EditTransactionModal/EditTransactionModal";
import ShinyText from "../ShinyText/ShinyText";
import FadeContent from "../FadeContent/FadeContent";
import { motion } from "framer-motion";

export const MonthTransactions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const itemsMonth = useSelector(selectMonthTransactions) || {};
  const month = useSelector(selectMonth);
  const year = useSelector(selectYear);
  const { monthly } = useSelector(selectYearTransactions);
  const dispatch = useDispatch();

  const currentMonthData = monthly?.find(
    (item) => item.month === Number(month)
  );

  const monthNames = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ];

  const categoryTranslations = {
    Auto: "Авто",
    Food: "Їжа",
    "Home expenses": "Домашні витрати",
    Entertainment: "Розваги",
    Health: "Здоров'я",
    Transport: "Транспорт",
    Education: "Навчання",
    Clothing: "Одяг",
    Other: "Інше",
    Salary: "Заробітня плата",
    Credit: "Кредит",
  };

  const monthName = monthNames[month - 1];

  const income = Array.isArray(itemsMonth.income) ? itemsMonth.income : [];
  const expenses = Array.isArray(itemsMonth.expenses)
    ? itemsMonth.expenses
    : [];

  const expenseByCategory = expenses.reduce((acc, item) => {
    const category = categoryTranslations[item.category] || item.category;
    acc[category] = (acc[category] || 0) + item.amount;
    return acc;
  }, {});

  let topCategory = null;
  let topAmount = 0;

  for (const [category, amount] of Object.entries(expenseByCategory)) {
    if (amount > topAmount) {
      topAmount = amount;
      topCategory = category;
    }
  }

  const handleDelete = async (_id) => {
    await dispatch(delTransaction(_id));
    await dispatch(getTransaction({ year, month }));
    await dispatch(getTransactionYear({ year }));
  };

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };
  const topAmountPercent =
    topAmount && currentMonthData?.expense
      ? ((topAmount / currentMonthData.expense) * 100).toFixed(2)
      : 0;

  return (
    <div className={s.MonthTransactions}>
      <ShinyText>
        <h2>Фінансовий звіт за {monthName}</h2>
      </ShinyText>

      <div className={s.container}>
        <p className={s.netTotal}>
          Чистий підсумок:{" "}
          <strong>{currentMonthData?.netTotal ?? "Немає даних"}</strong> грн
        </p>
        {topCategory && (
          <div className={s.topCategory}>
            <strong>Найбільші витрати:</strong>
            <br />
            {categoryTranslations[topCategory] || topCategory} — {topAmount} грн
            <br />
            🧾 Частка від усіх витрат: <strong>{topAmountPercent}%</strong>
          </div>
        )}
        <div className={s.column}>
          <h3 className={s.incomeTitle}>💰 Доходи</h3>
          {income.length > 0 ? (
            <ul className={s.list}>
              {income.map((item) => (
                <motion.div
                  key={item._id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FadeContent
                    blur
                    duration={1000}
                    easing="ease-out"
                    initialOpacity={0}
                  >
                    <li className={s.item}>
                      <div className={s.headInfo}>
                        <FaArrowUp className={s.incomeIcon} />
                        <div>
                          <p className={s.amount}>+{item.amount} грн</p>
                          <p className={s.category}>
                            {categoryTranslations[item.category] ||
                              item.category}
                          </p>
                          <p className={s.category}>
                            {new Date(item.date).toLocaleDateString("uk-UA", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className={s.buttons}>
                        <button
                          className={s.deleteButton}
                          onClick={() => handleDelete(item._id)}
                        >
                          <FaTrash />
                        </button>
                        <button
                          className={s.editButton}
                          onClick={() => handleEdit(item)}
                        >
                          <FaEdit />
                        </button>
                      </div>
                    </li>
                  </FadeContent>
                </motion.div>
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
              {expenses.map((item) => (
                <motion.div
                  key={item._id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FadeContent
                    blur
                    duration={1000}
                    easing="ease-out"
                    initialOpacity={0}
                  >
                    <li className={s.item}>
                      <div className={s.headInfo}>
                        <FaArrowDown className={s.expenseIcon} />
                        <div>
                          <p className={s.amount}>-{item.amount} грн</p>
                          <p className={s.category}>
                            {categoryTranslations[item.category] ||
                              item.category}
                          </p>
                          <p className={s.category}>
                            {new Date(item.date).toLocaleDateString("uk-UA", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className={s.buttons}>
                        <button
                          className={s.deleteButton}
                          onClick={() => handleDelete(item._id)}
                        >
                          <FaTrash />
                        </button>
                        <button
                          className={s.editButton}
                          onClick={() => handleEdit(item)}
                        >
                          <FaEdit />
                        </button>
                      </div>
                    </li>
                  </FadeContent>
                </motion.div>
              ))}
            </ul>
          ) : (
            <p className={s.noData}>Немає даних про витрати.</p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <EditTransactionModal
          transaction={selectedTransaction}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
