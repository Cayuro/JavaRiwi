import { login } from "../services/usersServices.js"

export function Login() {
    return `
    <main class="h-screen w-full bg-green-200 flex justify-center align-center items-center">
    <form id="loginForm" class="w-[70%] h-2/3 flex flex-col justify-center align-center bg-purple-300 p-10 rounded gap-7">
   
    <div class="flex flex-col relative">
       <label>Full name</label>
       <input id="inp-name" class="px-6 py-1 border rounded" type="text" placeholder="e.g John Doe"/>
       <span class="absolute top-7 left-0 material-symbols-outlined">
            account_child_invert
            </span>
    </div>

    <div class="flex flex-col relative">
       <label>Email Address</label>
       <input id="inp-email" class="px-6 py-1 border rounded" type="email" placeholder="name@example.com"/>
       <span class="absolute top-7 left-0 material-symbols-outlined">
            email
            </span>
    </div>

    <div class="flex flex-col relative">
       <label>Email Address</label>
       <span class="absolute top-7 left-0 material-symbols-outlined">
            badge
            </span>
       <select id="slc-role" class="px-6 py-1 border rounded"">
        <option>User</option>
        <option>Admin</option>
       </select>
    </div>
    
    <button type="submit" class="bg-green-400 rounded p-4">Sign In</button>
    </form>
    </main>
    `
}

document.addEventListener('submit', async (e) => {
    e.preventDefault()
    if (e.target.id == "loginForm") {
        const form = e.target
        const inpEmail = form.querySelector('#inp-email')
        await login(inpEmail.value)

    }

})