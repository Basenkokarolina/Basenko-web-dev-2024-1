function getDishesCategory(keyword) {
    for (const dish of dishes) {
        if (dish.keyword === keyword) {
            return dish.category;
        }
    }
    return undefined;
}

function getDishesPrice(keyword) {
    for (const dish of dishes) {
        if (dish.keyword === keyword) {
            return dish.price;
        }
    }
    return undefined;
}

function updateTotal() {
    let allItems = document.querySelectorAll(".every-dish");
    let totalSum = 0;
    allItems.forEach(item => {
        if (item.classList.contains("selected")) {
            totalSum += getDishesPrice(item.getAttribute("data-dish"));
        }
    });
    console.log(totalSum);
    let orderCoast = document.querySelector(".order-item-coast");
    orderCoast.innerHTML = `
    <p><b>Стоимость заказа</b></p>
    <p class="coast">${totalSum}&#x20bd;</p>
    `;
}

function addToOrder(dish) {
    let orderItemsNot = document.querySelector(".order-items-not");
    let orderItems = document.querySelector(".order-items");
    orderItemsNot.style.display = "none";
    orderItems.style.display = "block";

    if (dish.category === "soup") {
        let orderCategory = document.querySelector(".order-item-soup");
        orderCategory.innerHTML = `
        <p><b>Суп</b></p>
        <p>${dish.name} ${dish.price}&#x20bd;</p>
        `;
        let inputForm = document.getElementById("input-soup");
        inputForm.value = dish.keyword;

    } else if (dish.category === "main-dish") {
        let orderCategory = document.querySelector(".order-item-main-dish");
        orderCategory.innerHTML = `
        <p><b>Главное блюдо</b></p>
        <p>${dish.name} ${dish.price}&#x20bd;</p>
        `;
        let inputForm = document.getElementById("input-main-dish");
        inputForm.value = dish.keyword;

    } else if (dish.category === "salad") {
        let orderCategory = document.querySelector(".order-item-salad");
        orderCategory.innerHTML = `
        <p><b>Салат или стартер</b></p>
        <p>${dish.name} ${dish.price}₽</p>
        `;
        let inputForm = document.getElementById("input-salad");
        inputForm.value = dish.keyword;

    } else if (dish.category === "drink") {
        let orderCategory = document.querySelector(".order-item-drink");
        orderCategory.innerHTML = `
        <p><b>Напиток</b></p>
        <p>${dish.name} ${dish.price}&#x20bd;</p>
        `;
        let inputForm = document.getElementById("input-drink");
        inputForm.value = dish.keyword;

    } else if (dish.category === "dessert") {
        let orderCategory = document.querySelector(".order-item-dessert");
        orderCategory.innerHTML = `
        <p><b>Десерт</b></p>
        <p>${dish.name} ${dish.price}₽</p>
        `;
        let inputForm = document.getElementById("input-dessert");
        inputForm.value = dish.keyword;
    }

    document.querySelectorAll(".every-dish").forEach(item => {
        if (getDishesCategory(item.getAttribute("data-dish"))
             === dish.category) {
            item.classList.remove("selected");
        }
    });
    document.querySelector(`[data-dish="${dish.keyword}"]`)
        .classList.add("selected");

    updateTotal();
}

function removeActiveClassFromButtons(buttons) {
    buttons.forEach(button => {
        button.classList.remove("active");
    });
}
function sortFoodItems(foodGrid, kind) {
    let foodItems = foodGrid.querySelectorAll(".every-dish");
    foodItems.forEach(foodItem => {
        let keyword = foodItem.getAttribute("data-dish");
        dishes.forEach((dish) => {
            if (dish.keyword === keyword) {
                if (dish.kind !== kind) {
                    foodItem.style.display = "none";
                }
            }
        });
    });
}

function unSortFoodItems(foodGrid) {
    let foodItems = foodGrid.querySelectorAll(".every-dish");
    foodItems.forEach(foodItem => {
        foodItem.style.display = "flex";
    });
}

function listenerCategoryButtons(categoryButtons, foodGrids) {
    categoryButtons.forEach((button) => {
        button.addEventListener("click", event => {
            if (button.classList.contains("active")) {
                button.classList.remove("active");
                unSortFoodItems(foodGrids);

            } else {
                removeActiveClassFromButtons(categoryButtons);
                button.classList.add("active");
                unSortFoodItems(foodGrids);
                sortFoodItems(foodGrids,
                    button.getAttribute("data-kind"));
            }
        });
    });
}

function setupCategoryButtons() {
    let foodGrids = document.querySelectorAll(".food-grid");
    let categoryButtonsSoup = document.getElementById("buttons_soup")
        .querySelectorAll(".category_item");
    let categoryButtonsMain = document.getElementById("buttons_main")
        .querySelectorAll(".category_item");
    let categoryButtonsSalad = document.getElementById("buttons_salad")
        .querySelectorAll(".category_item");
    let categoryButtonsBeverages = document.getElementById("buttons_drink")
        .querySelectorAll(".category_item");
    let categoryButtonsDessert = document.getElementById("buttons_dessert")
        .querySelectorAll(".category_item");
    listenerCategoryButtons(categoryButtonsSoup, foodGrids[0]);
    listenerCategoryButtons(categoryButtonsMain, foodGrids[1]);
    listenerCategoryButtons(categoryButtonsSalad, foodGrids[2]);
    listenerCategoryButtons(categoryButtonsBeverages, foodGrids[3]);
    listenerCategoryButtons(categoryButtonsDessert, foodGrids[4]);
}

function setupAddButtons() {
    document.querySelectorAll(".add-button").forEach(button => {
        button.addEventListener("click", event => {
            const dishKeyword = 
            event.target.closest(".every-dish").getAttribute("data-dish");
            const dish = dishes.find(d => d.keyword === dishKeyword);
            addToOrder(dish);
        });
    });
    setupCategoryButtons();
}