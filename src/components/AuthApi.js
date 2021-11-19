export const BASE_URL = "https://auth.nomoreparties.co";

export const register = (password, email) => {
  return fetch(BASE_URL + "/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
};

export const login = (password, email) => {
  return fetch(BASE_URL + "/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
      } else {
        return;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const tokenCheck = (token) => {
  return fetch(BASE_URL + "/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};
