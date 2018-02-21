// Dependencies
var inquirer = require('inquirer');
var mysql = require('mysql');

// mySQL connection
var sqlConnection = mysql.createConnection({
	host: 'localhost',
	port: 3306,

	// username
	user: 'root',

	// password
	password: 'Greenlife95$',
	database: 'bamazon'
});

// this function makes sure the user does not supply a negative integer
function validateUserInput(value) {
    var sign = Math.sign(value);
    var integer = Number.isInteger(parseFloat(value));
    
	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a number that is whole and not just a zero.';
	};
};

function displayInventory() {

	// Construct the db query string
	queryString = 'SELECT * FROM products_tb';

	sqlConnection.query(queryString, function(err, data) {
		if (err) throw err;

		console.log('Existing Inventory: ');
		console.log('...................\n');

		var stringOut = '';
		for (var i = 0; i < data.length; i++) {
			stringOut = '';
			stringOut += 'Item ID: ' + data[i].item_id + '  //  ';
			stringOut += 'Product Name: ' + data[i].product_name + '  //  ';
			stringOut += 'Department: ' + data[i].department_name + '  //  ';
			stringOut += 'Price: $' + data[i].price + '\n';

			console.log(stringOut);
		}

	  	console.log("---------------------------------------------------------------------\n");

	  	//Prompt the user for item/quantity they would like to purchase
	  	promptUserPurchase();
	})
}

function promptUserPurchase() {

	// Prompt the user to select an item
	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID which you would like to purchase.',
			validate: validateUserInput,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'What is the quantity you need?',
			validate: validateUserInput,
			filter: Number
		}
	]).then(function(input) {

		var quantity = input.quantity;
		var item = input.item_id;
		
		// query Str confirms that the user input item ID exists in the desired quantity
		var queryStr = 'SELECT * FROM products_tb WHERE ?';

		sqlConnection.query(queryStr, {item_id: item}, function(err, data) {
			if (err) throw err;

			// If the user has selected an invalid item ID, data attay will be empty

			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select an Item Id that is valid.');
				displayInventory();

			} else {
				var productData = data[0];

				if (quantity <= productData.stock_quantity) {
					console.log('Excellent, the product you requested is in stock! We have placed your order!');

					var updateQueryStr = 'UPDATE products_tb SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

					// Updates the inventory
					sqlConnection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log('Your order has been placed! Your total is $' + productData.price * quantity);
						console.log('Thank you for shopping with Bamazon!');
						console.log("\n________________________________________________________________\n");

						sqlConnection.end();
					})
				} else {
					console.log('Sorry, we do not have enough of that product in stock, your order can not be placed without modification.');
					console.log('Please change your order.');
					console.log("\n________________________________________________________________\n");

					displayInventory();
				};
			};
		});
	});
};

function runBamazon() {

	// Display the available inventory
	displayInventory();
};

runBamazon();