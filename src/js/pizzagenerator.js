"use strict";

//Класс настроек
class PizzaConfig {
	constructor(){
		this.settings = {};

		this.settings.diameter = [
			{name: '35 см', price: 100, id: 500, weight: 300},
			{name: '40 см', price: 150, id: 501, weight: 400},
			{name: '50 см', price: 350, id: 502, weight: 600}
		];

		this.settings.width = [
			{ name: 'Тонкое', price: 100, id: 101, weight: 100},
			{ name: 'Толстое', price: 150, id: 102, weight: 200}
		];
		this.settings.base = [
			{ name: 'Сливочный', price: 0, id: 700, weight: 0},
			{ name: 'Томатный', price: 0, id: 701, weight: 0},
			{ name: 'Грибной', price: 0, id: 702, weight: 0}
		];

		this.settings.ingredients = [
			{ name: 'Морской коктейль', price: 80 , id: 1001, weight: 70},
			{ name: 'Тигровая креветка', price: 70 , id: 1002, weight: 70},
			{ name: 'Бекон', price: 50 , id: 1003, weight: 40},
			{ name: 'Салями', price: 110 , id: 1004, weight: 40},
			{ name: 'Чорризо', price: 110 , id: 1005, weight: 40},
			{ name: 'Курица', price: 90 , id: 1006, weight: 70},
			{ name: 'Говядина', price: 90 , id: 1007, weight: 70},
			{ name: 'Халапеньо', price: 75 , id: 1008, weight: 50},
			{ name: 'Чеснок', price: 80 , id: 1009, weight: 10},
			{ name: 'Доп. майонез', price: 80 , id: 1010, weight: 25}
		];
	}

	price(id, where){
 		return this.getRow(id,where).price;
	}

	name(id, where){
		return this.getRow(id,where).name;
	}

	weight(id, where){
		return this.getRow(id,where).weight;
	}

	getRow(id, where){
		let block, r;

		if( typeof id == 'undefined') return false;

		if (typeof where == 'undefined' ){

			//Look through whole settings 
			for( block in this.settings ){
				if( r = this.settings[block].find(function(el){ return el.id === id }) ){
					return r;
				}
			}

		}else{

			//Look in defined block
			if( typeof this.settings[where] != 'undefined' ){
				return this.settings[where].find(function(el){ return el.id === id });
			}			
		}

		return false;
	}

	//Получить случайную настройку
	getRandomRow (where){
		let i;
		if( typeof where == 'undefined' || typeof this.settings[where] == 'undefined' ) return false;	
		return this.settings[where][ Math.floor(Math.random() *this.settings[where].length) ];
	}
}
const pizzaConfig = new PizzaConfig();



//Класс для работы с пиццами 
class Pizza {
	constructor ( diameter, width, base, ingredients ){
		this.diameter = diameter || 500;
		this.width = width || 101;
		this.base = base || 700;
		this.ingredients = ingredients || [];
	}


	//Get price of the pizza through config
	get price (){
		let totalPrice = 0;

		totalPrice +=  pizzaConfig.price ( this.diameter ) ;
		totalPrice +=  pizzaConfig.price ( this.width ) ;
		totalPrice +=  pizzaConfig.price ( this.base ) ;
		
		//Добавляем цену ингредиентов
		for( let ingredient of this.ingredients ){
			totalPrice += pizzaConfig.price(ingredient.id) * ingredient.quantity;
		}

		return totalPrice;
	}


	//Get price of the pizza through config
	get weight (){
		let totalWeight = 0;

		totalWeight +=  pizzaConfig.weight ( this.diameter ) ;
		totalWeight +=  pizzaConfig.weight ( this.width ) ;
		totalWeight +=  pizzaConfig.weight ( this.base ) ;
		
		//Добавляем цену ингредиентов
		for( let ingredient of this.ingredients ){
			totalWeight += pizzaConfig.weight(ingredient.id) * ingredient.quantity;
		}

		return totalWeight;
	}


	//Get name of pizza thgough config
	get name (){
		let pizzaName = '',
			ingredients = [];

		pizzaName += 'Пицца ' + pizzaConfig.name(this.diameter) +
						', '  + pizzaConfig.name(this.width).toLowerCase() + ' тесто' +
						', '  + pizzaConfig.name(this.base).toLowerCase() + ' соус';


		if( this.ingredients.length > 0 ){
			pizzaName += ', доп.: ';
			for(let i of this.ingredients ){
				ingredients[ ingredients.length ] = pizzaConfig.name(i.id).toLowerCase() + (i.quantity > 1? ' ('+i.quantity+' шт.)' : '');
			}
			pizzaName += ingredients.join(', ');

		}

		return pizzaName;
	}
};



//Класс для работы с заказами
class PizzaEngine {

	constructor(){
		this.canvas = new Pizza();
		this.orders = [];
	}


	addOrder( pizza, quantity ){
		quantity = !quantity ? 1 : quantity;
		if( pizza instanceof Pizza ){
			this.orders.push( {pizza: pizza, quantity: quantity} );
			return true;
		}else{
			return false;
		}
	}

	clearOrders(){
		this.orders = [];
	}

	//Переносит текущую пиццу в заказы
	doOrder(){
		this.addOrder( this.canvas );
		this.clearCanvas();
	}

	// Получить конкретный заказ из массива
	getOrder(id){
		return this.orders[id];
	}



	clearCanvas(){
		this.canvas = new Pizza();
	}

	setCanvas(pizza){
		if( pizza instanceof Pizza){
			this.canvas = pizza;	
		}		
	}


	// Получить стоимость всей карзины
	get totalPrice(){
		let price = 0;

		for( let order of this.orders ){
			price += order.pizza.price * order.quantity;
		}
		return price;
	}

	// Получить вес всей карзины
	get totalWeight(){
		let weight = 0;

		for( let order of this.orders ){
			weight += order.pizza.weight * order.quantity;
		}
		return weight;
	}

	//Формирует случайную пиццу
	randomizeCanvas(){
		let newPizza = new Pizza(),
			maxIngredients;

		maxIngredients = Math.floor( Math.random()*4 );

		newPizza.diameter = pizzaConfig.getRandomRow('diameter').id;
		newPizza.width = pizzaConfig.getRandomRow('width').id;
		newPizza.base = pizzaConfig.getRandomRow('base').id;

		//Накидываем на пиццу случайные ингредиенты
		for( let i = 0; i < maxIngredients; i++ ){
			let randomId = pizzaConfig.getRandomRow('ingredients').id,
				randomQuantity =  Math.ceil( Math.random() * 2),
				k = newPizza.ingredients.findIndex( (el) => {   return el.id === randomId; }) ;

			//Если такой нагенеренный ингредиент уже есть - просто увеличим количество уже существующего (чтобы не дублировался ингредиент)
			//Если не найден - записываем новый ингредиент
			if( k === -1  ) {
				newPizza.ingredients.push({
					id: randomId,
					quantity: randomQuantity
				});
			}else{
				newPizza.ingredients[k].quantity++;
			}

		}

		this.setCanvas(newPizza);
	}
}

let pizzaGen = new PizzaEngine();
