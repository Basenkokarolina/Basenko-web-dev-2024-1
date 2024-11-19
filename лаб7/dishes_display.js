function sortMenuItems(items) {
    return items.sort((a, b) => a.name.localeCompare(b.name));
}

function getCategoryGrid(category, grids) {
    const categoryMapping = {
        "soup": 0,
        "main-course": 1,
        "salad": 2,
        "drink": 3,
        "dessert": 4
    };

    return grids[categoryMapping[category]];
}

function createMenuItemCard(item) {
    const card = document.createElement("div");
    card.classList.add("every-dish");
    card.setAttribute("data-dish", item.keyword);
    card.setAttribute("data-kind", item.kind);

    card.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <p class="price">${item.price}&#x20bd;</p>
        <p class="name">${item.name}</p>
        <div class="plus">
            <p class="weight">${item.count}</p>
            <button class="add-button">Добавить</button>
        </div>
    `;

    return card;
}

function displayMenu() {
    if (!window.dishes || window.dishes.length === 0) {
        console.error("Список блюд пуст или не загружен!");
        return;
    }

    const sortedMenuItems = sortMenuItems(window.dishes);
    const gridContainers = document.querySelectorAll(".food-grid");

    sortedMenuItems.forEach(item => {
        const menuCard = createMenuItemCard(item);
        const grid = getCategoryGrid(item.category, gridContainers);
        
        if (grid) {
            grid.append(menuCard);
        }
    });

    initializeAddButtons();
    initializeFilters();
}
