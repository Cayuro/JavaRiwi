import { CardCarrito } from "./CardCarrito.js"

export function Order() {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    
    
    return `
    <div class="h-fit p-2 border border-gray-300 rounded-lg ">
        <div class="header-order flex justify-between border-b-1 border-gray-200 pb-5">
            <div class="flex items-center font-semibold gap-1">
                <p>Your order</p>
                <span class="rounded-full h-6 w-6 p-1 bg-green-400 text-xs text-center">${cart.length}</span>
            </div>
            <p class="font-thin text-green-600">Clear all</p>
        </div>
        ${cart.map(item => CardCarrito(item)).join('')}
        <div class="footer-order mt-2 flex flex-col">
            <div class="flex justify-between text-xs text-green-600">
                <span>Subtotal</span>
                <span>$12.98</span>
            </div>
            <div class="flex justify-between text-xs text-green-600">
                <span>Tax(8%)</span>
                <span>$1.04</span>
            </div>
            <div class="flex justify-between border-t border-gray-200 border-dashed mt-2">
                <span>Total</span>
                <span>$14.20</span>
            </div>
            <button class="flex justify-center items-center bg-green-500 mx-4 py-2 mt-2 rounded-lg">
                Confirm Order
                <span class="material-symbols-outlined">
                    arrow_right_alt
                </span>
            </button>
        </div>
    </div>`
}
