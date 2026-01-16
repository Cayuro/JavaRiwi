// 1. Intentamos obtener datos previos o usamos los iniciales
const initialTasks = JSON.parse(localStorage.getItem('tasks')) || [
    { id: 1, title: 'Aprender SPA', completed: false }
];

const initialUser = localStorage.getItem('user') || null;

export const store = {
  user: initialUser,
  tasks: initialTasks,

  // Método para guardar el usuario
  setUser(name) {
    this.user = name;
    localStorage.setItem('user', name);
  },

  // Método para agregar tarea
  addTask(title) {
    const newTask = {
      id: Date.now(), // Genera un ID único basado en el tiempo
      title: title,
      completed: false
    };
    this.tasks.push(newTask);
    this.saveTasks();
  },

  // Método para completar tarea
  toggleTask(id) {
    this.tasks = this.tasks.map(t => 
        t.id === id ? { ...t, completed: !t.completed } : t
    );
    this.saveTasks();
  },

  // Guardar en LocalStorage
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  },

  // Cerrar sesión
  logout() {
    this.user = null;
    localStorage.removeItem('user');
  }
};