import { routes } from "./router/routes.js";
import { initHome } from "./views/home.js";
import { initLogin, handleLogin } from "./views/login.js";
import { initRegister } from "./views/register.js";
import { initMenu } from "./views/menu.js";
import { initCart } from "./views/cart.js";
import { initMyOrders } from "./views/myOrders.js";
import { initProfile } from "./views/profile.js";
import { initAdminOrders } from "./views/adminOrders.js";
import { initStore, getState, setState, subscribe, cartActions } from "./services/store.js";

// Session state - ahora usa el store
export const getSession = () => {
    const state = getState();
    return state.user;
};

export const setSession = (user) => {
    setState({ user });
};

export const clearSession = () => {
    setState({ user: null, cart: [] });
};

// Inicializar el store
initStore();

// Route protection based on role
export const isProtectedRoute = (path) => {
    const protectedUserRoutes = ['#menu', '#cart', '#myOrders', '#profile'];
    const protectedAdminRoutes = ['#adminOrders'];
    
    const session = getSession();
    
    // If no session and trying to access protected route, redirect to login
    if (!session && (protectedUserRoutes.includes(path) || protectedAdminRoutes.includes(path))) {
        return { allowed: false, redirect: '#login' };
    }
    
    // If user trying to access admin route
    if (session && session.role === 'user' && protectedAdminRoutes.includes(path)) {
        alert('No tienes acceso a esta sección');
        return { allowed: false, redirect: '#menu' };
    }
    
    // If admin trying to access user routes (optional, can be allowed)
    if (session && session.role === 'admin' && protectedUserRoutes.includes(path)) {
        return { allowed: true, redirect: null };
    }
    
    return { allowed: true, redirect: null };
};

// View handlers registry
const viewHandlers = {
    "#login": initLogin,
    "#register": initRegister,
    "#home": initHome,
    "#menu": initMenu,
    "#cart": initCart,
    "#myOrders": initMyOrders,
    "#profile": initProfile,
    "#adminOrders": initAdminOrders
};

window.addEventListener('load', () => {
    navigate(location.hash || '#login');
});

window.addEventListener('hashchange', () => {
    navigate(location.hash);
});

export async function navigate(path) {
    // Handle logout
    if (path === '#logout') {
        clearSession();
        location.hash = '#login';
        return;
    }

    // Normalize path
    if (!path) path = '#login';

    // Check route protection
    const protection = isProtectedRoute(path);
    if (!protection.allowed && protection.redirect) {
        location.hash = protection.redirect;
        return;
    }

    // Fetch and render template
    const route = routes[path];
    if (!route) {
        console.error(`Ruta no encontrada: ${path}`);
        return;
    }

    try {
        const page = await fetch(route);
        const html = await page.text();

        // Inject navbar before the main content
        const navbarHTML = await fetch('./template/components/navbar.html');
        const navbar = await navbarHTML.text();

        // Hide navbar for login and home pages
        const hideNavbar = path === '#login' || path === '#home' || path === '';
        if (hideNavbar) {
            document.getElementById('app').innerHTML = html;
        } else {
            document.getElementById('app').innerHTML = navbar + html;
        }

        // Initialize view handler
        if (viewHandlers[path]) {
            viewHandlers[path]();
        }

        // Update navbar based on session
        updateNavbar();

    } catch (error) {
        console.error(`Error al cargar la ruta: ${error}`);
    }
}

// Update navbar based on current session - Ahora es reactiva
let navbarUnsubscribe = null;

export const updateNavbar = () => {
    const state = getState();
    const session = state.user;
    const cart = state.cart;

    const navbarUser = document.getElementById('navbar-user');
    const navbarAdmin = document.getElementById('navbar-admin');
    const navbarUserOnly = document.getElementById('navbar-user-only');
    const navUserName = document.getElementById('nav-user-name');
    const navCartCount = document.getElementById('nav-cart-count');

    // Hide all first
    if (navbarUser) navbarUser.style.display = 'none';
    if (navbarAdmin) navbarAdmin.style.display = 'none';
    if (navbarUserOnly) navbarUserOnly.style.display = 'none';

    if (session) {
        if (session.role === 'admin') {
            // Admin navbar
            if (navbarAdmin) navbarAdmin.style.display = 'flex';
        } else {
            // User navbar
            if (navbarUser) navbarUser.style.display = 'flex';
        }

        // User info and logout (visible for both roles)
        if (navbarUserOnly && navUserName) {
            navbarUserOnly.style.display = 'flex';
            navUserName.textContent = session.name;
        }

        // Update cart count from store
        if (navCartCount) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            navCartCount.textContent = `(${totalItems})`;
        }
    }

    // Cleanup previous subscription
    if (navbarUnsubscribe) {
        navbarUnsubscribe();
    }

    // Subscribe to changes for automatic updates
    navbarUnsubscribe = subscribe('cart', () => {
        setTimeout(() => updateNavbar(), 50);
    });
};
