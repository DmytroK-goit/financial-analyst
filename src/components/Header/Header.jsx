import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import s from "./Header.module.css";
import {
  selectIsLoggedIn,
  selectUserName,
} from "../../redux/UserAuth/selectors";
import { logout } from "../../redux/UserAuth/operations";
import logo from "../../img/logo.png";
import { Modal } from "../Modal";
import { UserParams } from "../UserParams/UserParams";

export const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={s.header}>
      <div className={s.cont}>
        <img className={s.logo} src={logo} alt="logo" />
        {isLoggedIn && <h2>{userName}</h2>}
        {isLoggedIn && (
          <button onClick={() => setIsModalOpen(true)}>Params</button>
        )}
        {isLoggedIn && <button onClick={() => dispatch(logout())}>Exit</button>}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <UserParams />
        </Modal>
      </div>
    </div>
  );
};
