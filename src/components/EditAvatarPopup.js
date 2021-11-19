import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name={"avatar"}
      title={"Обновить аватар?"}
      isOpen={props.isOpen ? "popup_opened" : ""}
      onClose={props.onClose}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        className="popup__input"
        id="popup__avatar"
        name="avatarUrl"
        placeholder="Ссылка на аватар"
        required
        ref={avatarRef}
      />
      <span className="popup__input-error popup__avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
