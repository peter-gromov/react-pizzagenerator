
describe("Тест расчётов - пицца", () => {


	/* Тут тестируем только расчёт пиццы*/

	it('Пустая пицца 35 см без всего - тонкое тесто', () => {		 
		assert.equal(new Pizza().price, 200 ); 	
	});	

	it('Пустая пицца 40 см без всего - толстое тесто', () => {
		assert.equal( new Pizza( 501, 102 ).price, 	300 ); 	
	});	

	it('Пицца 50 см - толстое тесто - бекон * 2 + халапеньо', () => {
		assert.equal( 
			new Pizza(502, 101, 700, [ {id: 1003, quantity: 2}, {id: 1008, quantity: 1} ]).price, 
			625 
		); 	
	});	

	it('Пицца 35 см - тонкое тесто - Морской коктейль, говядина, майонез', () => {		 
		assert.equal( 
			new Pizza( 500, 101, 700, [ {id: 1001, quantity: 1}, {id: 1007, quantity: 1}, {id: 1010, quantity: 1},]).price, 
			450 
		); 	
	});	

});


describe("Тест расчётов заказов", () => {

	it('Заказ: пустая пицца 35 см, тонкая, без всего X 1 шт.', () => {		 
		pizzaGen.addOrder( new Pizza(500,101,700) , 1 );
		assert.equal( pizzaGen.totalPrice, 200 ); 	
		pizzaGen.clearOrders();
	});	


	it('Заказ: Пицца 40 см тонкое, бекон 2 шт. Х 2 шт.', () => {
		pizzaGen.addOrder( new Pizza(500,101,700,  [ {id:1003, quantity: 2}] ) , 2 );		
		assert.equal( pizzaGen.totalPrice, 600 ); 
		pizzaGen.clearOrders();	
	});	

	it('Заказ: пицца 40 см тонкое, бекон 2 шт. Х 2 шт. + 50 см, толстое,  бекон 2 Х 1 шт.', () => {		 
		pizzaGen.addOrder( new Pizza(500,101,700,  [ {id:1003, quantity: 2}] ) , 2 );		//600
		pizzaGen.addOrder( new Pizza(500,102,700,  [ {id:1003, quantity: 2}] ) , 1 );		//350
		assert.equal( pizzaGen.totalPrice, 950 ); 	
		pizzaGen.clearOrders();	

	});	

	it('Заказ: случайный ', () => {

		pizzaGen.randomizeCanvas();
		pizzaGen.doOrder();
		pizzaGen.randomizeCanvas();
		pizzaGen.doOrder();
		pizzaGen.randomizeCanvas();
		pizzaGen.doOrder();
		pizzaGen.randomizeCanvas();
		pizzaGen.doOrder();
		pizzaGen.randomizeCanvas();
		pizzaGen.doOrder();
		pizzaGen.randomizeCanvas();
		pizzaGen.doOrder();
		pizzaGen.randomizeCanvas();
		pizzaGen.doOrder();

		for(let order of pizzaGen.orders ){
			console.log( order.pizza.name + ' --> ' + order.pizza.price + ' руб. (' + order.pizza.weight + ' гр.)');
		}

		assert.equal( pizzaGen.totalPrice, 950 ); 	

	});	

	 

});



describe("SETTINGS TEST", () => {

	it('row func: Поиск настроек по ID 1003 - бекон ', () => {	assert.equal( pizzaConfig.getRow( 1003 ).name, 'Бекон' ); });	
	it('row func: Поиск настроек по ID 500 - 35 см ', () => { assert.equal( pizzaConfig.getRow( 500 ).name, '35 см' ); });	

	it('row func: Поиск настроек по ID 500 - 100 руб. ', () => { assert.equal( pizzaConfig.price( 500 ), 100 ); });	
	it('row func: Поиск настроек по ID 500 - 300 гр. ', () => { assert.equal( pizzaConfig.weight( 500 ), 300 ); });	

	it('row func: Поиск настроек по ID 500 - 300 гр. (весит диаметр основы, поиск через соотв. блок настроек) ', () => { assert.equal( pizzaConfig.weight( 500, 'diameter'), '300' ); });	
		
	//Проверка функций объекта пиццы
	it('Пицца - Имя: Пицца 35 см, тонкое тесто, сливочный соус', () => { assert.equal( new Pizza().name, 'Пицца 35 см, тонкое тесто, сливочный соус' ); });	
	it('Пицца - Имя: Пицца 35 см, тонкое тесто, сливочный соус, доп.: морской коктейль (2 шт.), говядина', () => { assert.equal( new Pizza(false,false,false, [{id: 1001, quantity:2}, {id: 1007, quantity: 1}]).name, 'Пицца 35 см, тонкое тесто, сливочный соус, доп.: морской коктейль (2 шт.), говядина' ); });	

	it('Пицца - Вес: 400', () => { assert.equal( new Pizza().weight, '400' ); });	
	it('Пицца - Вес: 610', () => { assert.equal( new Pizza(false,false,false, [{id: 1001, quantity:2}, {id: 1007, quantity: 1}]).weight, '610' ); });	

	it('Пицца - цена: 200', () => { assert.equal( new Pizza(false,false,false).price, '200' ); });	
	it('Пицца - цена: 450', () => { assert.equal( new Pizza(false,false,false, [{id: 1001, quantity:2}, {id: 1007, quantity: 1}]).price, '450' ); });	
 
});


