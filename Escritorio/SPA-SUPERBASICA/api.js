const API = "http://localhost:3000";

/*
Esta función hace peticiones HTTP
json-server actúa como backend falso
*/

export const getUsers = async () => {
  const res = await fetch(`${API}/users`);
  return res.json();
};

export const createUser = async (user) => {
  const res = await fetch(`${API}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  return res.json();
};

export const getOrders = async () => {
  const res = await fetch(`${API}/orders`);
  return res.json();
};

export const createOrder = async (order) => {
  const res = await fetch(`${API}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order)
  });
  return res.json();
};
