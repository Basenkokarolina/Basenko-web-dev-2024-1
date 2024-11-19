function sortMenuItems(items) {
    return items.sort((a, b) => a.name.localeCompare(b.name));
}

function getCategoryGrid(category, grids) {
    const categoryMapping = {
        soup: 0,
        main_dish: 1,
        drink: 2
    };

    return grids[categoryMapping[category]];
}

function createMenuItemCard(item) {
    const card = document.createElement("div");
    card.classList.add("every-dish");
    card.setAttribute("data-dish", item.keyword);

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
    const sortedMenuItems = sortMenuItems(dishes);
    const gridContainers = document.querySelectorAll(".food-grid");

    sortedMenuItems.forEach(item => {
        const menuCard = createMenuItemCard(item);
        const grid = getCategoryGrid(item.category, gridContainers);
        
        if (grid) {
            grid.append(menuCard);
        }
    });

}

displayMenu();
initializeAddButtons();
