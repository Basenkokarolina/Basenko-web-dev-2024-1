function dishes_display() {
    const dishesSorted = dishes.sort((a, b) => 
        a.name.localeCompare(b.name)); 
    /* массив dishes сортируется в алфавитном порядке по названию блюд */
    let foodGrids = document.querySelectorAll('.food-grid');
    /*  находим элементы с классом .food-grid 
        и сохраняем их в переменной foodGrid */
    dishesSorted .forEach(dish =>{ /* cоздание карточек для блюд*/
        let dishCard = document.createElement('div');
        dishCard.classList.add('every-dish');
        dishCard.setAttribute('data-dish', dish.keyword);

        dishCard.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <p class="price">${dish.price}&#x20bd;</p>
            <p class="name">${dish.name}</p>
            <div class="plus">
                <p class="weight">${dish.count}</p>
                <button class="add-button">Добавить</button>
            </div>
        `;

        if (dish.category === 'soup') { /*размещение блюд в нужной секции*/
            foodGrids[0].append(dishCard);
        } else if (dish.category === 'main-dish') {
            foodGrids[1].append(dishCard);
        } else if (dish.category === 'salad') {
            foodGrids[2].append(dishCard);
        } else if (dish.category === 'drink') {
            foodGrids[3].append(dishCard);
        } else if (dish.category === 'dessert') {
            foodGrids[4].append(dishCard);
        }
    });
    setupAddButtons();
}
dishes_display();
