import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name={"type_card-add"}
      title={"Новое место"}
      isOpen={props.isOpen ? "popup_opened" : ""}
      onClose={props.onClose}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input"
        id="popup__location"
        name="addFormName"
        placeholder="Название"
        required
        onChange={handleChangeName}
        value={name || ""}
      />
      <span className="popup__input-error popup__location-error"></span>
      <input
        type="url"
        className="popup__input"
        id="popup__link"
        name="addFormUrl"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChangeLink}
        value={link || ""}
      />
      <span className="popup__input-error popup__link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
