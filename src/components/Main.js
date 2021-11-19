import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardsContext } from "../contexts/CardsContext";

function Main(props) {
  const userContext = React.useContext(CurrentUserContext);
  const cardsData = React.useContext(CardsContext);

  return (
    <>
      <section className="profile">
        <div className="profile__avatar">
          <div className="profile__overlay">
            <img
              className="profile__image"
              src={userContext.avatar}
              alt="Аватар профиля"
              onClick={props.onEditAvatar}
            />
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__text">
            <h1 className="profile__name">{userContext.name}</h1>
            <p className="profile__description">{userContext.about}</p>
          </div>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="Редактирование профиля"
            onClick={props.onEditProfile}
          ></button>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавление фотографий"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cardsData.map((item) => (
          <Card
            onCardClick={props.onCardClick}
            key={item._id}
            card={item}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </>
  );
}

export default Main;
