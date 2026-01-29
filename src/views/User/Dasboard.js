import { MenuGrid } from "../../components/User/MenuGrid.js";
import { Order } from "../../components/User/Order.js";
export async function Dashboard() {    
    return `
    <main class="p-5 grid grid-cols-12">
        <div class="col-span-9">
            <h2 class="font-extrabold text-3xl">Our Menu</h2>
            <div class="flex gap-3 pt-3">
                <div class="border rounded-full flex py-1 px-4 bg-black text-white">
                    <p>All</p>
                </div>
                <div class="border rounded-full flex py-1 px-4">
                    <span class="material-symbols-outlined">
                        lunch_dining
                    </span>
                    <p>Burguers</p>
                </div>
                <div class="border rounded-full flex py-1 px-4">
                    <span class="material-symbols-outlined">
                        local_pizza
                    </span>
                    <p>Sides</p>
                </div>
                <div class="border rounded-full flex py-1 px-4">
                    <span class="material-symbols-outlined">
                        local_drink
                    </span>
                    <p>Drinks</p>
                </div>
            </div>
            ${await MenuGrid()}
        </div>
        <div class="col-span-3">
         ${Order()}
       </div>
    </main>
    `
}
