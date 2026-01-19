// Estado global de la aplicación
export const store = {
  user: localStorage.getItem('user') || null,

  tasks: JSON.parse(localStorage.getItem('tasks')) || [],

  // Guardar usuario
  setUser(name) {
    this.user = name;
    localStorage.setItem('user', name);
  },

  logout() {
    this.user = null;
    localStorage.removeItem('user');
  },

  // Guardar tareas en localStorage
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  },

  // Crear tarea
  addTask(title) {
    this.tasks.push({
      id: Date.now(),
      title,
      completed: false
    });
    this.saveTasks();
  },

  // Completar tarea
  toggleTask(id) {
    this.tasks = this.tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    this.saveTasks();
  },

  // Editar tarea
  editTask(id, newTitle) {
    this.tasks = this.tasks.map(t =>
      t.id === id ? { ...t, title: newTitle } : t
    );
    this.saveTasks();
  },

  // Eliminar tarea
  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.saveTasks();
  }
};
