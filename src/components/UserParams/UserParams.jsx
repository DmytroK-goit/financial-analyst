import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/UserAuth/selectors";
import { updateUser } from "../../redux/UserAuth/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import s from "./UserParams.module.css";

export const UserParams = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const initialValues = {
    name: user.name || "",
    email: user.email || "",
    gender: user.gender || "",
    monthlyIncome: user.monthlyIncome || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string(),
    email: Yup.string().email("Invalid email"),
    gender: Yup.string().oneOf(["man", "woman"], "Invalid gender"),
    monthlyIncome: Yup.number().min(0, "Must be a positive number"),
  });

  const handleSubmit = (values) => {
    const updatedValues = {};

    Object.keys(values).forEach((key) => {
      if (values[key] !== initialValues[key] && values[key] !== "") {
        updatedValues[key] = String(values[key]);
      }
    });

    if (Object.keys(updatedValues).length > 0) {
      console.log(updatedValues);
      dispatch(updateUser(updatedValues));
    }
  };

  return (
    <div className={s.form}>
      <h2>User Settings</h2>
      <div className={s.userInfo}>
        <img className={s.avatar} src={user.avatar} alt="User Avatar" />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={s.formContainer}>
            <label>Name</label>
            <Field type="text" name="name" placeholder="Enter new name" />
            <ErrorMessage name="name" component="div" className={s.error} />

            <label>Email</label>
            <Field type="email" name="email" placeholder="Enter new email" />
            <ErrorMessage name="email" component="div" className={s.error} />

            <label>Gender</label>
            <Field as="select" name="gender">
              <option value="">Select...</option>
              <option value="man">Man</option>
              <option value="woman">Woman</option>
            </Field>
            <ErrorMessage name="gender" component="div" className={s.error} />

            <label>Monthly Income</label>
            <Field
              type="number"
              name="monthlyIncome"
              placeholder="Enter income"
            />
            <ErrorMessage
              name="monthlyIncome"
              component="div"
              className={s.error}
            />

            <button type="submit" disabled={isSubmitting}>
              Save
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
