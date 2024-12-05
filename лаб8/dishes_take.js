"use strict";

function fetchDishCategory(keyword) {
    for (const dish of window.dishes) {
        if (dish.keyword === keyword) {
            return dish.category;
        }
    }
    return null; 
}

function getMissingMessage(selectedCategories) {
    if (selectedCategories.length === 0) {
        return "Ничего не выбрано. Выберите блюда для заказа.";
    }
    const isDrinkMissing = !selectedCategories.includes("drink");
    const isMainDishMissing = !selectedCategories.includes("main-course");
    const isSaladMissing = !selectedCategories.includes("salad");
    const isSoupMissing = !selectedCategories.includes("soup");
    const isDessertMissing = selectedCategories.includes("dessert");

    if (isDessertMissing && selectedCategories.includes("dessert")
        && isMainDishMissing) {
        return;
    }

    if (isDrinkMissing && selectedCategories.length > 0 &&
        !isMainDishMissing && !isSaladMissing && !isSoupMissing) {
        return;
    }

    if (isSoupMissing && isMainDishMissing && !isSaladMissing) {
        return;
    }

    if (isMainDishMissing && isSaladMissing
        && selectedCategories.includes("soup")) {
        return;
    }

    if (isMainDishMissing) {
        return;
    }

    if ((isSoupMissing || isMainDishMissing) && isDrinkMissing) {
        return;
    }

    if ((isDessertMissing || isSaladMissing) && isDrinkMissing) {
        return;
    }

    const checkoutButton = document.querySelector(".checkout-btn");
    checkoutButton.style.pointerEvents = "auto";
    checkoutButton.style.backgroundColor = "#ff5722";
}

function showNotification(message) {
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) existingNotification.remove();

    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.innerHTML = `
        <p>${message}</p>
        <button class="notification-close">Окей 👌</button>
    `;
    document.body.append(notification);

    const closeButton = notification.querySelector(".notification-close");
    closeButton.addEventListener("click", () => notification.remove());
}

function fetchDishPrice(keyword) {
    for (const dish of window.dishes) {
        if (dish.keyword === keyword) {
            return dish.price;
        }
    }
    return null; 
}

function initializeFilters() {
    const filterButtons = document.querySelectorAll(".filter-button");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filterKind = button.getAttribute("data-kind");
            const section = button.closest("section");
            const foodGrid = section.querySelector(".food-grid");
            const dishes = foodGrid.querySelectorAll(".every-dish");

            if (button.classList.contains("active")) {
                button.classList.remove("active");
                dishes.forEach(dish => (dish.style.display = "flex"));
            } else {
                section.querySelectorAll(".filter-button").forEach(btn =>
                    btn.classList.remove("active"));

                button.classList.add("active");

                dishes.forEach(dish => {
                    if (dish.getAttribute("data-kind") === filterKind) {
                        dish.style.display = "flex";
                    } else {
                        dish.style.display = "none";
                    }
                });
            }
        });
    });
}

function recalculateTotal() {
    let selectedDishes = document.querySelectorAll(".every-dish");
    let totalAmount = 0;
    
    selectedDishes.forEach(dish => {
        if (dish.classList.contains("selected")) {
            totalAmount += fetchDishPrice(dish.getAttribute("data-dish"));
        }
    });

    const totalPrice = document.getElementById("total-price");
    totalPrice.innerHTML = `
        ${totalAmount}₽
    `;

}

function appendDishToOrder(dish) {

    window.localStorage.setItem(`${dish.category}`, `${dish.id}`);
    console.log(dish.category, dish.id);
    let orderCategory;
    let inputForm;

    const categoryMapping = {
        "soup": { selector: ".order-item-soup",
            inputId: "input-soup", rusName: "Суп" },
        "main-course": { selector: ".order-item-main-dish",
            inputId: "input-main-dish", rusName: "Главное блюдо" },
        "drink": { selector: ".order-item-drink",
            inputId: "input-drink", rusName: "Напиток" },
        "salad": { selector: ".order-item-salad", 
            inputId: "input-salad", rusName: "Салат или стартер" },
        "dessert": { selector: ".order-item-dessert", 
            inputId: "input-dessert", rusName: "Десерт" }
    };
    
    const categoryInfo = categoryMapping[dish.category];
    
    if (categoryInfo) {
        inputForm = document.getElementById(categoryInfo.inputId);
    } else {
        return;
    }

    inputForm.value = dish.keyword;

    document.querySelectorAll(".every-dish").forEach(item => {
        if (fetchDishCategory(item.getAttribute("data-dish")) 
            === dish.category) {
            item.classList.remove("selected");
        }
    });

    document.querySelector(`
        [data-dish="${dish.keyword}"]`).classList.add("selected");

    const orderSummary = document.querySelector(".order-summary");
    orderSummary.style.display = "flex";

    recalculateTotal();

    const selectedDishes = document.querySelectorAll(".every-dish.selected");

    const selectedCategories = Array.from(selectedDishes).map(dishElement => {
        const dishKeyword = dishElement.getAttribute("data-dish");
        const dish = window.dishes.find(d => d.keyword === dishKeyword);
        return dish ? dish.category : null;
    }).filter(Boolean);

    getMissingMessage(selectedCategories);

}

function initializeAddButtons() {
    document.querySelectorAll(".add-button").forEach(button => {
        button.addEventListener("click", (event) => {
            const dishKeyword = 
            event.target.closest(".every-dish").getAttribute("data-dish");
            const dish = window.dishes.find(d => d.keyword === dishKeyword);
            appendDishToOrder(dish);
        });
    });
}
window.onload = function() {
    loadDishes();
};


