async function loadDishes() {
    try {
        const response = await 
        fetch('https://edu.std-900.ist.mospolytech.ru/labs/api/dishes');
        if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.statusText}`);
        }
        const dishes = await response.json();
        window.dishes = dishes;
        displayMenu();
    } catch (error) {
        console.error("Ошибка при загрузке данных о блюдах:", error);
    }
}
