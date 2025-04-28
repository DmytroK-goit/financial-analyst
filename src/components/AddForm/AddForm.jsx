import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import s from "./AddForm.module.scss";
import {
  addTransaction,
  getTransaction,
  getTransactionYear,
} from "../../redux/Finance/operations";
import { selectIsLoading } from "../../redux/Finance/selectors";
import { selectMonth, selectYear } from "../../redux/YearMonthSlice";
import LoaderComponent from "../LoadingSpinner/LoaderComponent";

export const AddForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);
  const year = useSelector(selectYear);
  const month = useSelector(selectMonth);

  const initialValues = {
    type: "income",
    category: "Salary",
    amount: "",
    date: new Date().toISOString().slice(0, 16),
    description: "",
  };

  const validationSchema = Yup.object({
    type: Yup.string().oneOf(["income", "expense"]).required("Required"),
    category: Yup.string()
      .oneOf([
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
      ])
      .required("Required"),
    amount: Yup.number().positive("Must be positive").required("Required"),
    date: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    await dispatch(addTransaction(values));
    await dispatch(getTransaction({ year, month }));
    await dispatch(getTransactionYear({ year }));
    resetForm();
  };
  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={s.form}>
        <label>
          Тип:
          <Field as="select" name="type">
            <option value="income">Дохід</option>
            <option value="expense">Витрата</option>
          </Field>
        </label>
        <ErrorMessage name="type" component="div" className={s.error} />

        <label>
          Категорія:
          <Field as="select" name="category">
            <option value="Auto">Авто</option>
            <option value="Food">Їжа</option>
            <option value="Clothing">Одяг</option>
            <option value="Home expenses">Домашні витрати</option>
            <option value="Entertainment">Розваги</option>
            <option value="Health">Здоров'я</option>
            <option value="Transport">Транспорт</option>
            <option value="Education">Навчання</option>
            <option value="Other">Інше</option>
            <option value="Salary">Заробітня плата</option>
            <option value="Credit">Кредит</option>
          </Field>
        </label>
        <ErrorMessage name="category" component="div" className={s.error} />

        <label>
          Сума:
          <Field type="number" name="amount" />
        </label>
        <ErrorMessage name="amount" component="div" className={s.error} />

        <label>
          Дата:
          <Field type="datetime-local" name="date" />
        </label>
        <ErrorMessage name="date" component="div" className={s.error} />

        <label className={s.description}>
          Опис:
          <Field type="text" name="description" />
        </label>
        <ErrorMessage name="description" component="div" className={s.error} />

        <button type="submit">Додати транзакцію</button>
      </Form>
    </Formik>
  );
};
