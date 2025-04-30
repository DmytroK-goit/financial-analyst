import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./Header.module.scss";
import {
  selectIsLoggedIn,
  selectUser,
  selectUserName,
} from "../../redux/UserAuth/selectors";
import { logout } from "../../redux/UserAuth/operations";
import logo from "../../img/logo.png";
import { Modal } from "../Modal";
import { UserParams } from "../UserParams/UserParams";
import { motion } from "framer-motion";

export const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userName = useSelector(selectUserName);
  const userAvatar = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  return (
    <div className={s.header}>
      <div className={s.cont}>
        <a href="/">
          <img className={s.logo} src={logo} alt="logo" />
        </a>
        {isLoggedIn && (
          <div className={s.user_info}>
            {userAvatar && userAvatar.avatar ? (
              <img
                className={s.avatar}
                src={userAvatar.avatar}
                alt="User Avatar"
              />
            ) : (
              <img
                className={s.avatar}
                src="/src/img/default.png"
                alt="Default User Avatar"
              />
            )}
            <h2 className={s.heder_title}>{userName}</h2>
          </div>
        )}
        <div className={s.buttons}>
          {isLoggedIn && (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <button
                className={s.buttons_item}
                onClick={() => setIsModalOpen(true)}
              >
                Опції
              </button>
            </motion.div>
          )}
          {isLoggedIn && (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <button className={s.buttons_item} onClick={handleLogout}>
                Вихід
              </button>
            </motion.div>
          )}
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <UserParams onClose={() => setIsModalOpen(false)} />
        </Modal>
      </div>
    </div>
  );
};
