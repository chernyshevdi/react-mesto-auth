import React from "react";
import PopupWithForm from "./PopupWithForm";
import union from "../images/Union.png";
import unionError from "../images/UnionError.png";

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen}`}>
      <div className="popup__checkContainer">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрытие формы"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__checkImage"
          src={props.onSubmit ? union : unionError}
        ></img>
        <h3 className="popup__status">
          {props.onSubmit
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
