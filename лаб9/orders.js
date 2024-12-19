import {loadOrders, loadDishes} from "./loadData.js";

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

function showNotificationSuccess(message) {
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
    closeButton.addEventListener("click", () => window.location.reload());
}

function getListDishes(order, dishes) {
    let stringDishes = "";
    const dishesType = ["soup_id", "main_course_id", "salad_id", "drink_id", "dessert_id"];
    dishesType.forEach(type => {
        if (order[type] !== null) {
            stringDishes += `${dishes.find(dish => dish.id === order[type]).name}, `;
        }
    });
    return stringDishes;
}

function getOneDish(dishes, dish_id) {
    if (dish_id === null) {
        return "";
    }
    return `${dishes.find(dish => dish.id === dish_id).name} (${dishes.find(dish => dish.id === dish_id).price}₽)`;
}

function getPriceDishes(order, dishes) {
    let dishesPrice = 0;
    const dishesType = ["soup_id", "main_course_id", "salad_id", "drink_id", "dessert_id"];
    dishesType.forEach(type => {
        if (order[type] !== null) {
            dishesPrice += dishes.find(dish => dish.id === order[type]).price;
        }
    });
    return dishesPrice;
}

function formatDate(inputDate) {
    const date = new Date(inputDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

function formatTime(time) {
    if (time === null) {
        return `Как можно скорее<br>(с 7:00 до 23:00)`;
    }

    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
}

async function formSend(order_id) {
    const form = document.querySelector(".form-modal");
    const formButton = document.querySelector(".btn-primary");
    const key = `?api_key=5015589a-1038-4e45-a392-49a5db29cef2`;
    const formData = new FormData(form);

    try {
        const response = await
            fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders/${order_id}${key}`, {
                method: "PUT",
                body: formData
            });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        showNotificationSuccess(`Данные успешно обновлены!`);
        const result = await response.json();
    } catch (error) {
        showNotification(`Ошибка при оформлении заказа: ${error}`, "error");
    }
}

async function formSendDelete(order_id) {
    const key = `?api_key=5015589a-1038-4e45-a392-49a5db29cef2`;
    try {
        const response = await
            fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders/${order_id}${key}`, {
                method: "DELETE"
            });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        showNotificationSuccess(`Данные успешно удалены!`);
        const result = await response.json();
    } catch (error) {
        showNotification(`Ошибка при оформлении заказа: ${error}`, "error");
    }
}

function formListener(order_id) {
    const form = document.querySelector(".form-modal");
    const formButton = document.querySelector(".btn-primary");
    formButton.addEventListener("click", (event) => {
        event.preventDefault();
        formSend(order_id).then();
    });
}

function initializeOrdersTable() {
    const orderRow = document.querySelector(".orders");
    let rowCounter = 1;
    loadDishes().then((dishes) => {
        loadOrders().then((orders) => {
            orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            orders.forEach(order => {
                const trRow = document.createElement("tr");
                trRow.innerHTML = `
                    <td>${rowCounter}</td>
                    <td>${formatDate(order.created_at)}</td>
                    <td>${getListDishes(order, dishes)}</td>
                    <td>${getPriceDishes(order, dishes)}₽</td>
                    <td>${formatTime(order.delivery_time)}</td>
                    <td>
                      <span class="show" data-id="${order.id}">👁️</span>
                      <span class="edit" data-id="${order.id}">🖊️</span>
                      <span class="clear" data-id="${order.id}">🗑️</span>
                    </td>
                `;
                orderRow.append(trRow);

                const showIcons = document.querySelectorAll(".show");
                showIcons.forEach(icon => {
                    icon.addEventListener("click", (event) => {
                        if (icon.getAttribute("data-id") === order.id.toString()) {
                            const modalShow = document.createElement("div");
                            modalShow.classList.add("modal");
                            modalShow.innerHTML = `
                                <div class="modal-content">
                                <div class="modal-header">
                                  <h2>Просмотр заказа</h2>
                                  <span class="close">&times;</span>
                                </div>
                                <div class="modal-body">
                                  <p><strong>Дата оформления:</strong> ${formatDate(order.created_at)}</p>
                                  <h3>Доставка</h3>
                                  <p><strong>Имя получателя:</strong> ${order.full_name}</p>
                                  <p><strong>Адрес доставки:</strong> ${order.delivery_address}</p>
                                  <p><strong>Время доставки:</strong> ${formatTime(order.delivery_time)}</p>
                                  <p><strong>Телефон:</strong> ${order.phone}</p>
                                  <p><strong>Email:</strong> ${order.email}</p>
                                  <h3>Комментарий</h3>
                                  <p>${order.comment === null ? "Комментарий не указан" : order.comment}</p>
                                  <h3>Состав заказа</h3>
                                  ${order.soup_id !== null ? `<p>Суп: ${getOneDish(dishes, order.soup_id)}</p>` : ""}
                                  ${order.main_course_id !== null ? `<p>Основное блюдо: ${getOneDish(dishes, order.main_course_id)}</p>` : ""}
                                  ${order.salad_id !== null ? `<p>Салат или стартер: ${getOneDish(dishes, order.salad_id)}</p>` : ""}
                                  ${order.drink_id !== null ? `<p>Напиток: ${getOneDish(dishes, order.drink_id)}</p>` : ""}
                                  ${order.dessert_id !== null ? `<p>Дессерт: ${getOneDish(dishes, order.dessert_id)}</p>` : ""}
                                  <p><strong>Стоимость:</strong> ${getPriceDishes(order, dishes)}₽</p>
                                </div>
                                <div class="modal-footer">
                                  <button class="btn-secondary">ОК</button>
                                </div>
                              </div>
                            `;
                            document.body.append(modalShow);
                            modalShow.style.display = "flex";

                            const buttonClose = document.querySelectorAll(".close");
                            const okButton = document.querySelectorAll(".btn-secondary");
                            buttonClose.forEach(button => {
                                button.addEventListener("click", () => {
                                    modalShow.remove();
                                });
                            });
                            okButton.forEach(button => {
                                button.addEventListener("click", () => {
                                    modalShow.remove();
                                });
                            });
                        }
                    });
                });

                const showEdits = document.querySelectorAll(".edit");
                showEdits.forEach(icon => {
                    icon.addEventListener("click", (event) => {
                        if (icon.getAttribute("data-id") === order.id.toString()) {
                            const modalShow = document.createElement("div");
                            modalShow.classList.add("modal");
                            document.body.append(modalShow);
                            modalShow.innerHTML = `
                                <div class="modal-content">
                                <div class="modal-header">
                                  <h2>Редактирование заказа</h2>
                                  <span class="close">&times;</span>
                                </div>
                                <form class="form-modal">
                                    <div class="modal-body">
                                      <div class="form-group">
                                        <label>Имя получателя</label>
                                        <input type="text" name="full_name" value="${order.full_name}">
                                      </div>
                                      <div class="form-group">
                                        <label>Адрес доставки</label>
                                        <input type="text" value="${order.delivery_address}">
                                      </div>
                                      <div class="form-group">
                                        <label>Тип доставки</label>
                                        <input type="radio" name="delivery_type" ${order.delivery_time === null ? "checked" : ""} value="now"> Как можно скорее
                                        <input type="radio" name="delivery_type" ${order.delivery_time === null ? "" : "checked"} value="by_time"> Ко времени
                                      </div>
                                      <div class="form-group">
                                        <label>Время доставки</label>
                                        <input type="time" name="delivery_time" value="${formatTime(order.delivery_time)}">
                                      </div>
                                      <div class="form-group">
                                        <label>Телефон</label>
                                        <input type="tel" name="phone" value="${order.phone}">
                                      </div>
                                      <div class="form-group">
                                        <label>Email</label>
                                        <input type="email" name="email" value="${order.email}">
                                      </div>
                                      <div class="form-group">
                                        <label>Комментарий</label>
                                        <textarea rows="2" name="comment">${order.comment === null ? "Комментарий не указан" : order.comment}</textarea>
                                      </div>
                                </div>
                                <div class="modal-footer">
                                  <button class="btn-secondary">Отмена</button>
                                  <button class="btn-primary">Сохранить</button>
                                </div>
                                </form>
                              </div>
                            `;
                            modalShow.style.display = "flex";
                            formListener(order.id);

                            const buttonClose = document.querySelectorAll(".close");
                            const okButton = document.querySelectorAll(".btn-secondary");
                            buttonClose.forEach(button => {
                                button.addEventListener("click", () => {
                                    modalShow.remove();
                                });
                            });
                            okButton.forEach(button => {
                                button.addEventListener("click", () => {
                                    modalShow.remove();
                                });
                            });
                        }
                    });
                });

                const showClears = document.querySelectorAll(".clear");
                showClears.forEach(icon => {
                    icon.addEventListener("click", (event) => {
                        if (icon.getAttribute("data-id") === order.id.toString()) {
                            const modalShow = document.createElement("div");
                            modalShow.classList.add("modal");
                            document.body.append(modalShow);
                            modalShow.innerHTML = `
                                <div class="modal-content">
                                <div class="modal-header">
                                  <h2>Удаление заказа</h2>
                                  <span class="close">&times;</span>
                                </div>
                                <div class="modal-body">
                                  <p>Вы уверены, что хотите удалить заказ?</p>
                                </div>
                                <div class="modal-footer">
                                  <button class="btn-secondary">Отмена</button>
                                  <button class="btn-danger">Да</button>
                                </div>
                              </div>
                            `;
                            modalShow.style.display = "flex";

                            const buttonClose = document.querySelectorAll(".close");
                            const okButton = document.querySelectorAll(".btn-secondary");
                            const buttonDanger = document.querySelectorAll(".btn-danger");
                            buttonClose.forEach(button => {
                                button.addEventListener("click", () => {
                                    modalShow.remove();
                                });
                            });
                            okButton.forEach(button => {
                                button.addEventListener("click", () => {
                                    modalShow.remove();
                                });
                            });
                            buttonDanger.forEach(button => {
                                button.addEventListener("click", () => {
                                    formSendDelete(order.id).then();
                                });
                            });
                        }
                    });
                });

                rowCounter += 1;
            });
        });
    });
}

function showIcons() {
    const showIcons = document.querySelectorAll(".show");
    showIcons.forEach(icon => {
        icon.addEventListener("click", (event) => {

        });
    });
}

function showEdits() {
    const showEdits = document.querySelectorAll(".show");
    showEdits.forEach(edit => {
        edit.addEventListener("click", (event) => {

        });
    });
}

function showClears() {
    const showClears = document.querySelectorAll(".show");
    showClears.forEach(clear => {
        clear.addEventListener("click", (event) => {

        });
    });
}

initializeOrdersTable();