import { render } from "../../core/render.js"
import { Dashboard } from "../../views/User/Dasboard.js"

export function CardCarrito(item) {
    return `
    <div data-id='${JSON.stringify(item)}' class="card-order flex gap-1">
            <img class="h-15"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGAqYChtquA1BiCWMNMITy-hrzbVNWWehaSw&s" />
            <div class="flex flex-col">
                <p>${item.name}</p>
                <p class="text-xs text-green-600">No onios</p>
                <div class="my-4 flex gap-2">
                    <div class="flex gap-4 bg-gray-200 border border-gray-300 rounded-lg px-4">
                        <button>-</button>
                        <span>${item.cont}</span>
                        <button class="w-full" id="btn-increase">+</button>
                    </div>
                    <button class="text-red-500 text-xs">Remove</button>
                </div>
            </div>
            <span>$${item.price}</span>
        </div>

    `
}


document.addEventListener('click', async (e) => {

    if (e.target.id == "btn-increase") {
        const cart = JSON.parse(localStorage.getItem('cart')) || []

        let data = e.target.closest('.card-order').dataset.id
        data = JSON.parse(data)


        const itemIndex = cart.findIndex(i => i.id == data.id)
        const item = { ...cart[itemIndex] }
        item.cont = item.cont + 1
        cart.splice(itemIndex, 1)

        //cart.push(item)
        const nuevaLista = [
            ...cart.slice(0, itemIndex),
            item,
            ...cart.slice(itemIndex)
        ];
        localStorage.setItem('cart', JSON.stringify(nuevaLista))
        render(await Dashboard())

    }

})

