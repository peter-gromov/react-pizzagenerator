
describe("Тест расчётов - пицца", function(){


	/* Тут тестируем только расчёт пиццы*/

	it('Пустая пицца 35 см без всего - тонкое тесто', function () {		 
		assert.equal(
			_pg.getPizzaPrice({
					diameter: 500, 
					width: 101, 
					base: 700, 
					ingredients: []
			}),
			
			200 ); 	
	});	

	it('Пустая пицца 40 см без всего - толстое тесто', function () {
		assert.equal( 
			_pg.getPizzaPrice({
					diameter: 501, 
					width: 102, 
					base: 700, 
					ingredients: []
			}), 

			300 ); 	
	});	

	it('Пицца 50 см - толстое тесто - бекон * 2 + халапеньо', function () {

		assert.equal( 
			_pg.getPizzaPrice({
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
			_pg.getPizzaPrice({
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
			_pg.getTotalPrice([ 
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
			_pg.getTotalPrice([ 
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

	it('Заказ: пустая пицца 40 см тонкое, бекон 2 шт. Х 2 шт.', function () {		 
		assert.equal( 
			_pg.getTotalPrice([ 
					{
						quantity: 2,
						pizza: {
							diameter: 501, 
							width: 101, 
							base: 700, 
							ingredients: [ {id:1003, quantity: 2}]
						}
					},
					{
						quantity: 1,
						pizza: {
							diameter: 502, 
							width: 102, 
							base: 700, 
							ingredients: [ {id:1003, quantity: 2}]
						}
					}
				]),
			 350 ); 	
	});	

	 

});


