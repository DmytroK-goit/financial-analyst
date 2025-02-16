import { useDispatch } from "react-redux";
import { logout } from "../redux/UserAuth/operations";

export const Finance = () => {
  const dispatch = useDispatch();

  return (
    <>
      <button onClick={() => dispatch(logout())}>Exit</button>
      <h2>Finance</h2>
    </>
  );
};
