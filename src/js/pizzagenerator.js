;

var _pg = {};

_pg.settings = {};

_pg.settings.diameter = [
	{name: '35 см', price: 100, id: '500'},
	{name: '40 см', price: 150, id: '501'},
	{name: '50 см', price: 350, id: '502'}
];

_pg.settings.width = [
	{ name: 'Тонкое', price: 100, id: '101'},
	{ name: 'Толстое', price: 150, id: '102'}
];
_pg.settings.base = [
	{ name: 'Сливочный', price: 0, id: '700'},
	{ name: 'Томатный', price: 0, id: '701'},
	{ name: 'Грибной', price: 0, id: '702'}
];

_pg.settings.ingredients = [
	{ name: 'Морской коктейль', price: 80 , id: '1001'},
	{ name: 'Тигровая креветка', price: 70 , id: '1002'},
	{ name: 'Бекон', price: 50 , id: '1003'},
	{ name: 'Салями', price: 80 , id: '1004'},
	{ name: 'Чорризо', price: 80 , id: '1005'},
	{ name: 'Курица', price: 110 , id: '1006'},
	{ name: 'Говядина', price: 80 , id: '1007'},
	{ name: 'Халапеньо', price: 80 , id: '1008'},
	{ name: 'Чеснок', price: 80 , id: '1009'},
	{ name: 'Доп. майонез', price: 80 , id: '1010'}
];

//Текущая пицца
_pg.canvas = {};

//Отложенный заказ
_pg.order = [
	/*
		{
			quantity: 1,
			pizza: {
				diameter: 501,
				width: 101,
				base: 700,
				ingredients: [
					{ id: 1001, quantity: 2},
					{ id: 1003, quantity: 1},
					{ id: 1007, quantity: 1}
				]
			}
		}
	*/

];



_pg.getPizzaPrice = function(pizza){
	var totalPrice = 0;

	totalPrice += (typeof pizza.diameter != 'undefined') ? _pg.settings.diameter.find(function(el){ return el.id == pizza.diameter }).price :0;
	totalPrice += (typeof pizza.width != 'undefined') ? _pg.settings.width.find(function(el){ return el.id == pizza.width }).price :0;
	totalPrice += (typeof pizza.base != 'undefined') ? _pg.settings.base.find(function(el){ return el.id == pizza.base }).price :0;

	//Добавляем цену ингредиентов
	for(var i in pizza.ingredients ){
		if( typeof pizza.ingredients[i] == 'undefined ') continue;
		totalPrice += _pg.settings.ingredients.find( function(el) { return el.id == pizza.ingredients[i].id; }).price * pizza.ingredients[i].quantity;
	}


	return totalPrice;

};


_pg.getTotalPrice = function(order){
	var totalPrice = 0;

	for(var k in order){
		totalPrice += this.getPizzaPrice( this.order[k] );
	}

	return totalPrice;
};


