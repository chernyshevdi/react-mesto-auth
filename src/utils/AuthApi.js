export const BASE_URL = "https://auth.nomoreparties.co";

const checkFetch = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

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
  }).then(checkFetch);
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
    .then(checkFetch)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
      } else {
        return;
      }
    })
};

export const tokenCheck = (token) => {
  return fetch(BASE_URL + "/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(checkFetch)
    .then((res) => {
      return res;
    })
};
