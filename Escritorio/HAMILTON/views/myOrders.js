import { getSession } from "../app.js";
import { getOrdersByUserId } from "../services/order.js";
import { updateNavbar } from "../app.js";
import { subscribe, getState } from "../services/store.js";

let unsubscribeOrders = null;

export const initMyOrders = async () => {
    const session = getSession();
    if (!session) {
        location.hash = '#login';
        return;
    }

    // Update navbar
    updateNavbar();

    // Load orders from API
    await loadOrders();
    
    // Subscribe to order changes
    subscribeToOrderChanges();
};

async function loadOrders() {
    const session = getSession();
    if (!session) return;

    const orders = await getOrdersByUserId(session.id);
    renderOrders(orders);
}

function subscribeToOrderChanges() {
    // Cleanup previous subscription
    if (unsubscribeOrders) {
        unsubscribeOrders();
    }

    // Subscribe to changes - reload orders when they change
    unsubscribeOrders = subscribe('orders', async () => {
        await loadOrders();
    });
}

function renderOrders(orders) {
    const container = document.getElementById('orders-container');
    if (!container) return;

    if (orders.length === 0) {
        container.innerHTML = `
            <div class="no-orders">
                <p>No tienes pedidos aún</p>
                <a href="#menu" class="btn-primary">Hacer un Pedido</a>
            </div>
        `;
        return;
    }

    // Ordenar por fecha (más recientes primero)
    const sortedOrders = orders.sort((a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Usar map para renderizar pedidos
    container.innerHTML = sortedOrders.map(order => `
        <div class="order-card" data-id="${order.id}">
            <div class="order-header">
                <span class="order-id">Pedido #${order.id}</span>
                <span class="order-status status-${order.status}">${formatStatus(order.status)}</span>
            </div>
            <div class="order-details">
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item">
                            <span>${item.quantity}x ${item.name}</span>
                            <span>$${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="order-footer">
                    <span class="order-total">Total: $${order.total.toLocaleString()}</span>
                    <span class="order-date">${formatDate(order.createdAt)}</span>
                </div>
            </div>
            ${renderStatusTimeline(order.status)}
        </div>
    `).join('');
}

function renderStatusTimeline(currentStatus) {
    const statuses = ['pendiente', 'preparando', 'listo', 'entregado'];
    const currentIndex = statuses.indexOf(currentStatus);

    return `
        <div class="order-timeline">
            ${statuses.map((status, index) => `
                <div class="timeline-step ${index <= currentIndex ? 'completed' : ''} ${status === currentStatus ? 'active' : ''}">
                    <span class="step-icon">${getStatusIcon(status)}</span>
                    <span class="step-label">${capitalize(status)}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function getStatusIcon(status) {
    const icons = {
        'pendiente': '⏳',
        'preparando': '👨‍🍳',
        'listo': '✅',
        'entregado': '🎉'
    };
    return icons[status] || '•';
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatStatus(status) {
    const statusMap = {
        'pendiente': '⏳ Pendiente',
        'preparando': '👨‍🍳 Preparando',
        'listo': '✅ Listo',
        'entregado': '🎉 Entregado'
    };
    return statusMap[status] || status;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    });
}

