function fetchDishCategory(keyword) {
    for (const dish of dishes) {
        if (dish.keyword === keyword) {
            return dish.category;
        }
    }
    return null; 
}

function fetchDishPrice(keyword) {
    for (const dish of dishes) {
        if (dish.keyword === keyword) {
            return dish.price;
        }
    }
    return null; 
}

function recalculateTotal() {
    let selectedDishes = document.querySelectorAll(".every-dish");
    let totalAmount = 0;
    
    selectedDishes.forEach(dish => {
        if (dish.classList.contains("selected")) {
            totalAmount += fetchDishPrice(dish.getAttribute("data-dish"));
        }
    });

    let totalDisplay = document.querySelector(".order-item-coast");
    totalDisplay.innerHTML = `
        <p><b>Стоимость заказа</b></p>
        <p class="coast">${totalAmount}&#x20bd;</p>
    `;
}

function appendDishToOrder(dish) {
    let orderEmptyState = document.querySelector(".order-items-not");
    let orderFullState = document.querySelector(".order-items");
    orderEmptyState.style.display = "none";
    orderFullState.style.display = "block";

    let orderCategory;
    let inputForm;

    const categoryMapping = {
        "soup": { selector: ".order-item-soup", 
            inputId: "input-soup", rusName: "Суп" },
        "main_dish": { selector: ".order-item-main-dish",
            inputId: "input-main-dish", rusName: "Основное блюдо" },
        "drink": { selector: ".order-item-drink", 
            inputId: "input-drink", rusName: "Напиток" }
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
    inputForm.value = dish.keyword;

    document.querySelectorAll(".every-dish").forEach(item => {
        if (fetchDishCategory(item.getAttribute("data-dish")) 
            === dish.category) {
            item.classList.remove("selected");
        }
    });

    document.querySelector(`
        [data-dish="${dish.keyword}"]`).classList.add("selected");

    recalculateTotal();
}

function initializeAddButtons() {
    document.querySelectorAll(".add-button").forEach(button => {
        button.addEventListener("click", (event) => {
            const dishKeyword = 
            event.target.closest(".every-dish").getAttribute("data-dish");
            const dish = dishes.find(d => d.keyword === dishKeyword);
            appendDishToOrder(dish);
        });
    });
}


