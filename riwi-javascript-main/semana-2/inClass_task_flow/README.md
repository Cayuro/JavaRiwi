# TaskFlow SPA

Proyecto educativo para aprender cómo funciona una SPA con JavaScript puro.

## ¿Qué es una SPA?
Una Single Page Application carga una sola vez el HTML y cambia el contenido usando JavaScript.

## ¿Cómo funciona el proyecto?

- `store.js` → Estado global (usuario y tareas)
- `router.js` → Decide qué vista mostrar según el hash
- `components/` → Partes reutilizables
- `views/` → Pantallas completas
- `app.js` → Render principal

## Flujo
1. index.html carga app.js
2. app.js escucha cambios de ruta
3. router decide qué vista mostrar
4. render inyecta HTML en el DOM
5. store guarda datos en localStorage

## Funciones principales
- Login simulado
- Crear tareas
- Editar tareas
- Completar tareas
- Eliminar tareas
- Persistencia con localStorage

Este proyecto es ideal para entender SPA sin frameworks.
