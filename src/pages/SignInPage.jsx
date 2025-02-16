import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/UserAuth/operations";
import { selectIsLoading, selectUserCount } from "../redux/UserAuth/selectors";
import css from "./SignInPage.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderComponent from "../components/LoadingSpinner/LoaderComponent.jsx";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, isLoadingLogin } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/transaction");
    }
  }, [isLoggedIn, navigate]);

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(login(data));

      if (login.fulfilled.match(result)) {
        const { accessToken, user } = result.payload.data;

        if (accessToken) {
          toast.success(`Welcome back, ${user.name || user.email}!`);
          navigate("/transaction");
        }
      } else {
        const errorMessage =
          result.payload?.data?.message ||
          result.error?.message ||
          "Sign-in failed. Please try again.";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  if (isLoadingLogin) {
    return <LoaderComponent />;
  }

  return (
    <section className={css["container"]}>
      <div className={css["sign-in-page"]}>
        <ToastContainer className={css["toaster-container"]} />

        <form className={css["sign-in-form"]} onSubmit={handleSubmit(onSubmit)}>
          <div className={css["form-wrapper"]}>
            <h2 className={css["form-title"]}>Sign In</h2>
            <div className={css["input_main_wrapper"]}>
              <div className={css["input__wrapper"]}>
                <label>Email</label>
                <input
                  id="email"
                  type="email"
                  className={`${css["input__field"]} ${
                    errors.email ? css["input__field--error"] : ""
                  }`}
                  placeholder="Enter your email"
                  {...register("email")}
                  tabIndex="1"
                />
                {errors.email && (
                  <p className={css["error-text"]}>{errors.email.message}</p>
                )}
              </div>

              <div className={css["input__wrapper"]}>
                <label>Password</label>
                <div className={css["input-password"]}>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`${css["input__field"]} ${
                      errors.password ? css["input__field--error"] : ""
                    }`}
                    placeholder="Enter your password"
                    {...register("password")}
                    autoComplete="current-password"
                    tabIndex="2"
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
                    tabIndex="0"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setShowPassword(!showPassword);
                      }
                    }}
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
            </div>

            <button type="submit" className={css["submit-button"]} tabIndex="3">
              Sign In
            </button>

            <p className={css["text-link"]}>
              Don’t have an account?{" "}
              <a href="/signup" className={css["sign-up-link"]} tabIndex="4">
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignInForm;
