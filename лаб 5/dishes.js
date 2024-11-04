const dishes = [
    {
        keyword: 'gaspacho',
        name: 'Гаспачо',
        price: 195,
        category: 'soup',
        count: '350 г',
        image: 'images2/sup/gazpacho.jpg',
        kind: "veg"
    },
    {
        keyword: 'mushroom_soup',
        name: 'Грибной суп-пюре',
        price: 185,
        category: 'soup',
        count: '330 г',
        image: 'images2/sup/mushroom_soup.jpg',
        kind: "veg"
    },
    {
        keyword: 'norwegian_soup',
        name: 'Норвежский суп',
        price: 270,
        category: 'soup',
        count: '330 г',
        image: 'images2/sup/norwegian_soup.jpg',
        kind: "fish"
    },
    {
        keyword: 'ramen',
        name: 'Рамен',
        price: 375,
        category: 'soup',
        count: '425 г',
        image: 'menu/soups/ramen.jpg',
        kind: "meat"
    },
    {
        keyword: 'tom_yam',
        name: 'Том ям с креветками',
        price: 650,
        category: 'soup',
        count: '500 г',
        image: 'menu/soups/tomyum.jpg',
        kind: "fish"
    },
    {
        keyword: 'chicken_soup',
        name: 'Куриный суп',
        price: 330,
        category: 'soup',
        count: '350 г',
        image: 'menu/soups/chicken.jpg',
        kind: "meat"
    },
    {
        keyword: 'friedpotatoeswithmushrooms',
        name: 'Жареная картошка с грибами',
        price: 150,
        category: 'main-dish',
        count: '250 г',
        image: 'images2/main/friedpotatoeswithmushrooms1.jpg',
        kind: "veg"
    },
    {
        keyword: 'lasagna',
        name: 'Лазанья',
        price: 385,
        category: 'main-dish',
        count: '310 г',
        image: 'images2/main/lasagna.jpg',
        kind: "meat"
    },
    {
        keyword: 'chickencutletsandmashedpotatoes',
        name: 'Котлеты из курицы с картофельным пюре',
        price: 225,
        category: 'main-dish',
        count: '280 г',
        image: 'images2/main/chickencutletsandmashedpotatoes.jpg',
        kind: "meat"
    },
    {
        keyword: 'fishcutletwithriceandasparagus',
        name: 'Рыбная котлета с рисом и спаржей',
        price: 320,
        category: 'main-dish',
        count: '270 г',
        image: 'menu/main_course/fishrice.jpg',
        kind: "fish"
    },
    {
        keyword: 'pizzamargarita',
        name: 'Пицца Маргарита',
        price: 450,
        category: 'main-dish',
        count: '470 г',
        image: 'menu/main_course/pizza.jpg',
        kind: "veg"
    },
    {
        keyword: 'shrimppasta',
        name: 'Паста с креветками',
        price: 340,
        category: 'main-dish',
        count: '280 г',
        image: 'menu/main_course/shrimppasta.jpg',
        kind: "fish"
    },
    {
        keyword: 'koreansaladwithvegetablesandegg',
        name: 'Корейский салат с овощами и яйцом',
        price: 330,
        category: 'salad',
        count: '250 г',
        image: 'menu/salads_starters/saladwithegg.jpg',
        kind: "veg"
    },
    {
        keyword: 'caesarwithchicken',
        name: 'Цезарь с цыпленком',
        price: 370,
        category: 'salad',
        count: '220 г',
        image: 'menu/salads_starters/caesar.jpg',
        kind: "meat"
    },
    {
        keyword: 'capresewithmozzarella',
        name: 'Капрезе с моцареллой',
        price: 350,
        category: 'salad',
        count: '235 г',
        image: 'menu/salads_starters/caprese.jpg',
        kind: "veg"
    },
    {
        keyword: 'tunasalad',
        name: 'Салат с тунцом',
        price: 480,
        category: 'salad',
        count: '250 г',
        image: 'menu/salads_starters/tunasalad.jpg',
        kind: "fish"
    },
    {
        keyword: 'frenchfrieswithcaesarsauce',
        name: 'Картофель фри с соусом Цезарь',
        price: 280,
        category: 'salad',
        count: '235 г',
        image: 'menu/salads_starters/frenchfries1.jpg',
        kind: "veg"
    },
    {
        keyword: 'frenchfrieswithketchup',
        name: 'Картофель фри с кетчупом',
        price: 260,
        category: 'salad',
        count: '235 г',
        image: 'menu/salads_starters/frenchfries2.jpg',
        kind: "veg"
    },
    {
        keyword: 'orangejuice',
        name: 'Апельсиновый сок',
        price: 120,
        category: 'drink',
        count: '300 мл',
        image: 'images2/drink/orangejuice.jpg',
        kind: "cold"
    },
    {
        keyword: 'applejuice',
        name: 'Яблочный сок',
        price: 90,
        category: 'drink',
        count: '300 мл',
        image: 'images2/drink/applejuice.jpg',
        kind: "cold"
    },
    {
        keyword: 'carrotjuice',
        name: 'Морковный сок',
        price: 110,
        category: 'drink',
        count: '300 мл',
        image: 'images2/drink/carrotjuice.jpg',
        kind: "cold"
    },
    {
        keyword: 'cappuccino',
        name: 'Капучино',
        price: 180,
        category: 'drink',
        count: '300 мл',
        image: 'menu/beverages/cappuccino.jpg',
        kind: "hot"
    },
    {
        keyword: 'greentea',
        name: 'Зеленый чай',
        price: 100,
        category: 'drink',
        count: '300 мл',
        image: 'menu/beverages/greentea.jpg',
        kind: "hot"
    },
    {
        keyword: 'blacktea',
        name: 'Черный чай',
        price: 90,
        category: 'drink',
        count: '300 мл',
        image: 'menu/beverages/tea.jpg',
        kind: "hot"
    },
    {
        keyword: "baklava",
        name: "Пахлава",
        price: 220,
        category: "dessert",
        count: "300 г",
        image: "menu/desserts/baklava.jpg",
        kind: "medium"
    },
    {
        keyword: "cheesecake",
        name: "Чизкейк",
        price: 240,
        category: "dessert",
        count: "125 г",
        image: "menu/desserts/checheesecake.jpg",
        kind: "small"
    },
    {
        keyword: "chocolatecheesecake",
        name: "Шоколадный чизкейк",
        price: 260,
        category: "dessert",
        count: "125 г",
        image: "menu/desserts/chocolatecheesecake.jpg",
        kind: "small"
    },
    {
        keyword: "chocolatecake",
        name: "Шоколадный торт",
        price: 270,
        category: "dessert",
        count: "140 г",
        image: "menu/desserts/chocolatecake.jpg",
        kind: "small"
    },
    {
        keyword: "donuts3",
        name: "Пончики (3 штуки)",
        price: 410,
        category: "dessert",
        count: "350 г",
        image: "menu/desserts/donuts2.jpg",
        kind: "medium"
    },
    {
        keyword: "donuts6",
        name: "Пончики (6 штук)",
        price: 650,
        category: "dessert",
        count: "700 г",
        image: "menu/desserts/donuts.jpg",
        kind: "large"
    },
];
