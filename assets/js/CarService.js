var CarService = {

	list: [],
	
	add: function(cart, callback) {
		$.ajax({
			type: 'POST',
			contentType: 'application/json',
			url: 'api/carts/',
			data: JSON.stringify(cart),
			success: function(addedCart) {
				console.log('Cart created!');
				callback(addedCart);
			},
			error: function() {
				console.log('Error to add cart ' + cart.description);
			}
		});
	},
	
	remove: function(id, callback) {
		$.ajax({
			type: 'DELETE',
			url: 'api/carts/' + id,
			success: function(response) {
				console.log('Cart deleted!');
				callback(true);
			},
			error: function(jqXHR) {
				console.log('Error to delete cart with id ' + id);
				callback(false);
			}
		});
	},
	
	getList: function(callback) {
		$.ajax({
			type: 'GET',
			url: 'api/carts',
			dataType: 'json',
			success: function(list) {
				callback(list);
			}
		});
	}
}