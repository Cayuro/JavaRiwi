export const initHome = () => {
    // Check if user is logged in and redirect
    const session = getSession();
    if (session) {
        redirectByRole(session);
        return;
    }

    // Home is now a landing page for non-logged users
    // Logged in users will be redirected by the code above
    console.log('Home view loaded - Landing page');
};

function redirectByRole(user) {
    if (user.role === 'admin') {
        location.hash = '#adminOrders';
    } else {
        location.hash = '#menu';
    }
}
