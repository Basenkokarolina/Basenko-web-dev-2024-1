"use strict";
import {initializeForm, recalculateTotal, validateLunchOrder} from "./new_order_form.js";

export async function loadDishes() {
    try {
        const response = await
            fetch('https://edu.std-900.ist.mospolytech.ru/labs/api/dishes');
        if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.statusText}`);
        }
        window.dishes = await response.json();
        displayMenu();
        initializeForm();
        recalculateTotal();
        document.querySelector("form").addEventListener("submit", validateLunchOrder);

    } catch (error) {
        console.error("Ошибка при загрузке данных о блюдах:", error);
    }
}

function sortMenuItems(items) {
    return items.sort((a, b) => a.name.localeCompare(b.name));
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
            <button class="delete-btn">Удалить</button>
        </div>
    `;

    return card;
}

function displayMenu() {
    const sortedMenuItems = window.dishes;
    const gridContainers = document.querySelectorAll(".food-grid");
    sortedMenuItems.forEach(item => {
        if (window.localStorage.getItem(item.category) === `${item.id}`) {
            console.log(window.localStorage.getItem(item.category));
            const menuCard = createMenuItemCard(item);
            const grid = document.querySelector(".food-grid");

            if (grid) {
                grid.append(menuCard);
            }
        }
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const categories = [ "soup", "main-course", "salad", "drink", "dessert" ];
            categories.forEach(category => {
                if (window.localStorage.getItem(category) === e.target.closest(".every-dish").getAttribute("data-id")) {
                    window.localStorage.removeItem(category);
                }
            });
            e.target.closest(".every-dish").remove();
            initializeForm();
            recalculateTotal();
        });
    });
}

loadDishes().then();