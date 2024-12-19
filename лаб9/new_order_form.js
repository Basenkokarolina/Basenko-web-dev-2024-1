"use strict";
import {loadDishes} from "./display_current_order.js";

function fetchDishCategory(keyword) {
    for (const dish of window.dishes) {
        if (dish.keyword === keyword) {
            return dish.category;
        }
    }
    return null;
}

function fetchDishPrice(keyword) {
    for (const dish of window.dishes) {
        if (dish.keyword === keyword) {
            return dish.price;
        }
    }
    return null;
}

export function recalculateTotal() {
    let selectedDishes = document.querySelectorAll(".every-dish");
    let totalAmount = 0;

    selectedDishes.forEach(dish => {
        totalAmount += fetchDishPrice(dish.getAttribute("data-dish"));
    });

    let totalDisplay = document.querySelector(".order-item-coast");
    totalDisplay.innerHTML = `
        <p><b>Стоимость заказа</b></p>
        <p class="coast">${totalAmount}&#x20bd;</p>
    `;
    if (totalAmount <= 0) {
        let orderEmptyState = document.querySelector(".order-items-not");
        let orderFullState = document.querySelector(".order-items");
        orderEmptyState.style.display = "block";
        orderFullState.style.display = "none";
        const emptySelected = document.querySelector(".empty-selected");
        emptySelected.style.display = "block";
    }
}

function appendDishToOrder(dish) {

    let orderEmptyState = document.querySelector(".order-items-not");
    let orderFullState = document.querySelector(".order-items");
    orderEmptyState.style.display = "none";
    orderFullState.style.display = "block";

    window.localStorage.setItem(`${dish.category}`, `${dish.id}`);
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
        orderCategory = document.querySelector(categoryInfo.selector);
        inputForm = document.getElementById(categoryInfo.inputId);
    } else {
        return;
    }

    orderCategory.innerHTML = `
        <p><b>${categoryInfo.rusName}</b></p>
        <p>${dish.name} ${dish.price}&#x20bd;</p>
    `;
    inputForm.value = dish.id;
    recalculateTotal();
}

export function initializeForm() {
    let orderEmptyState = document.querySelector(".order-items-not");
    let orderFullState = document.querySelector(".order-items");
    orderEmptyState.style.display = "none";
    orderFullState.style.display = "block";
    orderFullState.innerHTML = `
        <div class="order-item-soup">
            <p><b>Суп</b></p>
            <p>Блюдо не выбрано</p>
        </div>
        <div class="order-item-main-dish">
            <p><b>Главное блюдо</b></p>
            <p>Блюдо не выбрано</p>
        </div>
        <div class="order-item-salad">
            <p><b>Салат или стартер</b></p>
            <p>Блюдо не выбрано</p>
        </div>
        <div class="order-item-drink">
            <p><b>Напиток</b></p>
            <p>Напиток не выбран</p>
        </div>
        <div class="order-item-dessert">
            <p><b>Десерт</b></p>
            <p>Десерт не выбран</p>
        </div>
        <div class="order-item-coast">
            <p><b>Стоимость заказа</b></p>
            <p class="coast">0&#x20bd;</p>
        </div>
    `;
    const everyDishes = document.querySelectorAll(".every-dish");
    everyDishes.forEach(everyDish => {
        const dish = window.dishes.find(d => d.keyword === 
            everyDish.getAttribute("data-dish"));
        appendDishToOrder(dish);
    });
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
        return "Выберите главное блюдо.";
    }

    if (isDrinkMissing && selectedCategories.length > 0 &&
        !isMainDishMissing && !isSaladMissing && !isSoupMissing) {
        return "Выберите напиток.";
    }

    if (isSoupMissing && isMainDishMissing && !isSaladMissing) {
        return "Выберите суп или главное блюдо.";
    }

    if (isMainDishMissing && isSaladMissing
        && selectedCategories.includes("soup")) {
        return "Выберите главное блюдо/салат/стартер.";
    }

    if (isMainDishMissing) {
        return "Выберите главное блюдо.";
    }

    if ((isSoupMissing || isMainDishMissing) && isDrinkMissing) {
        return "Выберите напиток.";
    }

    if ((isDessertMissing || isSaladMissing) && isDrinkMissing) {
        return "Выберите напиток.";
    }

    return null;
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

async function submitForm() {

    const form = document.querySelector("form");
    const formData = new FormData(form);

    const key = `?api_key=5015589a-1038-4e45-a392-49a5db29cef2`;

    try {
        const response = await 
        fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders${key}`, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }

        const result = await response.json();

        showNotification("Заказ успешно создан!");
        window.localStorage.clear();
        let orderEmptyState = document.querySelector(".order-items-not");
        let orderFullState = document.querySelector(".order-items");
        orderEmptyState.style.display = "block";
        orderFullState.style.display = "none";
        const emptySelected = document.querySelector(".empty-selected");
        emptySelected.style.display = "block";
        const foodGrid = document.querySelector(".food-grid");
        foodGrid.innerHTML = ``;


    } catch (error) {
        showNotification(`Ошибка при оформлении заказа: ${error}`, "error");
    }
}

export function validateLunchOrder(event) {
    const selectedDishes = document.querySelectorAll(".every-dish");

    const selectedCategories = Array.from(selectedDishes).map(dishElement => {
        const dishKeyword = dishElement.getAttribute("data-dish");
        const dish = window.dishes.find(d => d.keyword === dishKeyword);
        return dish ? dish.category : null;
    }).filter(Boolean);

    event.preventDefault();
    const missingMessage = getMissingMessage(selectedCategories);
    if (missingMessage) {
        showNotification(missingMessage);
    } else {
        // document.querySelector("form").submit();
        submitForm().then();
    }
}
