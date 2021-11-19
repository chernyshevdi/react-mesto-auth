import React from "react";
import { Link } from "react-router-dom";

function AuthPage(props) {
  return (
    <div className="loginPage">
      <Link to={props.link} className="loginPage__headerButton">
        {props.headerButton}
      </Link>
      <form className="loginPage__form" onSubmit={props.onSubmit}>
        <h2 className="loginPage__title">{props.name}</h2>
        <input
          className="loginPage__input"
          placeholder="Email"
          onChange={props.emailChange}
          value={props.valueEmail || ""}
        ></input>
        <input
          className="loginPage__input"
          placeholder="Пароль"
          onChange={props.passChange}
          value={props.valuePass || ""}
        ></input>
        <button className="loginPage__submitButton">
          {props.submitButton}
        </button>
      </form>
      {props.children}
    </div>
  );
}

export default AuthPage;
