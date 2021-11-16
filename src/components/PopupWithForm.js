import React from "react";

function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрытие формы"
          onClick={props.onClose}
        ></button>
        <form
          className="popup__form"
          method="post"
          name={props.name}
          onSubmit={props.onSubmit}
        >
          <h3 className="popup__name">{props.title}</h3>
          {props.children}
          <button
            className="popup__button"
            type="submit"
            aria-label="Да"
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
