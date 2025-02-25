import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import s from "./AddForm.module.css";
import { addTransaction } from "../../redux/Finance/operations";

export const AddForm = () => {
  const dispatch = useDispatch();

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
    description: Yup.string(),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addTransaction(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={s.form}>
        <label>
          Type:
          <Field as="select" name="type">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Field>
        </label>
        <ErrorMessage name="type" component="div" className={s.error} />

        <label>
          Category:
          <Field as="select" name="category">
            <option value="Auto">Auto</option>
            <option value="Food">Food</option>
            <option value="Clothing">Clothing</option>
            <option value="Home expenses">Home expenses</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health">Health</option>
            <option value="Transport">Transport</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
            <option value="Salary">Salary</option>
            <option value="Credit">Credit</option>
          </Field>
        </label>
        <ErrorMessage name="category" component="div" className={s.error} />

        <label>
          Amount:
          <Field type="number" name="amount" />
        </label>
        <ErrorMessage name="amount" component="div" className={s.error} />

        <label>
          Date:
          <Field type="datetime-local" name="date" />
        </label>
        <ErrorMessage name="date" component="div" className={s.error} />

        <label>
          Description:
          <Field type="text" name="description" />
        </label>
        <ErrorMessage name="description" component="div" className={s.error} />

        <button type="submit">Add Transaction</button>
      </Form>
    </Formik>
  );
};
