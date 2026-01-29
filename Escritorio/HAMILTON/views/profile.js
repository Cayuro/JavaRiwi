import { getSession } from "../app.js";
import { getUserOrderStats } from "../services/order.js";
import { updateNavbar } from "../app.js";
import { subscribe } from "../services/store.js";

let unsubscribeOrders = null;

export const initProfile = async () => {
    const session = getSession();
    if (!session) {
        location.hash = '#login';
        return;
    }

    // Update navbar
    updateNavbar();

    // Render user info
    renderUserInfo(session);

    // Load and render stats
    await loadStats();

    // Subscribe to order changes
    subscribeToOrderChanges();
};

function renderUserInfo(session) {
    const nameEl = document.getElementById('profile-name');
    const emailEl = document.getElementById('profile-email');
    const roleEl = document.getElementById('profile-role');
    const cityEl = document.getElementById('profile-city');

    if (nameEl) nameEl.textContent = session.name;
    if (emailEl) emailEl.textContent = session.email;
    if (roleEl) roleEl.textContent = session.role === 'admin' ? 'Administrador' : 'Usuario';
    if (cityEl) cityEl.textContent = session.city || 'No especificada';
}

async function loadStats() {
    const session = getSession();
    if (!session) return;

    const stats = await getUserOrderStats(session.id);
    if (stats) {
        const totalOrdersEl = document.getElementById('stat-total-orders');
        const totalSpentEl = document.getElementById('stat-total-spent');

        if (totalOrdersEl) totalOrdersEl.textContent = stats.totalOrders;
        if (totalSpentEl) totalSpentEl.textContent = `$${stats.totalGastado.toLocaleString()}`;
    }
}

function subscribeToOrderChanges() {
    // Cleanup previous subscription
    if (unsubscribeOrders) {
        unsubscribeOrders();
    }

    // Subscribe to order changes to refresh stats
    unsubscribeOrders = subscribe('orders', async () => {
        await loadStats();
    });
}

