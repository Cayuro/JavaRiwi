# Plan de Implementación - Sistema de Reactividad

## Objetivo
Las vistas deben actualizarse automáticamente sin recargar la página cuando los datos cambien (carrito, pedidos, etc.)

---

## FASE 1: Servicio de Estado Centralizado ✅ COMPLETADO

### 1.1 Crear `services/store.js` ✅
- Implementar patrón Publish/Subscribe
- Estado reactivo para: carrito, pedidos, usuario, notificaciones
- Métodos: `getState()`, `setState()`, `subscribe()`, `unsubscribe()`, `emit()`
- Soporte para `storage` event (otras pestañas)
- Acciones para cart: `add`, `increase`, `decrease`, `remove`, `clear`
- Acciones para orders: `setOrders`, `addOrder`, `updateOrder`, `removeOrder`
- Utilidades: `getCartTotal()`, `getCartItemCount()`, `getOrderStats()`

### 1.2 Modificar `app.js` ✅
- Importar y usar el store para gestión de estado
- Conectar navbar con el store para actualización automática
- `getSession()` ahora usa el store
- `updateNavbar()` es reactiva y se actualiza automáticamente

---

## FASE 2: Actualizar Vistas de Usuario ✅ COMPLETADO

### 2.1 Modificar `views/cart.js` ✅
- Suscribirse a cambios del store (carrito)
- Actualizar automáticamente cuando se modifique el carrito
- Mantener listeners de eventos para quantity y remove
- Usa `cartActions` del store

### 2.2 Modificar `views/menu.js` ✅
- Suscribirse a cambios del store (carrito)
- Actualizar contador del carrito automáticamente
- Usa `cartActions.add()` del store

### 2.3 Modificar `views/myOrders.js` ✅
- Suscribirse a cambios del store (pedidos del usuario)
- Auto-refresh cuando se cree un nuevo pedido
- Recargar desde API cuando se vuelva a la vista
- Nueva línea de tiempo visual de estados

### 2.4 Modificar `views/profile.js` ✅
- Suscribirse a cambios del store (pedidos)
- Auto-refresh de estadísticas cuando lleguen nuevos pedidos

---

## FASE 3: Mejorar Vista Admin ✅ COMPLETADO

### 3.1 Modificar `views/adminOrders.js` ✅
- Panel de estadísticas en tiempo real:
  - Total pedidos por estado (contadores)
  - Total ingresos
- Suscribirse a cambios del store (todos los pedidos)
- Auto-actualizar cuando cambien estados
- Indicadores visuales de estado con progress bar

### 3.2 Actualizar `template/adminOrders.html` ✅
- Añadir sección de estadísticas/dashboard
- Mejorar diseño de tarjetas de pedido con iconos de estado

### 3.3 Actualizar `template/myOrders.html` ✅
- Añadir línea de tiempo visual de estados
- Animaciones de progreso

---

## FASE 4: Estilos y UI ✅ COMPLETADO

### 4.1 Actualizar `styles.css` ✅
- Estilos para dashboard de admin
- Progress bar animado
- Tarjetas de estadísticas
- Indicadores de estado con colores
- Animaciones de actualización en tiempo real

---

## Dependencias y Archivos Modificados

### Archivos CREADOS:
- `services/store.js` - Servicio de estado reactivo

### Archivos MODIFICADOS:
1. `app.js` - Conectar con store + navbar reactivo
2. `views/cart.js` - Suscripción reactiva al carrito
3. `views/menu.js` - Sincronización con store + notificaciones
4. `views/myOrders.js` - Auto-refresh + timeline visual
5. `views/profile.js` - Estadísticas reactivas
6. `views/adminOrders.js` - Dashboard en tiempo real + stats
7. `template/adminOrders.html` - Panel de estadísticas
8. `template/myOrders.html` - Timeline visual
9. `styles.css` - Nuevos estilos para componentes reactivos

---

## Comandos de Verificación

```bash
# Verificar que el servidor JSON server esté corriendo
# typically: json-server --watch db.json --port 3000

# Verificar que no haya errores en consola del navegador
# Probar agregar al carrito y ver que se actualice en navbar
# Probar confirmar pedido y ver que aparezca en Mis Pedidos
# Probar cambiar estado en admin y ver que se actualice en Mis Pedidos
```

---

## Checklist de Funcionalidades ✅

- [x] Carrito se actualiza automáticamente en todas las vistas
- [x] Contador del navbar se actualiza en tiempo real
- [x] Mis Pedidos se actualiza después de confirmar un pedido
- [x] Admin ve los cambios de estado en tiempo real
- [x] Panel de estadísticas del admin funciona
- [x] Cambios en otra pestaña se reflejan automáticamente (storage event)
- [x] Notificaciones de feedback al usuario

