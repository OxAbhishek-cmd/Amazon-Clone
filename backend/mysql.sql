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
    `order_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
Select p.product_id,p.image,p.title,p.price,p.rating,ci.quantity (SELECT product_id , quantity from cart_items where cart_id = (Select cart_id from cart where user_id = ?))
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








