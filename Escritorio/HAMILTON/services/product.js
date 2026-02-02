const API_URL = 'http://localhost:3001';

export const getProducts = async () => {
    try {
        const response = await fetch(`${API_URL}/productos`);
        const productos = await response.json();
        return productos;
    } catch (error) {
        console.log(`Error al obtener productos: ${error}`);
        return [];
    }
};

export const getProductsByCategory = async (category) => {
    try {
        const response = await fetch(`${API_URL}/productos?category=${category}`);
        const productos = await response.json();
        return productos;
    } catch (error) {
        console.log(`Error al filtrar productos: ${error}`);
        return [];
    }
};

export const getProductById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/productos/${id}`);
        const producto = await response.json();
        return producto;
    } catch (error) {
        console.log(`Error al obtener producto: ${error}`);
        return null;
    }
};

export const getCategories = async () => {
    try {
        const productos = await getProducts();
        // Usar map y Set para obtener categorías únicas
        const categorias = productos.map(p => p.category);
        const uniqueCategories = [...new Set(categorias)];
        return uniqueCategories;
    } catch (error) {
        console.log(`Error al obtener categorías: ${error}`);
        return [];
    }
};

