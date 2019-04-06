DROP DATABASE IF EXISTS Bamazon;
CREATE DATABASE Bamazon;
USE Bamazon;
CREATE TABLE products(
item_id INTEGER AUTO_INCREMENT,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(30),
price DECIMAL(10,2) NOT NULL,
stock_quantity INTEGER(10) NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Splendor", "Board Games", 34.95, 50),
("Monopoly", "Board Games", 49.95, 15),
("Sekiro: Shadows Die Twice", "Video Games", 59.30, 100),
("Risk of Rain 2", "Video Games", 19.95, 80),
("Bubble Wrap", "Misc", 10.00, 100),
("Frozen Chicken Nuggets", "Food", 4.95, 500),
("Bag of Veggies", "Food", 3.00, 200),
("MasterLock 3 Digit Combination Lock", "Misc", 4.45, 80),
("IKEA Kitchenware Set", "Kitchenware", 84.83, 10),
("BamazonBasics 8-Piece Non-Stick Cookware Set", "Kitchenware", 35.34, 50)

SELECT item_id, product_name, price FROM products;
