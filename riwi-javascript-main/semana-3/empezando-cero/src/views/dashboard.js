import { store } from "../state/store.js"

export function dashboard(){
    return `
    <h1>Este es el Dashboard mi loco ${store.name}</h1>
    <h2>aquí vemos varias cosas </h2>
    <p>Este es el mejor espacio para desarrollar tus habilidades</p>
    `
}