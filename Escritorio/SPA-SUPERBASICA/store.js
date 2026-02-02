/*
store = estado central mínimo
guarda usuario logueado
y lo persiste en localStorage
*/

const KEY = "session";

/*
Guardar sesión en el navegador
localStorage persiste aunque cierres la página
*/

export const setUser = (user) => {
  localStorage.setItem(KEY, JSON.stringify(user));
};

/*
Leer sesión guardada
*/

export const getUser = () => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : null;
};

/*
Cerrar sesión
*/

export const logout = () => {
  localStorage.removeItem(KEY);
};
