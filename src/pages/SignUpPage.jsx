import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserCount } from "../redux/UserAuth/selectors.js";
import { registerUser } from "../redux/UserAuth/operations";
import css from "./SignUpPage.module.scss";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const userCount = useSelector(selectUserCount);
  useEffect(() => {
    const form = document.querySelector("form");
    const focusableElements = form.querySelectorAll(
      'input, button, a, [tabindex]:not([tabindex="-1"])'
    );

    const handleTab = (event) => {
      const elements = Array.from(focusableElements);
      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];

      if (event.key === "Tab") {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleTab);

    return () => {
      document.removeEventListener("keydown", handleTab);
    };
  }, []);

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error(`Invalid email: ${email}`);
      return false;
    }
    return true;
  }

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...restData } = data;
      if (!isValidEmail(restData.email)) {
        return;
      }
      const result = await dispatch(registerUser(restData));
      if (registerUser.fulfilled.match(result)) {
        toast.success("Registration successful! 🎉");
        navigate("/transaction");
      } else {
        const errorMessage = result.payload?.message;
        if (
          errorMessage?.includes("email already exists") ||
          errorMessage?.includes("Email in use")
        ) {
          toast.error("Email is already in use. Please try another one.");
        } else if (
          errorMessage?.includes("Invalid email") ||
          errorMessage?.includes("Password")
        ) {
          toast.error("Invalid input. Please check your email and password.");
        } else {
          toast.error(errorMessage || "Registration failed. Please try again.");
        }
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section className={css["container"]}>
      <div className={css["sign-up-page"]}>
        <ToastContainer className={css["toaster-container"]} />

        <form className={css["sign-up-form"]} onSubmit={handleSubmit(onSubmit)}>
          <div
            className={css["logo"]}
            onClick={() => navigate("/")}
            tabIndex="0"
          ></div>
          <div className={css["form-wrapper"]}>
            <h2 className={css["form-title"]}>Реєстрація</h2>
            <div className={css["input_main_wrapper"]}>
              <div className={css["input__wrapper"]}>
                <label>Email</label>
                <input
                  type="email"
                  className={`${css["input__field"]} ${
                    errors.email ? css["input__field--error"] : ""
                  }`}
                  placeholder="Введи свій email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className={css["error-text"]}>{errors.email.message}</p>
                )}
              </div>

              <div className={css["input__wrapper"]}>
                <label>Пароль</label>
                <div className={css["input-password"]}>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`${css["input__field"]} ${
                      errors.password ? css["input__field--error"] : ""
                    }`}
                    placeholder="Введи свій пароль"
                    {...register("password")}
                  />
                  <svg
                    className={`${css["input__icon"]} ${
                      showPassword ? css["active"] : ""
                    }`}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    role="button"
                  >
                    <use
                      href={`/icons.svg#${
                        showPassword ? "icon-eye" : "icon-eye-off"
                      }`}
                    />
                  </svg>
                </div>
                {errors.password && (
                  <p className={css["error-text"]}>{errors.password.message}</p>
                )}
              </div>

              <div className={css["input__wrapper"]}>
                <label>Підтвердження паролю</label>
                <div className={css["input-password"]}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className={`${css["input__field"]} ${
                      errors.confirmPassword ? css["input__field--error"] : ""
                    }`}
                    placeholder="Підтвердь свій пароль"
                    {...register("confirmPassword")}
                  />
                  <svg
                    className={`${css["input__icon"]} ${
                      showConfirmPassword ? css["active"] : ""
                    }`}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    role="button"
                  >
                    <use
                      href={`/icons.svg#${
                        showConfirmPassword ? "icon-eye" : "icon-eye-off"
                      }`}
                    />
                  </svg>
                </div>
                {errors.confirmPassword && (
                  <p className={css["error-text"]}>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <button type="submit" className={css["submit-button"]}>
                Реєстрація
              </button>
            </motion.div>

            <p className={css["text-link"]}>
              Ти уже маєш обліковий запис?{" "}
              <a href="/signin" className={css["sign-up-link"]}>
                Вхід
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUpForm;
