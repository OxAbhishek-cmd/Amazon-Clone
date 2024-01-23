CREATE DATABASE `amazon_clone`;
USE `amazon_clone`;

-- Create the 'users' table
CREATE TABLE `users` (
    `user_id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL
);

-- Create the 'address' table
CREATE TABLE `address` (
    `address_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `fullName` VARCHAR(255) NOT NULL,
    `phoneNumber` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `state` VARCHAR(255) NOT NULL,
    `country` VARCHAR(255) NOT NULL,
    `zipCode` VARCHAR(255) NOT NULL
);

-- Create the 'orders' table
CREATE TABLE `orders` (
    `order_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `order_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `amount` DECIMAL(10,2) NOT NULL,
);

-- Create the 'order_items' table
CREATE TABLE `order_items` (
    `order_item_id` INT AUTO_INCREMENT PRIMARY KEY,
    `order_id` INT NOT NULL,
    `product_id` INT NOT NULL,
    `quantity` INT NOT NULL
);

-- Create the 'products' table
CREATE TABLE `products` (
    `product_id` INT AUTO_INCREMENT PRIMARY KEY,
    `image` TEXT NOT NULL,
    `title` TEXT NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `rating` INT NOT NULL
);

-- Create the 'cart' table
CREATE TABLE `cart` (
    `cart_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL
);

-- Create the 'cart_items' table
CREATE TABLE `cart_items` (
    `item_id` INT AUTO_INCREMENT PRIMARY KEY,
    `cart_id` INT NOT NULL,
    `product_id` INT NOT NULL,
    `quantity` INT NOT NULL
);

-- Add foreign key constraints to 'address' table
ALTER TABLE `address`
    ADD CONSTRAINT `FK_address_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `users`(`user_id`);

-- Add foreign key constraints to 'orders' table
ALTER TABLE `orders`
    ADD CONSTRAINT `FK__orders_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `users`(`user_id`);

-- Add foreign key constraints to 'order_items' table
ALTER TABLE `order_items`
    ADD CONSTRAINT `FK__order_item_order_id`
    FOREIGN KEY (`order_id`)
    REFERENCES `orders`(`order_id`);

ALTER TABLE `order_items`
    ADD CONSTRAINT `FK__order_item_product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `products`(`product_id`);

-- Add foreign key constraints to 'cart' table
ALTER TABLE `cart`
    ADD CONSTRAINT `FK_cart_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `users`(`user_id`);

-- Add foreign key constraints to 'cart_items' table
ALTER TABLE `cart_items`
    ADD CONSTRAINT `FK_cart_items_cart_id`
    FOREIGN KEY (`cart_id`)
    REFERENCES `cart`(`cart_id`);

ALTER TABLE `cart_items`
    ADD CONSTRAINT `FK_cart_items_product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `products`(`product_id`);

INSERT INTO `products`(`image`,`title`,`price`,`rating`) VALUES
("https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg","The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback",11.96,5),
("https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg","Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl",239.00,4),
("https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg","Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor",199.99,3),
("https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$","Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric",98.99,5),
("https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg","New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)",598.99,4),
("https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg","Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440",1094.98,4),
("https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg","Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",109.95,4),
("https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg","Mens Casual Premium Slim Fit T-Shirts",22.30,4),
("https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg","Mens Cotton Jacket",55.99,5),
("https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg","Mens Casual Slim Fit",15.99,2),
("https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg","John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",695.00,5),
("https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg","Solid Gold Petite Micropave",168.00,4),
("https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg","White Gold Plated Princess",9.99,3),
("https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg","Pierced Owl Rose Gold Plated Stainless Steel Double",10.99,2),
("https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg","WD 2TB Elements Portable External Hard Drive - USB 3.0",64.00,3),
("https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg","SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",109.00,3),
("https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg","Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",109.00,5),
("https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg","WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",114.00,5),
("https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg","Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",599.00,3),
("https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg","Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED",999.99,2),
("https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg","BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",56.99,3),
("https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg","Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",29.95,3),
("https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg","Rain Jacket Women Windbreaker Striped Climbing Raincoats",39.99,4),
("https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg","MBJ Women's Solid Short Sleeve Boat Neck V",9.85,5),
("https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg","Opna Women's Short Sleeve Moisture",7.95,5),
("https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg","DANVOUY Womens T Shirt Casual Cotton Short",12.99,4);