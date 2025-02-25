import { useDispatch } from "react-redux";
import { logout } from "../redux/UserAuth/operations";
import { AddForm } from "../components/AddForm/AddForm";
import { useEffect } from "react";
import { exchangeRate } from "../redux/ExchangeRate";

export const Finance = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(exchangeRate());
  // }, []);

  return (
    <>
      <AddForm />

      <h2>Finance</h2>
    </>
  );
};
