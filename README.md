# Amazon Clone using ReactJS and Node.js

## Project Overview
This project is an Amazon clone built using ReactJS for the frontend and Node.js with Express for the backend. MySQL is used as the database, and XAMPP with phpMyAdmin is utilized for managing the database. The project incorporates several key features:

- **Frontend:** ReactJS is used for the frontend, with styled-components for styling, replacing traditional CSS files.

- **State Management:** Redux is employed for state management, ensuring efficient handling of user data, cart items, and more.

- **User Authentication:** The project includes user registration and login functionalities, allowing users to create accounts and sign in securely.

- **Shopping Cart:** Users can add items to their shopping carts, increase quantities, and the system ensures that adding multiple identical items increments the quantity rather than creating duplicates.

- **Order History:** Users can view their order history, providing a record of their past purchases.

- **Address Management:** The address page is implemented in a way that it's visible to users only if they have set an address; otherwise, they are directed to the payment page.

- **Security and Error Handling:** The backend incorporates security measures, including JWT token-based authentication, and middleware to ensure authorized access while protecting against unauthorized attempts.

- **Database Configuration:** The project relies on a MySQL database, and configuration details such as the database name, password, user, and port are stored in an environment (env) file for easy management.

## Project Setup
To set up and run this project on your local machine, follow these general steps:

1. Clone the project repository.
2. Install the necessary dependencies for both the frontend (ReactJS) and backend (Node.js Express).
3. Set up a MySQL database using tools like XAMPP and phpMyAdmin and configure it.
4. Create an environment (env) file with the required variables (e.g., JWT_TOKEN, DB_NAME, DB_PASSWORD, DB_USER, PORT) for secure configuration.
5. Start both the frontend and backend servers.
6. Access the application in your web browser.