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

function checkValidOrder() {
    const drink = window.localStorage.getItem("drink");
    const mainCourse = window.localStorage.getItem("main-course");
    const salad = window.localStorage.getItem("salad");
    const soup = window.localStorage.getItem("soup");
    const dessert = window.localStorage.getItem("dessert");

    if (!drink && !mainCourse && !salad && !soup && !dessert) {
        return false;
    }

    if (!drink && mainCourse && (soup || salad)) {
        return false;
    }

    if (soup && !mainCourse && !salad) {
        return false;
    }

    if (salad && !mainCourse && !soup) {
        return false;
    }

    if ((drink || dessert) && !mainCourse && !salad && !soup) {
        return false;
    }

    return true;
}

function displayLocalStorageDishes() {
    const categoryMapping = [
        "soup",
        "main-course",
        "salad",
        "drink",
        "dessert"
    ];
    const everyDishes = document.querySelectorAll(".every-dish");
    categoryMapping.forEach((category) => {
        if (window.localStorage.getItem(category) !== null) {
            everyDishes.forEach(everyDish => {
                if (everyDish.getAttribute("data-id") === 
                window.localStorage.getItem(category)) {
                    everyDish.classList.add("selected");
                }
            });
        }
    });
    const orderSummary = document.querySelector(".order-summary");
    orderSummary.style.display = "flex";
    if (checkValidOrder()) {
        const checkoutButton = document.querySelector(".checkout-btn");
        checkoutButton.style.pointerEvents = "auto";
        checkoutButton.style.backgroundColor = "#ff5722";
    }
    recalculateTotal();
}

function createMenuItemCard(item) {
    const card = document.createElement("div");
    card.classList.add("every-dish");
    card.setAttribute("data-dish", item.keyword);
    card.setAttribute("data-kind", item.kind);
    card.setAttribute("data-id", item.id);
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
    if (window.localStorage.length > 0) {
        displayLocalStorageDishes();
    }
    initializeAddButtons();
    initializeFilters();
}
