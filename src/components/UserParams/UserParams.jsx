import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/UserAuth/selectors";
import { updateUser } from "../../redux/UserAuth/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import s from "./UserParams.module.css";

export const UserParams = ({ onClose }) => {
  const user = useSelector(selectUser);


  const dispatch = useDispatch();
  const [avatarFile, setAvatarFile] = useState(null);
  if (!user) {
    return <p>Завантаження даних користувача...</p>;
  }
  const initialValues = {
    name: user.name || "Користувач",
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

  const handleSubmit = async (values, { resetForm }) => {
    const updatedValues = {};
    Object.keys(values).forEach((key) => {
      if (values[key] !== initialValues[key] && values[key] !== "") {
        updatedValues[key] = values[key];
      }
    });

    try {
      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);
        await dispatch(updateUser(formData)).unwrap();
      }

      if (Object.keys(updatedValues).length > 0) {
        await dispatch(updateUser(updatedValues)).unwrap();
      }

      resetForm();
      setAvatarFile(null);
      onClose();
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div className={s.form}>
      <h2>Налаштування</h2>
      <div className={s.userInfo}>
        <img
          className={s.avatar}
          src={user.avatar || "/src/img/default.png"}
          alt="User Avatar"
        />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={s.formContainer}>
            <label>Ім'я</label>
            <Field type="text" name="name" placeholder="Enter new name" />
            <ErrorMessage name="name" component="div" className={s.error} />

            <label>Email</label>
            <Field type="email" name="email" placeholder="Enter new email" />
            <ErrorMessage name="email" component="div" className={s.error} />

            <label>Стать</label>
            <Field as="select" name="gender">
              <option value="">Вибір...</option>
              <option value="man">Чоловік</option>
              <option value="woman">Жінка</option>
            </Field>
            <ErrorMessage name="gender" component="div" className={s.error} />

            {/* <label>Дохід за місяць</label>
            <Field
              type="number"
              name="monthlyIncome"
              placeholder="Enter income"
            />
            <ErrorMessage
              name="monthlyIncome"
              component="div"
              className={s.error}
            /> */}

            <label>Аватар</label>
            <input
              type="file"
              onChange={(e) => setAvatarFile(e.target.files[0])}
              accept="image/*"
            />

            <button type="submit" disabled={isSubmitting}>
              Зберегти
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
