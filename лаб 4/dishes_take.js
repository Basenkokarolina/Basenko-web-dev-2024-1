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
    } else if (dish.category === "drink") {
        let orderCategory = document.querySelector(".order-item-drink");
        orderCategory.innerHTML = `
        <p><b>Напиток</b></p>
        <p>${dish.name} ${dish.price}&#x20bd;</p>
        `;
        let inputForm = document.getElementById("input-drink");
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

function setupAddButtons() {
    document.querySelectorAll(".add-button").forEach(button => {
        button.addEventListener("click", event => {
            const dishKeyword = 
            event.target.closest(".every-dish").getAttribute("data-dish");
            const dish = dishes.find(d => d.keyword === dishKeyword);
            addToOrder(dish);
        });
    });
}