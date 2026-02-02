import { getSession, updateNavbar } from "../app.js";
import { getProducts, getCategories } from "../services/product.js";
import { getState, subscribe, cartActions } from "../services/store.js";

let allProducts = [];
let unsubscribeCart = null;

export const initMenu = async () => {
    const session = getSession();
    if (!session) {
        location.hash = '#login';
        return;
    }

    // Update navbar
    updateNavbar();

    // Load products
    allProducts = await getProducts();
    const categories = await getCategories();

    renderCategories(categories);
    renderProducts(allProducts);
    setupEventListeners();
    subscribeToCartChanges();
};

function subscribeToCartChanges() {
    // Cleanup previous subscription
    if (unsubscribeCart) {
        unsubscribeCart();
    }

    // Subscribe to cart changes to update UI
    unsubscribeCart = subscribe('cart', () => {
        // Just update the notification if needed, products don't change
        // But we can update cart count in menu view if present
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const state = getState();
            const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = `${totalItems} items`;
        }
    });
}

function renderCategories(categories) {
    const container = document.querySelector('.category-filter');
    if (!container) return;

    // Add "Todos" button
    let html = '<button class="category-btn active" data-category="all">Todos</button>';

    // Add category buttons using map
    html += categories.map(cat =>
        `<button class="category-btn" data-category="${cat}">${cat}</button>`
    ).join('');

    container.innerHTML = html;
}

function renderProducts(products) {
    const container = document.getElementById('menu-container');
    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = '<p class="no-products">No hay productos disponibles</p>';
        return;
    }

    // Usar map para renderizar productos
    container.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${product.description || ''}</p>
                <span class="product-category">${product.category}</span>
                <span class="product-price">$${product.price.toLocaleString()}</span>
            </div>
            <button class="add-to-cart" data-id="${product.id}">Agregar</button>
        </div>
    `).join('');
}

function setupEventListeners() {
    // Category filter - usando event delegation
    const categoryContainer = document.querySelector('.category-filter');
    if (categoryContainer) {
        categoryContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-btn')) {
                // Update active button
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                const category = e.target.dataset.category;
                filterProducts(category);
            }
        });
    }

    // Add to cart buttons - usando event delegation
    const menuContainer = document.getElementById('menu-container');
    if (menuContainer) {
        menuContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                const productId = e.target.dataset.id;
                addToCart(productId);
            }
        });
    }
}

function filterProducts(category) {
    if (category === 'all') {
        renderProducts(allProducts);
    } else {
        // Usar filter para obtener productos por categoría
        const filtered = allProducts.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

function addToCart(productId) {
    // Usar find para obtener el producto
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    // Use store action
    cartActions.add(product);
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const state = getState();
        const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = `${totalItems} items`;
    }
}

