CREATE DATABASE bamazon; 

USE bamazon;

CREATE TABLE products_tb (
 item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
 product_name VARCHAR(50) NOT NULL,
 department_name VARCHAR(50) NOT NULL,
 price DECIMAL (10,2) NOT NULL,
 stock_quantity INTEGER (11) NOT NULL,
 PRIMARY KEY (item_id)
 );
 
 INSERT INTO products_tb (product_name, department_name, price, stock_quantity)
 VALUES ( 'Play Station 4', 'Electronics', 299.99, 400),
				( 'X Box One', 'Electronics', 255.99, 350),
                ( 'Acer Desktop', 'Electronics', 659.99, 300),
                ( '50 Shades of Grey', 'Books', 8.50, 600),
                ( 'World War Z', 'Books', 11.50, 450),
                ( '1984', 'Books', 6.50, 550),
                ( 'Single Speed Fixie Bike', 'Sports', 250.00, 250),
                ( 'Longboard', 'Sports', 159.95, 300),
                ( 'Kettle Bell Set', 'Sports', 55.99, 400),
                ( 'Trash Can', 'Janitorial', 39.99, 500),
                ( 'Swiffer Jet', 'Janitorial', 24.99, 600),
                ( 'Bounty Paper Towel Set', 'Janitorial', 15.99, 800);
                