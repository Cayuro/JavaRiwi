export async function getMenuItems(){
    try {
        const response = await fetch('http://localhost:3000/menu')
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error);
    }
}