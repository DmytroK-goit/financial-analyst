import { useDispatch } from "react-redux";
import SharedLayout from "./components/SharedLayout";
import HomePage from "./pages/HomePage";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUpForm from "./pages/SignUpPage";
import SignInForm from "./pages/SignInPage";
import PrivateRoute from "./components/PrivateRoute";
import { Finance } from "./pages/Finance";
import NotFound from "./pages/NotFound";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="signup"
          element={token ? <Navigate to="/transaction" /> : <SignUpForm />}
        />
        <Route
          path="signin"
          element={token ? <Navigate to="/transaction" /> : <SignInForm />}
        />
        <Route
          path="transaction"
          element={
            <PrivateRoute component={<Finance />} redirectTo="/signin" />
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
