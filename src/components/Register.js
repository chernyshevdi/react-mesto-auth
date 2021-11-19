import React from "react";
import AuthPage from "./AuthPage";
import { Link } from "react-router-dom";

function Register(props) {
  const [pass, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleChangeValue(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdate({
      password: pass,
      email: email
    })
  }

  return (
    <AuthPage
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
      <Link to="/sign-in" className="loginPage__subSubmitButton">
        Уже зарегистрированы? Войти
      </Link>
    </AuthPage>
  );
}

export default Register;
