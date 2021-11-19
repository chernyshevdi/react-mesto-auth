import React from "react";
import Module from "./Module";
import * as auth from "./AuthApi";
import { useNavigate } from "react-router-dom";

function Login() {
  const [pass, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  let navigate = useNavigate();

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleChangeValue(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    auth
      .login(pass, email)
      .then(() => {
        navigate("/page");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Module
      headerButton="Регистрация"
      name="Вход"
      submitButton="Войти"
      link={"/sign-up"}
      passChange={handleChangePassword}
      emailChange={handleChangeValue}
      valuePass={pass}
      valueEmail={email}
      onSubmit={handleSubmit}
    ></Module>
  );
}

export default Login;
