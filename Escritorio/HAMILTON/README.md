# RestorApp - Sistema de Gestión de Pedidos

Sistema web para la gestión de pedidos de un restaurante, desarrollado como proyecto de prueba de desempeño.

---

## 📋 Tabla de Contenidos

1. [Descripción](#descripción)
2. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
3. [Flujo de Datos](#flujo-de-datos)
4. [Roles del Sistema](#roles-del-sistema)
5. [Estados de Pedido](#estados-de-pedido)
6. [Guía de Uso](#guía-de-uso)
7. [Instalación y Ejecución](#instalación-y-ejecución)
8. [Detalles Técnicos](#detalles-técnicos)
9. [Referencia de API](#referencia-de-api)

---

## 📖 Descripción

RestorApp es una aplicación web SPA (Single Page Application) que permite:

**Para clientes:**
- Visualizar el menú con productos organizados por categorías
- Realizar pedidos seleccionando productos
- Seguir el estado de sus pedidos en tiempo real
- Consultar su información de perfil y estadísticas

**Para administradores:**
- Visualizar todos los pedidos del sistema
- Filtrar pedidos por estado
- Cambiar el estado de cada pedido
- Gestionar el flujo de atención del restaurante

---

## 🏗️ Arquitectura del Proyecto

```
RestorApp/
├── index.html              # Punto de entrada de la aplicación
│                           # Carga el módulo app.js y el contenedor #app
│
├── app.js                  # Controlador principal
│                           # - Gestiona el router (hash-based)
│                           # - Maneja sesión de usuario (localStorage)
│                           # - Protege rutas según el rol
│
├── styles.css              # Estilos globales
│                           # - Diseño responsive
│                           # - Variables CSS para colores
│                           # - Componentes reutilizables
│
├── db.json                 # Base de datos simulada (REST API)
│                           # - usuarios: datos de usuarios
│                           # - productos: catálogo del restaurante
│                           # - pedidos: pedidos realizados
│                           # - sesion: estado de sesión actual
│
├── router/
│   └── routes.js           # Definición de rutas
│                           # - Mapea hash a templates HTML
│                           # - Formato: "#ruta": "./template/archivo.html"
│
├── services/               # Capa de acceso a datos
│   ├── user.js            # Servicios de usuario
│   │   ├── getUsers()     # Obtiene todos los usuarios
│   │   └── getUsersByEmail() # Busca usuario por email
│   │
│   ├── product.js         # Servicios de productos
│   │   ├── getProducts()  # Obtiene todos los productos
│   │   ├── getProductsByCategory() # Filtra por categoría
│   │   ├── getProductById() # Busca producto por ID
│   │   └── getCategories() # Obtiene categorías únicas
│   │
│   └── order.js           # Servicios de pedidos
│       ├── getOrders()    # Obtiene todos los pedidos
│       ├── getOrdersByUserId() # Filtra por usuario
│       ├── getOrderById() # Busca pedido por ID
│       ├── createOrder()  # Crea nuevo pedido
│       ├── updateOrderStatus() # Actualiza estado
│       ├── deleteOrder()  # Elimina pedido
│       └── getUserOrderStats() # Calcula estadísticas
│
├── template/               # Plantillas HTML (vistas)
│   ├── login.html         # Formulario de inicio de sesión
│   ├── home.html          # Página de bienvenida
│   ├── menu.html          # Catálogo de productos
│   ├── cart.html          # Carrito de compras
│   ├── myOrders.html      # Historial de pedidos (usuario)
│   ├── profile.html       # Perfil de usuario
│   └── adminOrders.html   # Panel de administración
│
└── views/                  # Controladores de vistas
    ├── login.js           # Lógica del formulario de login
    │                      # - Valida credenciales
    │                      # - Redirige según rol
    │                      # - Gestiona errores
    │
    ├── home.js            # Lógica de página de inicio
    │
    ├── menu.js            # Lógica del catálogo
    │                      # - Carga productos
    │                      # - Filtra por categoría
    │                      # - Agrega al carrito
    │
    ├── cart.js            # Lógica del carrito
    │                      # - Muestra items
    │                      # - Modifica cantidades
    │                      # - Confirma pedido
    │
    ├── myOrders.js        # Lógica de pedidos (usuario)
    │                      # - Lista pedidos del usuario
    │                      # - Muestra estado actual
    │
    ├── profile.js         # Lógica del perfil
    │                      # - Muestra datos de usuario
    │                      # - Calcula estadísticas
    │
    └── adminOrders.js     # Lógica de administración
                         # - Lista todos los pedidos
                         # - Filtra por estado
                         # - Cambia estados de pedidos
```

---

## 🔄 Flujo de Datos

```
┌─────────────────────────────────────────────────────────────────┐
│                     FLUJO DE DATOS                              │
└─────────────────────────────────────────────────────────────────┘

USUARIO                    APP.JS                     SERVICES
   │                          │                           │
   │── #login ───────────────>│                           │
   │                          │                           │
   │<── login.html ───────────│                           │
   │                          │                           │
   │── email/password ───────>│                           │
   │                          │                           │
   │                          │── getUsersByEmail() ─────>│
   │                          │<── usuario ───────────────│
   │                          │                           │
   │                          │── setSession() ──────────>│
   │                          │  (localStorage)           │
   │                          │                           │
   │<── redirect ─────────────│                           │
   │   #menu (user)           │                           │
   │   #adminOrders (admin)   │                           │
   │                          │                           │
   │── Ver Menú ─────────────>│                           │
   │                          │                           │
   │                          │── getProducts() ─────────>│
   │                          │<── productos ─────────────│
   │                          │                           │
   │<── lista productos ──────│                           │
   │                          │                           │
   │── Agregar al carrito ───>│                           │
   │                          │── updateCart() ──────────>│
   │                          │  (localStorage)           │
   │                          │                           │
   │── #cart ────────────────>│                           │
   │                          │                           │
   │<── items del carrito ────│                           │
   │                          │                           │
   │── Confirmar pedido ─────>│                           │
   │                          │                           │
   │                          │── createOrder() ─────────>│
   │                          │<── nuevoPedido ──────────│
   │                          │                           │
   │<── redirect #myOrders ───│                           │
```

---

## 👥 Roles del Sistema

### Usuario (role: "user")

| Recurso | Acceso | Descripción |
|---------|--------|-------------|
| Menú | ✅ Sí | Ver productos y categorías |
| Carrito | ✅ Sí | Agregar/eliminar productos |
| Mis Pedidos | ✅ Sí | Solo sus pedidos |
| Perfil | ✅ Sí | Ver sus datos y estadísticas |
| Panel Admin | ❌ No | Redirigido a menú |

### Administrador (role: "admin")

| Recurso | Acceso | Descripción |
|---------|--------|-------------|
| Panel Admin | ✅ Sí | Ver todos los pedidos |
| Cambiar Estados | ✅ Sí | Actualizar estado de pedidos |
| Eliminar Pedidos | ✅ Sí | Remover pedidos del sistema |
| Menú | ✅ Sí | Puede ver el menú |
| Perfil | ✅ Sí | Acceso a estadísticas globales |

---

## 📦 Estados de Pedido

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLUJO DE ESTADOS                             │
│                                                                 │
│   ┌──────────┐    ┌────────────┐    ┌────────┐    ┌──────────┐ │
│   │PENDIENTE │───>│ PREPARANDO │───>│ LISTO  │───>│ENTREGADO │ │
│   │    ⏳    │    │    👨‍🍳     │    │   ✅   │    │    🎉    │ │
│   └──────────┘    └────────────┘    └────────┘    └──────────┘ │
│        │               │                │               │       │
│        └───────────────┴────────────────┴───────────────┘       │
│                      (Admin puede revertir)                     │
└─────────────────────────────────────────────────────────────────┘
```

| Estado | Ícono | Descripción | Transiciones |
|--------|-------|-------------|--------------|
| Pendiente | ⏳ | Pedido recibido, esperando preparación | → Preparando |
| Preparando | 👨‍🍳 | El pedido está siendo preparado | → Listo / ← Pendiente |
| Listo | ✅ | Listo para entrega al cliente | → Entregado / ← Preparando |
| Entregado | 🎉 | Pedido entregado al cliente | Final |

---

## 📖 Guía de Uso

### Primeros Pasos

1. **Iniciar el servidor:**
   ```bash
   json-server --watch db.json --port 3000
   ```

2. **Abrir la aplicación:**
   Navega a `http://localhost:3000` o abre `index.html` directamente.

3. **Iniciar sesión:**
   Usa las credenciales de prueba proporcionadas.

### Para Usuarios (Clientes)

```
1. Login
   └─ Email: juan_gomez@g.com
   └─ Password: 000

2. Explorar Menú (#menu)
   └─ Ver productos por categoría
   └─ Agregar al carrito

3. Carrito (#cart)
   └─ Ajustar cantidades
   └─ Eliminar items
   └─ Confirmar pedido

4. Mis Pedidos (#myOrders)
   └─ Ver historial
   └─ Revisar estado actual

5. Perfil (#profile)
   └─ Ver estadísticas
   └─ Ver datos personales
```

### Para Administradores

```
1. Login
   └─ Email: jaimito@g.com
   └─ Password: 010

2. Panel de Administración (#adminOrders)
   └─ Ver todos los pedidos
   └─ Filtrar por estado

3. Gestionar Pedidos
   └─ Cambiar estado (siguiente/anterior)
   └─ Eliminar pedidos
```

---

## ⚡ Instalación y Ejecución

### Prerrequisitos

- **Node.js** (versión 14 o superior)
- **npm** (incluido con Node.js)

### Paso 1: Instalar json-server

```bash
# Opción A: Instalación global
npm install -g json-server

# Opción B: Uso directo con npx
npx json-server --version
```

### Paso 2: Iniciar el servidor

```bash
# Desde el directorio del proyecto
json-server --watch db.json --port 3000
```

### Paso 3: Abrir la aplicación

```bash
# Opción A: Abrir archivo directamente
# Navega a la carpeta del proyecto y abre index.html

# Opción B: Usar servidor local
npx serve .

# Opción C: Con Live Server (VS Code)
# Instala la extensión "Live Server" y haz clic en "Go Live"
```

### Verificar funcionamiento

Deberías ver:
```
JSON Server started on PORT :3000
Watching db.json...

Endpoints:
http://localhost:3000/usuarios
http://localhost:3000/productos
http://localhost:3000/pedidos
```

---

## 💻 Detalles Técnicos

### Requisitos Técnicos Obligatorios ✅

| Requisito | Implementación | Archivos |
|-----------|----------------|----------|
| `map` | Renderizado de listas | `views/menu.js`, `views/cart.js`, `views/adminOrders.js` |
| `filter` | Filtrado por categoría/estado | `views/menu.js`, `views/adminOrders.js` |
| `find` | Búsqueda de productos | `views/menu.js` |
| `some` | Validación de existencia | `app.js` (protección de rutas) |
| `every` | Validación de datos | `services/order.js` (getUserOrderStats) |
| Renderizado dinámico | innerHTML con templates | Todas las vistas |
| Event listeners | addEventListener | Todas las vistas |
| preventDefault | Formularios | `views/login.js` |
| Separación de archivos | Módulos ES6 | `app.js`, servicios, vistas |

### Patrones de Diseño

1. **MVC (Model-View-Controller)**
   - Model: `services/` (datos)
   - View: `template/` (HTML)
   - Controller: `views/` (lógica)

2. **SPA (Single Page Application)**
   - Carga única de `index.html`
   - Cambio de vistas sin refrescar
   - Router basado en hash

3. **Repository Pattern**
   - Servicios abstraen acceso a datos
   - API uniforme para todas las operaciones

### Persistencia de Datos

| Datos | Método | Descripción |
|-------|--------|-------------|
| Sesión | localStorage | Usuario logueado |
| Carrito | localStorage | Items pendientes de ordenar |
| Pedidos | JSON Server | Persistencia en archivo |
| Usuarios | JSON Server | Base de datos |
| Productos | JSON Server | Catálogo |

---

## 🔌 Referencia de API

### Endpoints disponibles:

```
GET    /usuarios              → Lista todos los usuarios
GET    /usuarios?email=...    → Filtra por email
GET    /productos             → Lista todos los productos
GET    /productos?category=...→ Filtra por categoría
GET    /pedidos               → Lista todos los pedidos
GET    /pedidos?userId=...    → Filtra por usuario
GET    /pedidos?status=...    → Filtra por estado
POST   /pedidos               → Crea nuevo pedido
PUT    /pedidos/:id           → Actualiza pedido
DELETE /pedidos/:id           → Elimina pedido
```

### Estructura de Datos

**Usuario:**
```json
{
  "id": "1",
  "name": "Juanes",
  "email": "juan_gomez@g.com",
  "password": "000",
  "role": "user",
  "age": "25",
  "city": "Medellín"
}
```

**Producto:**
```json
{
  "id": "1",
  "name": "Hamburguesa Clásica",
  "price": 15000,
  "category": "Hamburguesas",
  "description": "Carne de res, lechuga, tomate, cebolla"
}
```

**Pedido:**
```json
{
  "id": "1",
  "userId": "1",
  "items": [
    { "id": "1", "name": "Hamburguesa", "price": 15000, "quantity": 2 }
  ],
  "total": 30000,
  "status": "pendiente",
  "createdAt": "2024-01-18T12:00:00Z"
}
```

---

## 📝 Licencia

Este proyecto fue desarrollado con fines educativos como parte del programa de formación en desarrollo web.

---

## 🤝 Contribuciones

Para mejoras o correcciones, por favor abrir un issue o pull request.

