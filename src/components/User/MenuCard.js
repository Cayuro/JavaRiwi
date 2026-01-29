import { render } from "../../core/render.js"
import { Dashboard } from "../../views/User/Dasboard.js"

export function MenuCard(item) {


    return `
    <div class="shadow-md relative w-[90%] h-full bg-white rounded-[0.8vw] flex flex-col items-center">
                <span class="absolute bg-gray-100 rounded-lg font-semibold text-xs py-1 px-3 top-2 left-3">${item.category}</span>
                <img class="rounded-t-[0.7vw]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGAqYChtquA1BiCWMNMITy-hrzbVNWWehaSw&s"/>
                <div class="p-2 flex flex-col">

                    <div class="flex font-extrabold gap-1">
                        <p>${item.name}</p>
                        <span class="text-green-500 text-lg">$${item.price}</span>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                    </p>
                    <button data-item='${JSON.stringify(item)}' id="add-to-order" class="flex items-center justify-center bg-gray-200 rounded-md mt-3 mx-10 py-1" type="button">
                        <span class="material-symbols-outlined">
                            add_shopping_cart
                        </span>
                        add to order
                    </button>
                </div>
            </div>`
}
function productExist(item) {
    const cart = JSON.parse(localStorage.getItem('cart')) || null
    if (!cart) return
    
    const findItem = cart.find(i => i.id == item.id)
    
    
    return findItem
}

document.addEventListener('click', async (e) => {
    if (e.target.id == "add-to-order") {
        const cart = JSON.parse(localStorage.getItem('cart')) || []
        const item = JSON.parse(e.target.dataset.item)
        if (!productExist(item)) {
            item.cont = 1
            cart.push(item)
            localStorage.setItem('cart', JSON.stringify(cart))
        }else{
            alert('El producto ya existe')
            /* console.log(item);
            item.cont = 0 */
            
        }  
        render(await Dashboard())
    }
})