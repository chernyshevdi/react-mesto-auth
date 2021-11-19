import React from "react";
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className={`${props.onVisible ? "header__account_active" : "header__account"}`}>
        <p className="header__email">{props.email}</p>
        <Link to="/sign-in" className="header__button" onClick={props.onClose}>Выйти</Link>
      </div>

    </header>
  );
}

export default Header;
