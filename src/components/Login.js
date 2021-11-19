import React from "react";
import AuthPage from "./AuthPage";

function Login(props) {
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
      headerButton="Регистрация"
      name="Вход"
      submitButton="Войти"
      link={"/sign-up"}
      passChange={handleChangePassword}
      emailChange={handleChangeValue}
      valuePass={pass}
      valueEmail={email}
      onSubmit={handleSubmit}
    ></AuthPage>
  );
}

export default Login;
