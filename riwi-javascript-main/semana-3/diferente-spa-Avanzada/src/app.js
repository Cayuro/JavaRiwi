import { router } from './router/router.js';
import './core/events.js';

window.addEventListener('load', router);
window.addEventListener('hashchange', router);