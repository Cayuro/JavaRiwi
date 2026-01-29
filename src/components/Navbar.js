export function Navbar(){
    return `
    <header class="shadow-md h-15 flex items-center justify-around">
        <div class="flex">
            <span class="text-green-500 material-symbols-outlined text-3xl! pr-6">
                restaurant
            </span>
            <h1 class="font-extrabold text-2xl">RestorApp</h1>
        </div>
        <nav>
            <ul class="flex gap-8">
                <li class="font-bold relative"><a class="after:content-[''] after:h-1 after:w-0 after:bg-green-500 after:absolute after:left-0 after:bottom-[-2px] hover:after:w-full after:transition-all after:duration-300" href="">Menu</a></li>
                <li class="font-bold relative"><a class="after:content-[''] after:h-1 after:w-0 after:bg-green-500 after:absolute after:left-0 after:bottom-[-2px] hover:after:w-full after:transition-all after:duration-300" href="">My orders</a></li>
                <li class="font-bold relative"><a class="after:content-[''] after:h-1 after:w-0 after:bg-green-500 after:absolute after:left-0 after:bottom-[-2px] hover:after:w-full after:transition-all after:duration-300" href="">Profile</a></li>
            </ul>
        </nav>
    </header>
    `
}