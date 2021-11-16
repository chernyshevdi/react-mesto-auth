import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_picture ${
        props.card && props.card.link.length > 0 ? "popup_opened" : ""
      }`}
    >
      <div className="popup__bigsize">
        <img
          className="popup__image"
          src={props.card ? props.card.link : ""}
          alt={props.card ? props.card.name : ""}
        />
        <button
          className="popup__close"
          type="button"
          aria-label="Закрытие формы"
          onClick={props.onClose}
        ></button>
        <p className="popup__imgName">{props.card ? props.card.name : ""}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
