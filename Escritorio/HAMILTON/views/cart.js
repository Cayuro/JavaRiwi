import { getSession, navigate, updateNavbar } from "../app.js";
import { createOrder } from "../services/order.js";
import { getState, subscribe, cartActions } from "../services/store.js";

let cart = [];
let unsubscribeCart = null;

export const initCart = async () => {
    const session = getSession();
    if (!session) {
        location.hash = '#login';
        return;
    }

    // Update navbar
    updateNavbar();

    // Get initial cart from store
    const state = getState();
    cart = [...state.cart];

    renderCart();
    setupEventListeners();
    subscribeToCartChanges();
};

function subscribeToCartChanges() {
    // Cleanup previous subscription
    if (unsubscribeCart) {
        unsubscribeCart();
    }

    // Subscribe to cart changes for automatic updates
    unsubscribeCart = subscribe('cart', (newCart) => {
        cart = [...newCart];
        renderCart();
        // Re-setup event listeners after re-render
        setupEventListeners();
    });
}

function renderCart() {
    const emptyState = document.getElementById('cart-empty');
    const content = document.getElementById('cart-content');
    const itemsContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');

    if (!emptyState || !content || !itemsContainer || !totalElement) return;

    if (cart.length === 0) {
        emptyState.style.display = 'block';
        content.style.display = 'none';
        return;
    }

    emptyState.style.display = 'none';
    content.style.display = 'block';

    // Usar map para renderizar items del carrito
    itemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item" data-index="${index}">
            <div class="item-info">
                <span class="item-name">${item.name}</span>
                <span class="item-price">$${item.price.toLocaleString()}</span>
            </div>
            <div class="item-controls">
                <button class="qty-btn decrease" data-id="${item.id}">-</button>
                <span class="item-quantity">${item.quantity}</span>
                <button class="qty-btn increase" data-id="${item.id}">+</button>
                <span class="item-subtotal">$${(item.price * item.quantity).toLocaleString()}</span>
                <button class="remove-btn" data-id="${item.id}">✕</button>
            </div>
        </div>
    `).join('');

    // Calcular total usando reduce
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalElement.textContent = `$${total.toLocaleString()}`;
}

function setupEventListeners() {
    const confirmBtn = document.getElementById('confirm-order');
    if (confirmBtn) {
        confirmBtn.onclick = confirmOrder;
    }

    // Quantity buttons - usando event delegation
    document.querySelectorAll('.qty-btn.decrease').forEach(btn => {
        btn.onclick = (e) => {
            const productId = e.target.dataset.id;
            decreaseQuantity(productId);
        };
    });

    document.querySelectorAll('.qty-btn.increase').forEach(btn => {
        btn.onclick = (e) => {
            const productId = e.target.dataset.id;
            increaseQuantity(productId);
        };
    });

    // Remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.onclick = (e) => {
            const productId = e.target.dataset.id;
            removeItem(productId);
        };
    });
}

function decreaseQuantity(productId) {
    cartActions.decrease(productId);
}

function increaseQuantity(productId) {
    cartActions.increase(productId);
}

function removeItem(productId) {
    cartActions.remove(productId);
}

async function confirmOrder() {
    const session = getSession();
    if (!session) {
        alert('Debes iniciar sesión');
        location.hash = '#login';
        return;
    }

    if (cart.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    // Usar map y reduce para preparar items y calcular total
    const items = cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
    }));

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const newOrder = {
        userId: session.id,
        items: items,
        total: total,
        status: 'pendiente',
        createdAt: new Date().toISOString()
    };

    const created = await createOrder(newOrder);

    if (created) {
        alert('¡Pedido confirmado exitosamente!');
        cartActions.clear();
        navigate('#myOrders');
    } else {
        alert('Error al crear el pedido');
    }
}

