import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const userContext = React.useContext(CurrentUserContext);

  useEffect(() => {
    setName(userContext.name);
    setDescription(userContext.about);
  }, [userContext, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name={"type_profile"}
      title={"Редактировать профиль"}
      isOpen={props.isOpen ? "popup_opened" : ""}
      onClose={props.onClose}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input"
        id="popup__name"
        name="profile_name"
        placeholder="Имя"
        required
        onChange={handleChangeName}
        value={name || ""}
      />
      <span className="popup__name-error popup__input-error"></span>
      <input
        type="text"
        className="popup__input"
        id="popup__description"
        name="profile_description"
        placeholder="Вид деятельности"
        required
        onChange={handleChangeDescription}
        value={description || ""}
      />
      <span className="popup__description-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
