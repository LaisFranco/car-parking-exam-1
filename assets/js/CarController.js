var CarController = {
	
	init: function () {
	CarController.setForm();
		CarController.showList();
	},
	
	setForm: function () {
		var form = document.querySelector('form');
		form.addEventListener('submit', function(event) {
			CarController.addCart(form);
			//it is to avoid form submition
			event.preventDefault();
		});
		CarController.setFocus();
	},
	
	setFocus: function() {
		var inputDescricao = document.getElementById('license_plate');
		inputDescricao.focus();
	},
	
	clearForm: function() {
		var form = document.querySelector('form');
		form.reset();
		CarController.setFocus();
	},
	
	addCart: function(form) {
		var cart = {
			descricao: form.license_plate.value,
			qtd: form.qtd.value,
			price: form.price.value
		};
		CarService.add(cart, function(addedCart) {
			CarController.addToHTML(addedCart);
		CarController.clearForm();
		});
	},
	
	deleteGuest: function(imgDelete) {
		var 
			cartDescription = imgDelete.dataset.cartdescription,
			carttId = imgDelete.dataset.cartid;
		
		if(confirm('Are you sure to delete ' + cartDescription + '?')) {
			CarService.remove(cartId, function(isDeleted) {
				if(isDeleted) {
					$(imgDelete).parents('dl').remove();
				}
			})
		}
	},
	
	showList: function () {
		CarService.getList(function(list) {
			list.forEach(function(cart) {
				CarController.addToHTML(cart);
			});	
		});
	},
	
	addToHTML: function (cart) {
		var
			cartList = document.getElementById('cartList'),
			dl = document.createElement('dl'),
			//dt = ShoppingController.createDT(cart),
			ddlicense_plate = CarController.createDD(cart.license_plate, 'license_plate'),
		//	imgDelete = ShoppingController.createDelete(cart),
			ddcheckin = CarController.createDD(cart.checkin, 'checkin'),
		//	imgDelete = ShoppingController.createDelete(cart),
			ddcheckout = CarController.createDD(cart.checkout,'checkout')
		
	//	ddDescription.appendChild(imgDelete);
		
		//dl.appendChild(dt);
		dl.appendChild(ddlicense_plate);
		dl.appendChild(ddcheckin);
		dl.appendChild(ddcheckout);

		cartList.appendChild(dl);
	},
	
	createImage: function(imageLocation) {
		var img = document.createElement('img');
		img.src = imageLocation;
		return img;
	},
	
createDT: function(guest) {
		var 
			dt = document.createElement('dt');
		
		dt.appendChild(dt);
		dt.className = "photo";
		
		return dt;
	},
	
	createDD: function(value, className) {
		var dd = document.createElement('dd');
		
		dd.innerHTML = value;
		dd.className = className;
		
		return dd;
	},
	
	createDelete: function(cart) {
		var imgDelete = CarController.createImage('assets/images/delete.gif');
		
		imgDelete.setAttribute('data-cartid', cart.id);
		imgDelete.setAttribute('data-cartdescription', cart.description);
		
		imgDelete.addEventListener('click', function() {
			CarController.deleteShopping(this);
		});
		
		return imgDelete;
	}

};

//TODO consider to have an HTMLService.js
//initialization
CarController.init();