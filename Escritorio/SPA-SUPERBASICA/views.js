import * as api from "./api.js";
import * as store from "./store.js";

const app = document.getElementById("app");

/*
Navbar cambia según rol
*/

const navbar = (user) => {
  if (!user) return "";

  if (user.role === "admin") {
    return `
      <nav>
        <a href="#admin">Admin</a>
        <button onclick="logout()">Salir</button>
      </nav>
    `;
  }

  return `
    <nav>
      <a href="#orders">Mis pedidos</a>
      <button onclick="logout()">Salir</button>
    </nav>
  `;
};

/*
Pantalla login
*/

const loginView = () => `
  <h2>Login</h2>
  <input id="email" placeholder="Email">
  <input id="password" placeholder="Password" type="password">
  <button onclick="login()">Entrar</button>
  <p><a href="#register">Crear cuenta</a></p>
`;

/*
Registro
*/

const registerView = () => `
  <h2>Registro</h2>
  <input id="name" placeholder="Nombre">
  <input id="email" placeholder="Email">
  <input id="password" placeholder="Password">
  <button onclick="register()">Registrar</button>
`;

/*
Pedidos del usuario
*/

const ordersView = async (user) => {
  const orders = await api.getOrders();

  const myOrders = orders.filter(o => o.userId === user.id);

  return `
    ${navbar(user)}
    <h2>Mis pedidos</h2>
    ${myOrders.map(o => `
      <div class="card">
        Total: $${o.total}
      </div>
    `).join("")}
    <button onclick="createOrder()">Nuevo pedido</button>
  `;
};

/*
Panel admin
*/

const adminView = async (user) => {
  const orders = await api.getOrders();

  return `
    ${navbar(user)}
    <h2>Todos los pedidos</h2>
    ${orders.map(o => `
      <div class="card">
        Usuario: ${o.userId} - Total: $${o.total}
      </div>
    `).join("")}
  `;
};

/*
Render general
*/

export const render = async (route) => {
  const user = store.getUser();

  if (route === "#login") {
    app.innerHTML = loginView();
    return;
  }

  if (route === "#register") {
    app.innerHTML = registerView();
    return;
  }

  if (!user) {
    location.hash = "#login";
    return;
  }

  if (route === "#orders") {
    app.innerHTML = await ordersView(user);
    return;
  }

  if (route === "#admin" && user.role === "admin") {
    app.innerHTML = await adminView(user);
    return;
  }

  location.hash = "#orders";
};

/* ==== acciones globales ==== */

window.login = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const users = await api.getUsers();

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) return alert("Credenciales incorrectas");

  store.setUser(user);
  location.hash = "#orders";
};

window.register = async () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await api.createUser({
    name,
    email,
    password,
    role: "user"
  });

  location.hash = "#login";
};

window.logout = () => {
  store.logout();
  location.hash = "#login";
};

window.createOrder = async () => {
  const user = store.getUser();

  await api.createOrder({
    userId: user.id,
    total: Math.floor(Math.random() * 50000),
    createdAt: new Date()
  });

  location.hash = "#orders";
};
