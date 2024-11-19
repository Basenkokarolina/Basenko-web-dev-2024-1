function getMissingMessage(selectedCategories) {
    if (selectedCategories.length === 0) {
        return "Ничего не выбрано. Выберите блюда для заказа.";
    }
    const isDrinkMissing = !selectedCategories.includes("drink");
    const isMainDishMissing = !selectedCategories.includes("main_dish");
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

function validateLunchOrder(event) {
    const selectedDishes = document.querySelectorAll(".every-dish.selected");

    const selectedCategories = Array.from(selectedDishes).map(dishElement => {
        const dishKeyword = dishElement.getAttribute("data-dish");
        const dish = dishes.find(d => d.keyword === dishKeyword);
        return dish ? dish.category : null;
    }).filter(Boolean);

    console.log("Выбранные категории:", selectedCategories);

    const missingMessage = getMissingMessage(selectedCategories);
    if (missingMessage) {
        event.preventDefault();
        showNotification(missingMessage);
    } else {
        document.querySelector("form").submit();
    }
}
document.querySelector("form").addEventListener("submit", validateLunchOrder);
