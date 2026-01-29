const API_URL = 'http://localhost:3000';

export const getOrders = async () => {
    try {
        const response = await fetch(`${API_URL}/pedidos`);
        const pedidos = await response.json();
        return pedidos;
    } catch (error) {
        console.log(`Error al obtener pedidos: ${error}`);
        return [];
    }
};

export const getOrdersByUserId = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/pedidos?userId=${userId}`);
        const pedidos = await response.json();
        return pedidos;
    } catch (error) {
        console.log(`Error al obtener pedidos del usuario: ${error}`);
        return [];
    }
};

export const getOrderById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/pedidos/${id}`);
        const pedido = await response.json();
        return pedido;
    } catch (error) {
        console.log(`Error al obtener pedido: ${error}`);
        return null;
    }
};

export const createOrder = async (order) => {
    try {
        const response = await fetch(`${API_URL}/pedidos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        const nuevoPedido = await response.json();
        return nuevoPedido;
    } catch (error) {
        console.log(`Error al crear pedido: ${error}`);
        return null;
    }
};

export const updateOrderStatus = async (id, status) => {
    try {
        // Primero obtener el pedido actual
        const order = await getOrderById(id);
        if (!order) return null;

        const response = await fetch(`${API_URL}/pedidos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...order, status })
        });
        const pedidoActualizado = await response.json();
        return pedidoActualizado;
    } catch (error) {
        console.log(`Error al actualizar estado: ${error}`);
        return null;
    }
};

export const deleteOrder = async (id) => {
    try {
        await fetch(`${API_URL}/pedidos/${id}`, {
            method: 'DELETE'
        });
        return true;
    } catch (error) {
        console.log(`Error al eliminar pedido: ${error}`);
        return false;
    }
};

export const getOrdersByStatus = async (status) => {
    try {
        const response = await fetch(`${API_URL}/pedidos?status=${status}`);
        const pedidos = await response.json();
        return pedidos;
    } catch (error) {
        console.log(`Error al filtrar pedidos por estado: ${error}`);
        return [];
    }
};

// Funciones para calcular estadísticas
export const getUserOrderStats = async (userId) => {
    try {
        const pedidos = await getOrdersByUserId(userId);
        
        // Usar map y reduce para calcular total gastado
        const totalGastado = pedidos.reduce((sum, order) => sum + order.total, 0);
        
        // Usar filter para contar pedidos por estado
        const pendientes = pedidos.filter(p => p.status === 'pendiente').length;
        const preparando = pedidos.filter(p => p.status === 'preparando').length;
        const listos = pedidos.filter(p => p.status === 'listo').length;
        const entregados = pedidos.filter(p => p.status === 'entregado').length;

        return {
            totalOrders: pedidos.length,
            totalGastado,
            pendientes,
            preparando,
            listos,
            entregados
        };
    } catch (error) {
        console.log(`Error al calcular estadísticas: ${error}`);
        return null;
    }
};

