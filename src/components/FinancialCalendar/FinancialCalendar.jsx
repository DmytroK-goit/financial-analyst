import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import s from "./FinancialCalendar.module.scss";

export const FinancialCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventDescription, setEventDescription] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const [financialEvents, setFinancialEvents] = useState({});

  const formatDate = (date) => date.toISOString().split("T")[0];

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setCurrentDate(formatDate(newDate));
    setEventDescription(financialEvents[formatDate(newDate)] || "");
  };

  const handleSaveEvent = () => {
    setFinancialEvents((prevEvents) => ({
      ...prevEvents,
      [currentDate]: eventDescription,
    }));
    setIsModalOpen(false);
  };

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Фінансовий календар</h2>

      <Calendar
        onChange={handleDateChange}
        value={date}
        tileContent={({ date }) => {
          const key = formatDate(date);
          return financialEvents[key] ? (
            <span className={s.eventNote}></span>
          ) : null;
        }}
      />

      <div className={s.details}>
        <p>
          Обрано: <strong>{date.toLocaleDateString()}</strong>
        </p>
        <p>
          Подія:{" "}
          <strong>{financialEvents[formatDate(date)] || "Немає подій"}</strong>
        </p>
        <button className={s.editButton} onClick={() => setIsModalOpen(true)}>
          Редагувати подію
        </button>
      </div>

      {/* Модальне вікно для додавання/редагування події */}
      {isModalOpen && (
        <div className={s.modal}>
          <div className={s.modalContent}>
            <h3>Додати або редагувати подію</h3>
            <textarea
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              placeholder="Опишіть подію"
              className={s.textarea}
            />
            <div className={s.modalActions}>
              <button onClick={handleSaveEvent} className={s.saveButton}>
                Зберегти
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className={s.cancelButton}
              >
                Скасувати
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
