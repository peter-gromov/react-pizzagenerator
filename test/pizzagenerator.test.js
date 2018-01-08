
describe("Тест расчётов - пицца", function(){


	/* Тут тестируем только расчёт пиццы*/

	it('Пустая пицца 35 см без всего - тонкое тесто', function () {		 
		assert.equal(
			PizzaGen.getPizzaPrice({
					diameter: 500, 
					width: 101, 
					base: 700, 
					ingredients: []
			}),
			
			200 ); 	
	});	

	it('Пустая пицца 40 см без всего - толстое тесто', function () {
		assert.equal( 
			PizzaGen.getPizzaPrice({
					diameter: 501, 
					width: 102, 
					base: 700, 
					ingredients: []
			}), 

			300 ); 	
	});	

	it('Пицца 50 см - толстое тесто - бекон * 2 + халапеньо', function () {

		assert.equal( 
			PizzaGen.getPizzaPrice({
					diameter: 502, 
					width: 101, 
					base: 700, 
					ingredients: [
						{id: 1003, quantity: 2},
						{id: 1008, quantity: 1}
					]
			}), 

			630 ); 	

	});	
	it('Пицца 35 см - тонкое тесто - Морской коктейль, говядина, майонез', function () {		 
		assert.equal( 
			PizzaGen.getPizzaPrice({
					diameter: 500, 
					width: 101, 
					base: 700, 
					ingredients: [
						{id: 1001, quantity: 1},
						{id: 1007, quantity: 1},
						{id: 1010, quantity: 1},
					]
			}),  

			440 ); 	
	});	

});


describe("Тест расчётов заказов", function(){

	it('Заказ: пустая пицца 35 см, тонкая, без всего X 1 шт.', function () {		 
		assert.equal( 
			PizzaGen.getTotalPrice([ 
					{
						quantity: 1,
						pizza: {
							diameter: 500, 
							width: 101, 
							base: 700, 
							ingredients: []
						}
					}
				]),

			 200 ); 	
	});	

	it('Заказ: Пицца 40 см тонкое, бекон 2 шт. Х 2 шт.', function () {		 
		assert.equal( 
			PizzaGen.getTotalPrice([ 
					{
						quantity: 2,
						pizza: {
							diameter: 501, 
							width: 101, 
							base: 700, 
							ingredients: [ {id:1003, quantity: 2}]
						}
					}
				]),

			 700 ); 	
	});	

	it('Заказ: пицца 40 см тонкое, бекон 2 шт. Х 2 шт. + 50 см, толстое,  ', function () {		 
		assert.equal( 
			PizzaGen.getTotalPrice([ 
					{ //700
						quantity: 2,
						pizza: {
							diameter: 501, 
							width: 101, 
							base: 700, 
							ingredients: [ {id:1003, quantity: 2}]
						}
					},
					{ //500
						quantity: 1,
						pizza: {
							diameter: 502, 
							width: 102, 
							base: 700, 
							ingredients: [ {id:1003, quantity: 2}]
						}
					}
				]),

			 1200 ); 	
	});	

	 

});



describe("SETTINGS TEST", function(){

	it('row func: Поиск настроек по ID 1003 - бекон ', function () {	assert.equal( pizzaConfig.getRow( 1003).name, 'Бекон' ); });	
	it('row func: Поиск настроек по ID 500 - 35 см ', function () { assert.equal( pizzaConfig.getRow( 500).name, '35 см' ); });	

	it('row func: Поиск настроек по ID 500 - 35 см ', function () { assert.equal( pizzaConfig.price( 500), 100 ); });	
	it('row func: Поиск настроек по ID 500 - 35 см ', function () { assert.equal( pizzaConfig.weight( 500), 300 ); });	

	it('row func: Поиск настроек по ID 500 - 35 см ', function () { assert.equal( pizzaConfig.weight( 500, 'diameter'), '300' ); });	
		
	//Проверка функций объекта пиццы
	it('Пицца - Имя: Пицца 35 см, тонкое тесто, сливочный соус', function () { assert.equal( new Pizza().name, 'Пицца 35 см, тонкое тесто, сливочный соус' ); });	
	it('Пицца - Имя: Пицца 35 см, тонкое тесто, сливочный соус, доп.: морской коктейль (2 шт.), говядина', function () { assert.equal( new Pizza(false,false,false, [{id: 1001, quantity:2}, {id: 1007, quantity: 1}]).name, 'Пицца 35 см, тонкое тесто, сливочный соус, доп.: морской коктейль (2 шт.), говядина' ); });	

	it('Пицца - Вес: 400', function () { assert.equal( new Pizza().weight, '400' ); });	
	it('Пицца - Вес: 610', function () { assert.equal( new Pizza(false,false,false, [{id: 1001, quantity:2}, {id: 1007, quantity: 1}]).weight, '610' ); });	

	it('Пицца - цена: 610', function () { assert.equal( new Pizza(false,false,false).price, '200' ); });	
	it('Пицца - цена: 610', function () { assert.equal( new Pizza(false,false,false, [{id: 1001, quantity:2}, {id: 1007, quantity: 1}]).price, '440' ); });	
 
	 

});


