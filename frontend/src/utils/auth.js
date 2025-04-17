// A função register aceita os dados necessários como argumentos
// e envia uma solicitação POST ao endpoint /signup.
export const register = async ({ email, password }) => {
  return fetch(`${import.meta.env.VITE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

export const authorize = async ({ email, password }) => {
  return fetch(`${import.meta.env.VITE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

export const checkToken = async (token) => {
  return fetch(`${import.meta.env.VITE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
