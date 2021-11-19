import React from "react";
import Module from "./Module";
import { Link } from "react-router-dom";
import * as auth from "./AuthApi";
import { useNavigate } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

function Register() {
  const [pass, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [popup, setPopup] = React.useState(null);
  const [popupOpen, setPopupOpen] = React.useState(false);

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleChangeValue(e) {
    setEmail(e.target.value);
  }

  function closePopup() {
    setPopupOpen(false);
  }

  function handlePopup() {
    setPopup(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    auth
      .register(pass, email)
      .then(() => {
        handlePopup();
        setPopupOpen(true);
      })
      .catch(() => {
        setPopup(false);
        setPopupOpen(true);
      });
  }

  return (
    <Module
      headerButton="Войти"
      name="Регистрация"
      submitButton="Зарегистрироваться"
      link={"/sign-in"}
      passChange={handleChangePassword}
      emailChange={handleChangeValue}
      valuePass={pass}
      valueEmail={email}
      onSubmit={handleSubmit}
    >
      <InfoTooltip
        isOpen={popupOpen ? "popup_opened" : "popup"}
        onSubmit={popup}
        onPopup={popup}
        onClose={closePopup}
      />
      <Link to="/sign-in" className="loginPage__subSubmitButton">
        Уже зарегистрированы? Войти
      </Link>
    </Module>
  );
}

export default Register;
