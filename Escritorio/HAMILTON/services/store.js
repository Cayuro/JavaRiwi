/**
 * Store Service - Sistema de Estado Centralizado con Patrón Publish/Subscribe
 * Proporciona reactividad para toda la aplicación
 */

// Estado inicial
const initialState = {
    cart: JSON.parse(localStorage.getItem('restorAppCart')) || [],
    user: JSON.parse(localStorage.getItem('restorAppSession')) || null,
    orders: [],
    notifications: [],
    lastUpdated: null
};

// Suscriptores
const subscribers = new Map();

// Estado actual
let state = { ...initialState };

/**
 * Obtener el estado actual
 */
export const getState = () => ({ ...state });

/**
 * Actualizar estado y notificar a suscriptores
 */
export const setState = (newState) => {
    state = { ...state, ...newState, lastUpdated: new Date().toISOString() };
    notifySubscribers();
    persistState();
};

/**
 * Suscribirse a cambios en una parte específica del estado
 * @param {string} key - La clave del estado a observar (cart, user, orders, etc.)
 * @param {function} callback - Función a ejecutar cuando haya cambios
 * @returns {function} - Función para cancelar la suscripción
 */
export const subscribe = (key, callback) => {
    if (!subscribers.has(key)) {
        subscribers.set(key, new Set());
    }
    subscribers.get(key).add(callback);

    // Retornar función para cancelar suscripción
    return () => {
        if (subscribers.has(key)) {
            subscribers.get(key).delete(callback);
        }
    };
};

/**
 * Notificar a todos los suscriptores
 */
const notifySubscribers = () => {
    subscribers.forEach((callbacks, key) => {
        const value = state[key];
        callbacks.forEach(callback => {
            try {
                callback(value, state);
            } catch (error) {
                console.error(`Error en suscriptor de ${key}:`, error);
            }
        });
    });
};

/**
 * Persistir estado en localStorage
 */
const persistState = () => {
    // Guardar carrito
    localStorage.setItem('restorAppCart', JSON.stringify(state.cart));

    // Guardar usuario
    if (state.user) {
        localStorage.setItem('restorAppSession', JSON.stringify(state.user));
    }
};

/**
 * Inicializar el store
 */
export const initStore = () => {
    // Escuchar cambios de localStorage en otras pestañas
    window.addEventListener('storage', (e) => {
        if (e.key === 'restorAppCart') {
            const newCart = JSON.parse(e.newValue) || [];
            setState({ cart: newCart });
        }
        if (e.key === 'restorAppSession') {
            const newUser = JSON.parse(e.newValue) || null;
            setState({ user: newUser });
        }
    });

    console.log('Store inicializado');
};

/**
 * Acciones del Store - Cart
 */
export const cartActions = {
    add: (product) => {
        const currentCart = [...state.cart];
        const existingItem = currentCart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            currentCart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }

        setState({ cart: currentCart });
        showNotification(`¡${product.name} agregado al carrito!`);
    },

    increase: (productId) => {
        const currentCart = [...state.cart];
        const item = currentCart.find(item => item.id === productId);
        if (item) {
            item.quantity += 1;
            setState({ cart: currentCart });
        }
    },

    decrease: (productId) => {
        const currentCart = [...state.cart];
        const index = currentCart.findIndex(item => item.id === productId);
        if (index !== -1) {
            if (currentCart[index].quantity > 1) {
                currentCart[index].quantity -= 1;
            } else {
                currentCart.splice(index, 1);
            }
            setState({ cart: currentCart });
        }
    },

    remove: (productId) => {
        const currentCart = state.cart.filter(item => item.id !== productId);
        setState({ cart: currentCart });
    },

    clear: () => {
        setState({ cart: [] });
    }
};

/**
 * Acciones del Store - Orders
 */
export const orderActions = {
    setOrders: (orders) => {
        setState({ orders });
    },

    addOrder: (order) => {
        const currentOrders = [order, ...state.orders];
        setState({ orders: currentOrders });
    },

    updateOrder: (orderId, updates) => {
        const currentOrders = state.orders.map(order =>
            order.id === orderId ? { ...order, ...updates } : order
        );
        setState({ orders: currentOrders });
    },

    removeOrder: (orderId) => {
        const currentOrders = state.orders.filter(order => order.id !== orderId);
        setState({ orders: currentOrders });
    }
};

/**
 * Mostrar notificación temporal
 */
const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
};

/**
 * Utilidades
 */
export const getCartTotal = () => {
    return state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

export const getCartItemCount = () => {
    return state.cart.reduce((sum, item) => sum + item.quantity, 0);
};

export const getOrdersByStatus = (status) => {
    if (status === 'all') return state.orders;
    return state.orders.filter(order => order.status === status);
};

export const getOrderStats = () => {
    const orders = state.orders;
    return {
        totalOrders: orders.length,
        totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
        pending: orders.filter(o => o.status === 'pendiente').length,
        preparing: orders.filter(o => o.status === 'preparando').length,
        ready: orders.filter(o => o.status === 'listo').length,
        delivered: orders.filter(o => o.status === 'entregado').length
    };
};

