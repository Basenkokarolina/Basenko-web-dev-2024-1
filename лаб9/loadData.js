export async function loadOrders() {
    try {
        const key = "?api_key=5015589a-1038-4e45-a392-49a5db29cef2";
        const response = await 
        fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders${key}`);

        if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Ошибка при загрузке данных о заказах:", error);
    }
}

export async function loadDishes() {
    try {
        const response = await 
        fetch('https://edu.std-900.ist.mospolytech.ru/labs/api/dishes');

        if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.statusText}`);
        }

        const dishes = await response.json();
        return dishes;
    } catch (error) {
        console.error("Ошибка при загрузке данных о заказах:", error);
    }
}
