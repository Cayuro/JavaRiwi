import { getSession, navigate, updateNavbar } from "../app.js";
import { getOrders, getOrdersByStatus, updateOrderStatus, deleteOrder } from "../services/order.js";
import { getState, subscribe, getOrderStats } from "../services/store.js";

let allOrders = [];
let currentFilter = 'all';
let unsubscribeOrders = null;

export const initAdminOrders = async () => {
    const session = getSession();
    if (!session) {
        location.hash = '#login';
        return;
    }

    if (session.role !== 'admin') {
        alert('No tienes acceso a esta sección');
        navigate('#menu');
        return;
    }

    // Update navbar
    updateNavbar();

    // Update welcome message
    const welcomeEl = document.getElementById('admin-welcome');
    if (welcomeEl) {
        welcomeEl.textContent = `Admin: ${session.name}`;
    }

    // Load orders
    await loadOrders();

    // Setup event listeners
    setupEventListeners();

    // Subscribe to order changes
    subscribeToOrderChanges();
};

async function loadOrders() {
    allOrders = await getOrders();
    renderOrders(allOrders);
    renderStats();
}

function subscribeToOrderChanges() {
    // Cleanup previous subscription
    if (unsubscribeOrders) {
        unsubscribeOrders();
    }

    // Subscribe to order changes for real-time updates
    unsubscribeOrders = subscribe('orders', async () => {
        await loadOrders();
    });
}

function renderStats() {
    const stats = getOrderStats();

    // Update stat cards
    const totalEl = document.getElementById('stat-total');
    const pendingEl = document.getElementById('stat-pending');
    const preparingEl = document.getElementById('stat-preparing');
    const readyEl = document.getElementById('stat-ready');
    const deliveredEl = document.getElementById('stat-delivered');
    const revenueEl = document.getElementById('stat-revenue');

    if (totalEl) totalEl.textContent = stats.totalOrders;
    if (pendingEl) {
        pendingEl.textContent = stats.pending;
        pendingEl.parentElement.className = stats.pending > 0 ? 'stat-card urgent' : 'stat-card';
    }
    if (preparingEl) preparingEl.textContent = stats.preparing;
    if (readyEl) {
        readyEl.textContent = stats.ready;
        readyEl.parentElement.className = stats.ready > 0 ? 'stat-card ready' : 'stat-card';
    }
    if (deliveredEl) deliveredEl.textContent = stats.delivered;
    if (revenueEl) revenueEl.textContent = `$${stats.totalRevenue.toLocaleString()}`;
}

function renderOrders(orders) {
    const container = document.getElementById('admin-orders-container');
    if (!container) return;

    // Usar filter si hay filtro activo
    let ordersToRender = orders;
    if (currentFilter !== 'all') {
        ordersToRender = orders.filter(o => o.status === currentFilter);
    }

    // Ordenar por fecha (más recientes primero)
    const sortedOrders = ordersToRender.sort((a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    );

    if (sortedOrders.length === 0) {
        container.innerHTML = '<p class="no-orders">No hay pedidos para mostrar</p>';
        return;
    }

    // Usar map para renderizar pedidos
    container.innerHTML = sortedOrders.map(order => `
        <div class="admin-order-card ${getStatusClass(order.status)}" data-id="${order.id}">
            <div class="order-header">
                <span class="order-id">Pedido #${order.id}</span>
                <span class="order-user">Usuario: ${order.userId}</span>
            </div>
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
            <div class="order-actions">
                <div class="status-badge status-${order.status}">
                    ${getStatusIcon(order.status)} ${capitalize(order.status)}
                </div>
                <div class="status-buttons">
                    ${getStatusButtons(order.status, order.id)}
                </div>
                <button class="delete-btn" data-id="${order.id}">🗑️</button>
            </div>
            <div class="order-progress">
                ${renderProgressBar(order.status)}
            </div>
        </div>
    `).join('');
}

function getStatusClass(status) {
    const classes = {
        'pendiente': 'status-pending',
        'preparando': 'status-preparing',
        'listo': 'status-ready',
        'entregado': 'status-delivered'
    };
    return classes[status] || '';
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

function renderProgressBar(currentStatus) {
    const statuses = ['pendiente', 'preparando', 'listo', 'entregado'];
    const currentIndex = statuses.indexOf(currentStatus);

    return `
        <div class="progress-bar">
            ${statuses.map((status, index) => `
                <div class="progress-step ${index <= currentIndex ? 'active' : ''} ${status === currentStatus ? 'current' : ''}">
                    <div class="step-dot">${getStatusIcon(status)}</div>
                    <div class="step-line ${index < currentIndex ? 'filled' : ''}"></div>
                </div>
            `).join('')}
        </div>
    `;
}

function getStatusButtons(currentStatus, orderId) {
    const statusFlow = ['pendiente', 'preparando', 'listo', 'entregado'];
    const currentIndex = statusFlow.indexOf(currentStatus);

    let buttons = '';

    // Botón para avanzar al siguiente estado
    if (currentIndex < statusFlow.length - 1) {
        const nextStatus = statusFlow[currentIndex + 1];
        buttons += `<button class="status-btn next" data-status="${nextStatus}" data-id="${orderId}">→ ${capitalize(nextStatus)}</button>`;
    }

    // Botón para retroceder estado (opcional)
    if (currentIndex > 0) {
        const prevStatus = statusFlow[currentIndex - 1];
        buttons += `<button class="status-btn prev" data-status="${prevStatus}" data-id="${orderId}">← ${capitalize(prevStatus)}</button>`;
    }

    return buttons;
}

function setupEventListeners() {
    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            currentFilter = e.target.dataset.status;

            if (currentFilter === 'all') {
                renderOrders(allOrders);
            } else {
                const filtered = allOrders.filter(o => o.status === currentFilter);
                renderOrders(filtered);
            }
        });
    });

    // Status change buttons and delete - usando event delegation
    document.addEventListener('click', async (e) => {
        if (e.target.classList.contains('status-btn')) {
            const orderId = e.target.dataset.id;
            const newStatus = e.target.dataset.status;
            await changeStatus(orderId, newStatus);
        }

        if (e.target.classList.contains('delete-btn')) {
            const orderId = e.target.dataset.id;
            if (confirm('¿Estás seguro de eliminar este pedido?')) {
                await deleteOrder(orderId);
                // Remove from local array
                allOrders = allOrders.filter(o => o.id !== orderId);
                renderOrders(allOrders);
                renderStats();
            }
        }
    });
}

async function changeStatus(orderId, newStatus) {
    const updated = await updateOrderStatus(orderId, newStatus);
    if (updated) {
        // Update in local array
        const index = allOrders.findIndex(o => o.id === orderId);
        if (index !== -1) {
            allOrders[index].status = newStatus;
        }

        // Re-render based on current filter
        if (currentFilter === 'all') {
            renderOrders(allOrders);
        } else {
            const filtered = allOrders.filter(o => o.status === currentFilter);
            renderOrders(filtered);
        }

        // Update stats
        renderStats();
    } else {
        alert('Error al actualizar el estado');
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
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

