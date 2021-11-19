import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import React, { useState, useEffect } from "react";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardsContext } from "../contexts/CardsContext";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/AuthApi";
import { useNavigate } from "react-router-dom";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [headerEmail, setHeaderEmail] = useState(""); //блок кнопки и емейла в хедере
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [popup, setPopup] = React.useState(null);
  const [popupOpen, setPopupOpen] = React.useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .tokenCheck(token)
        .then((res) => {
          setHeaderEmail(res.data.email);
          setLoggedIn(true);
          navigate("/page");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoggedIn(false);
    }
  },[localStorage.getItem('token'), navigate]);

  function signOut() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  useEffect(() => {
    api
      .getUserData()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .getCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    !isLiked
      ? api
          .addLike(card._id)
          .then((newCard) => {
            setCards((state) =>
              state.map((c) => (c._id === card._id ? newCard : c))
            );
          })
          .catch((err) => {
            console.log(err);
          })
      : api
          .deleteLike(card._id)
          .then((res) => {
            setCards((state) =>
              state.map((c) => (c._id === card._id ? res : c))
            );
          })
          .catch((err) => {
            console.log(err);
          });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape)

    return () => document.removeEventListener('keydown', closeByEscape)
}, [])


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  function handleUpdateUser(data) {
    api
      .patchUserData(data.name, data.about)
      .then((res) => {
        setCurrentUser(res);
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .patchAvatar(data.avatar)
      .then((res) => {
        setCurrentUser(res);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateCard(data) {
    api
      .patchCard(data.name, data.link)
      .then((res) => {
        setCards([res, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateLogin() {
    setLoggedIn(true);
  }

  function closePopup() {
    setPopupOpen(false);
  }

  function handlePopup() {
    setPopup(true);
  }

  function handleRegister(data) {
    auth
    .register(data.password, data.email)
    .then(() => {
      handlePopup();
      setPopupOpen(true);
    })
    .catch(() => {
      setPopup(false);
      setPopupOpen(true);
    });
  }

  function handleLogin(data) {
    auth
      .login(data.password, data.email)
      .then(() => {
          navigate("/page");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={headerEmail} onVisible={loggedIn} onClose={signOut} />
        <CardsContext.Provider value={cards}>
          <Routes>
            <Route
              element={
                <ProtectedRoute path="/" loggedIn={loggedIn} component={Main} />
              }
            />

            <Route
              path="/page"
              element={
                <>
                  <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />

                  <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                  />

                  <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleUpdateCard}
                  />

                  <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                  />

                  <ImagePopup onClose={closeAllPopups} card={selectedCard} />

                  <Footer />

                </>
              }
            />

            <Route
              exact
              path="/sign-in"
              element={<Login
                handleUpdateLogin={handleUpdateLogin}
                onUpdate={handleLogin}
              />}
            />
            <Route exact path="/sign-up" element={
              <>
              <Register onUpdate={handleRegister}/>
              <InfoTooltip
                isOpen={popupOpen}
                onSubmit={popup}
                onClose={closePopup}
              />
              </>
            } />
            <Route
              exact
              path="/"
              element={
                loggedIn ? <Navigate to="/page" /> : <Navigate to="/sign-in" />
              }
            />
          </Routes>
        </CardsContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
